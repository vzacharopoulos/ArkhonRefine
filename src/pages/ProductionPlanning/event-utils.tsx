import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrderLine } from './productioncalendartypes';


import React from "react";
import { Tooltip } from "antd";

interface EventTooltipProps {
  tooltip: string;
  children: React.ReactElement;
}

// In your event-utils.ts
export const EventTooltip: React.FC<EventTooltipProps> = ({ tooltip, children }) => (
  <Tooltip 
    title={<span style={{ whiteSpace: "pre-line" }}>{tooltip}</span>}
    
    styles={{ root: { maxWidth: 600 } }}
  >
    <div style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%'
    }}>
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


export const isWithinWorkingHours = (date: dayjs.Dayjs): boolean => {
  const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday
  const hour = date.hour();
  const dateStr = date.format("YYYY-MM-DD");

  // Default working hours
  let startHour = 6;
  let endHour = 22;
 // Special Saturday hours (00:00-15:00)
  if (dayOfWeek === 6) {
    startHour = 0;
    endHour = 15;
  }
   if (dayOfWeek === 5) {
    startHour = 6;
    endHour = 24;
  }



  // Check if there's a per-day override
  if (workingHoursOverrides[dateStr]) {
    startHour = workingHoursOverrides[dateStr].start;
    endHour = workingHoursOverrides[dateStr].end;
  }

  const isBusinessDay = dayOfWeek >= 1 && dayOfWeek <= 6;
  const isBusinessHour = hour >= startHour && hour < endHour;

  return isBusinessDay && isBusinessHour;
};