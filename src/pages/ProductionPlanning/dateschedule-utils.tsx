import dayjs, { Dayjs } from "dayjs";
import { EventInput } from "@fullcalendar/core";
import { WorkingHoursConfig } from "./productioncalendartypes";

export const findLastEventEndTime = (events: EventInput[]): Dayjs | null => {
  if (events.length === 0) return null;

  const sortedEvents = events
    .filter(event => event.end) // Include ALL events with end times (including offtime)
    .sort((a, b) => {
      const endA = dayjs(a.end as Date);
      const endB = dayjs(b.end as Date);
      return endB.diff(endA); // Sort by end time descending
    });

  return sortedEvents.length > 0 ? dayjs(sortedEvents[0].end as Date) : null;
};


// Helper function to get date range for background events
function getDateRange(days: number): Dayjs[] {
  const today = dayjs();
  const start = today.subtract(days / 2, "day");
  return Array.from({ length: days }, (_, i) => start.add(i, "day"));
}


// Helper function to generate non-working hour background events
export function generateNonWorkingHourBackgroundEvents(
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): EventInput[] {
  const allDays = getDateRange(60);
  const events: EventInput[] = [];

  for (const day of allDays) {
    const dateStr = day.format("YYYY-MM-DD");
    const dayOfWeek = day.day();

    // Get configuration for this specific day
    const specificConfig = dailyWorkingHours[dateStr];
    const config = specificConfig || defaultWorkingHours[dayOfWeek];

    if (!config) continue;

    // If it's not a working day, block the full day
    if (!config.workingDays.includes(dayOfWeek)) {
      events.push({
        start: `${dateStr}T00:00:00`,
        end: `${dateStr}T23:59:59`,
        display: 'background',
        color: 'rgb(158, 128, 128)',
        title: 'αργία',
      });
      continue;
    }

    // Format time strings with proper padding
    const startTimeStr = `${String(config.startHour).padStart(2, '0')}:${String(config.startMinute).padStart(2, '0')}:00`;
    const endTimeStr = `${String(config.endHour).padStart(2, '0')}:${String(config.endMinute).padStart(2, '0')}:00`;

    // Before working hours - only if start time is after 00:00
    if (config.startHour > 0 || config.startMinute > 0) {
      events.push({
        start: `${dateStr}T00:00:00`,
        end: `${dateStr}T${startTimeStr}`,
        display: 'background',
        color: 'rgba(188, 99, 99, 0.51)',
        title: 'πριν την έναρξη',
      });
    }

    // After working hours - only if end time is before 24:00 (midnight)
    if (config.endHour < 24) {
      events.push({
        start: `${dateStr}T${endTimeStr}`,
        end: `${dateStr}T23:59:59`,
        display: 'background',
        color: 'rgba(188, 99, 99, 0.51)',
        title: 'λήξη εργασίας',
      });
    } else if (config.endHour === 24 && config.endMinute > 0) {
      // Handle cases where endHour is 24 but endMinute is not 0
      // This shouldn't normally happen, but if it does, we treat it as ending at midnight
      // No background event needed as it goes to the end of the day
    }
    // If endHour is 24 and endMinute is 0, working hours go to midnight, so no "after hours" event needed
  }

  return events;
}

export const findNextWorkingTime = (startTime: Dayjs, dailyWorkingHours: Record<string, WorkingHoursConfig>, defaultWorkingHours: Record<number, WorkingHoursConfig>): Dayjs => {
  let currentTime = startTime;
  let maxDaysToCheck = 30; // Prevent infinite loops

  while (maxDaysToCheck > 0) {
    const workingHoursConfig = getWorkingHours(currentTime, dailyWorkingHours, defaultWorkingHours);

    if (workingHoursConfig.isBusinessDay) {
      const dayStart = currentTime.startOf('day')
        .hour(workingHoursConfig.startHour)
        .minute(workingHoursConfig.startMinute);
      const dayEnd = currentTime.startOf('day')
        .hour(workingHoursConfig.endHour)
        .minute(workingHoursConfig.endMinute);

      // If current time is before the working day starts, use the start of working day
      if (currentTime.isBefore(dayStart)) {
        return dayStart;
      }

      // If current time is within working hours, use current time
      if (currentTime.isBetween(dayStart, dayEnd, null, '[]')) {
        return currentTime;
      }

      // If current time is after working hours, move to next day
    }

    // Move to the next day
    currentTime = currentTime.add(1, 'day').startOf('day');
    maxDaysToCheck--;
  }

  // Fallback to original time if no working time found
  return startTime;
};


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
      // Move to next working day
      const nextDay = current.add(1, "day");
      const nextDateKey = nextDay.format("YYYY-MM-DD");
      const nextDayOfWeek = nextDay.day();
      const nextDayConfig = dailyWorkingHours[nextDateKey] ?? defaultWorkingHours[nextDayOfWeek];

      if (nextDayConfig) {
        current = nextDay
          .hour(nextDayConfig.startHour)
          .minute(nextDayConfig.startMinute)
          .second(0);
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
      // Move to next working day
      const nextDay = current.add(1, "day");
      const nextDateKey = nextDay.format("YYYY-MM-DD");
      const nextDayOfWeek = nextDay.day();
      const nextDayConfig = dailyWorkingHours[nextDateKey] ?? defaultWorkingHours[nextDayOfWeek];

      if (nextDayConfig) {
        current = nextDay
          .hour(nextDayConfig.startHour)
          .minute(nextDayConfig.startMinute)
          .second(0);
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
      title: events.length === 0 ? eventData.title : `${eventData.title} `,
      start: current.toDate(),
      end: segmentEnd.toDate(),
      extendedProps: {
        ...eventData.extendedProps,
        isPart: partIndex > 1,
        partIndex,
      },
    });

    current = segmentEnd;
    remaining -= chunk;
    partIndex++;

    // When moving to the next day, use the next day's configuration
    if (remaining > 0) {
      const nextDay = current.add(1, "day");
      const nextDateKey = nextDay.format("YYYY-MM-DD");
      const nextDayOfWeek = nextDay.day();
      const nextDayConfig = dailyWorkingHours[nextDateKey] ?? defaultWorkingHours[nextDayOfWeek];

      if (nextDayConfig) {
        current = nextDay
          .hour(nextDayConfig.startHour)
          .minute(nextDayConfig.startMinute)
          .second(0);
      } else {
        // Ultimate fallback if no config exists
        current = nextDay.hour(6).minute(0).second(0);
      }
    }
  }

  return events;
}

