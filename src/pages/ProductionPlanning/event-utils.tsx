import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrderLine } from './productioncalendartypes';


import React, { useState } from "react";
import { Tooltip } from "antd";


import { StatusTag } from "@/utilities/map-status-id-to-name";

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


const workingHoursOverrides: Record<string, { start: number; end: number }> = {
  "2025-07-01": { start: 8, end: 18 },
  // future entries can be added here
};


export const getWorkingHours = (date: dayjs.Dayjs) => {
  const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday
  const dateStr = date.format("YYYY-MM-DD");

  let startHour = 6;
  let endHour = 22;

  if (dayOfWeek === 6) {
    startHour = 0;
    endHour = 15;
  }

  if (dayOfWeek === 5) {
    startHour = 6;
    endHour = 24;
  }

  if (workingHoursOverrides[dateStr]) {
    startHour = workingHoursOverrides[dateStr].start;
    endHour = workingHoursOverrides[dateStr].end;
  }

  const isBusinessDay = dayOfWeek >= 1 && dayOfWeek <= 6;

  // Check if there's a per-day override
  
  return { isBusinessDay, startHour, endHour };
};

export const isWithinWorkingHours = (date: dayjs.Dayjs): boolean => {
  const { isBusinessDay, startHour, endHour } = getWorkingHours(date);
  const hour = date.hour();

  const isBusinessHour = hour >= startHour && hour < endHour;

  return isBusinessDay && isBusinessHour;
};

export const splitIntoWorkingHourEvents = (
  start: Dayjs,
  durationMinutes: number,
): { start: Date; end: Date }[] => {
  let segments: { start: Date; end: Date }[] = [];
  let remaining = durationMinutes;
  let current = start.clone();

  while (remaining > 0) {
    const { isBusinessDay, startHour, endHour } = getWorkingHours(current);

    if (!isBusinessDay) {
      current = current.add(1, "day").startOf("day");
      continue;
    }

    let segmentStart = current;

    if (segmentStart.hour() < startHour) {
      segmentStart = segmentStart.set("hour", startHour).set("minute", 0);
    }

    if (segmentStart.hour() >= endHour) {
      current = current.add(1, "day").startOf("day");
      continue;
    }

    const dayEnd = segmentStart.clone().set("hour", endHour).set("minute", 0);
    let segmentEnd = segmentStart.add(remaining, "minute");

    if (segmentEnd.isAfter(dayEnd)) {
      segmentEnd = dayEnd;
    }

    segments.push({ start: segmentStart.toDate(), end: segmentEnd.toDate() });

    remaining -= segmentEnd.diff(segmentStart, "minute");
    current = segmentEnd;

    if (remaining > 0) {
      current = current.add(1, "minute").startOf("minute");
    }
  }

  return segments;
};



interface WorkingHoursConfig {
  startHour: number;
  endHour: number;
  workingDays: number[]; // 0 = Sunday, 6 = Saturday
}

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
      current = current.add(1, "day").hour(config.startHour).minute(0).second(0);
      continue;
    }

    const hour = current.hour();

    // Before work hours
    if (hour < config.startHour) {
      current = current.hour(config.startHour).minute(0).second(0);
    }

    // After work hours
    if (hour >= config.endHour) {
      current = current.add(1, "day").hour(config.startHour).minute(0).second(0);
      continue;
    }

    const endOfWork = current.clone().hour(config.endHour).minute(0).second(0);
    const availableMinutes = endOfWork.diff(current, "minute");

    const chunk = Math.min(availableMinutes, remaining);
    current = current.add(chunk, "minute");
    remaining -= chunk;
  }

  return current;
}

