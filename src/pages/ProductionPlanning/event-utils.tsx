import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrderLine } from './productioncalendartypes';


import React, { useState } from "react";
import { Tooltip } from "antd";


import { StatusTag } from "@/utilities/map-status-id-to-name";
import {  WorkingHoursConfig } from './calendarpage';

interface EventTooltipProps {
  tooltip: string;
  status?: number;
  children: React.ReactNode; 
}

export const EventTooltip: React.FC<EventTooltipProps> = ({ tooltip, status, children }) => (
  <Tooltip
    title={
      <div style={{ whiteSpace: "pre-line" }}>
        {tooltip}
        {status !== undefined && (
          <div style={{ marginTop: 8 }}>
            <StatusTag status={status} />
          </div>
        )}
      </div>
    }
    overlayStyle={{ maxWidth: 600 }}
  >
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {children}
    </div>
  </Tooltip>
);




export const calculateTotalTime= (orderLines: PPOrderLine[]) => {
  const totalMinutes = orderLines.reduce((sum, line) => {
    return sum + (line.prodOrdersView?.time ?? 0);
  }, 0);

  // Create duration object
  const duration = dayjs.duration(totalMinutes, 'minutes');
  
  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    formatted: `${duration.hours()}h ${duration.minutes()}m`
  };
}

export const getWorkingHours = (
  date: Dayjs,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): WorkingHoursConfig & { isBusinessDay: boolean } => {
  const dateKey = date.format("YYYY-MM-DD");
  

  const day = date.day();
 
  // First check if there's a specific override for this date
  const specificConfig = dailyWorkingHours[dateKey];
  if (specificConfig) {
    return {
      ...specificConfig,
      isBusinessDay: specificConfig.workingDays.includes(day),
    };
  }
  
  // Otherwise use the default for this day of week
  const defaultConfig = defaultWorkingHours[day];
  if (defaultConfig) {
    return {
      ...defaultConfig,
      isBusinessDay: defaultConfig.workingDays.includes(day),
    };
  }
  
  // Fallback to non-working day
  return {
    startHour: 6,
    startMinute: 0,
    endHour:22 ,
    endMinute: 0,
    workingDays: [],
    isBusinessDay: false,
  };
};


// Helper function to check if a time is within working hours
export const isWithinWorkingHours = (
  date: Dayjs,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): boolean => {
  const { isBusinessDay, startHour, startMinute, endHour, endMinute } = getWorkingHours(
    date,
    dailyWorkingHours,
    defaultWorkingHours
  );

  if (!isBusinessDay) return false;

  const currentTime = date.hour() * 60 + date.minute();
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;

  return currentTime >= startTime && currentTime < endTime;
};

// Helper function to add working minutes considering working hours
export function addWorkingMinutes(
  start: Dayjs,
  minutesToAdd: number,
  config: WorkingHoursConfig
): Dayjs {
  let current = start.clone();
  let remaining = minutesToAdd;

  while (remaining > 0) {
    const day = current.day();

    // Skip non-working days
    if (!config.workingDays.includes(day)) {
      current = current.add(1, "day").hour(config.startHour).minute(config.startMinute).second(0);
      continue;
    }

    const currentTime = current.hour() * 60 + current.minute();
    const startTime = config.startHour * 60 + config.startMinute;
    const endTime = config.endHour * 60 + config.endMinute;

    // Before work hours - adjust to start time
    if (currentTime < startTime) {
      current = current.hour(config.startHour).minute(config.startMinute).second(0);
    }

    // After work hours - move to next working day
    if (currentTime >= endTime) {
      current = current.add(1, "day").hour(config.startHour).minute(config.startMinute).second(0);
      continue;
    }

    // Calculate available minutes for today
    const currentMinutes = current.hour() * 60 + current.minute();
    const availableMinutes = endTime - currentMinutes;

    if (availableMinutes <= 0) {
      current = current.add(1, "day").hour(config.startHour).minute(config.startMinute).second(0);
      continue;
    }

    const chunk = Math.min(availableMinutes, remaining);
    current = current.add(chunk, "minute");
    remaining -= chunk;

    // If we've used all available time for today, move to next day
    if (remaining > 0) {
      current = current.add(1, "day").hour(config.startHour).minute(config.startMinute).second(0);
    }
  }

  return current;
}

// Helper function to split events across working hours
export function splitEventIntoWorkingHours(
  start: Dayjs,
  totalMinutes: number,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>,
  eventData: any
): EventInput[] {
  const events: EventInput[] = [];
  let current = start.clone();
  let remaining = totalMinutes;
  let partIndex = 1;

  while (remaining > 0) {
    const dateKey = current.format("YYYY-MM-DD");
    const day = current.day();
    const config = dailyWorkingHours[dateKey] ?? defaultWorkingHours[day];

    if (!config || !config.workingDays.includes(day)) {
      // Move to next day and get the next day's configuration for proper start time
      const nextDay = current.add(1, "day");
      const nextDayOfWeek = nextDay.day();
      const nextDayConfig = defaultWorkingHours[nextDayOfWeek];
      
      if (nextDayConfig) {
        current = nextDay.hour(nextDayConfig.startHour).minute(nextDayConfig.startMinute).second(0);
      } else {
        // Ultimate fallback if no config exists
        current = nextDay.hour(6).minute(0).second(0);
      }
      continue;
    }

    const currentTime = current.hour() * 60 + current.minute();
    const startTime = config.startHour * 60 + config.startMinute;
    const endTime = config.endHour * 60 + config.endMinute;

    if (currentTime < startTime) {
      current = current.hour(config.startHour).minute(config.startMinute).second(0);
    }

    if (currentTime >= endTime) {
      // Move to next day and get the next day's configuration for proper start time
      const nextDay = current.add(1, "day");
      const nextDayOfWeek = nextDay.day();
      const nextDayConfig = defaultWorkingHours[nextDayOfWeek];
      
      if (nextDayConfig) {
        current = nextDay.hour(nextDayConfig.startHour).minute(nextDayConfig.startMinute).second(0);
      } else {
        // Ultimate fallback if no config exists
        current = nextDay.hour(6).minute(0).second(0);
      }
      continue;
    }

    const availableMinutes = endTime - currentTime;
    const chunk = Math.min(availableMinutes, remaining);
    const segmentEnd = current.add(chunk, "minute");

    events.push({
      ...eventData,
      id: `${eventData.id}-part-${partIndex}`,
      title: events.length === 0 ? eventData.title : `${eventData.title} (Part ${partIndex})`,
      start: current.toDate(),
      end: segmentEnd.toDate(),
      extendedProps: {
        ...eventData.extendedProps,
        isPart: partIndex > 1,
        partIndex,
      },
    });

    remaining -= chunk;
    partIndex++;
    
    // When moving to the next day, use the next day's configuration
    if (remaining > 0) {
      const nextDay = current.add(1, "day");
      const nextDayOfWeek = nextDay.day();
      const nextDayConfig = defaultWorkingHours[nextDayOfWeek];
      
      if (nextDayConfig) {
        current = nextDay.hour(nextDayConfig.startHour).minute(nextDayConfig.startMinute).second(0);
      } else {
        // Ultimate fallback if no config exists
        current = nextDay.hour(6).minute(0).second(0);
      }
    }
  }

  return events;
}



