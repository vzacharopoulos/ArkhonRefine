import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrderLine } from './productioncalendartypes';


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

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