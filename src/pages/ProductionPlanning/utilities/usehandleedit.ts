import { EventInput } from "@fullcalendar/core";
import dayjs, { Dayjs } from "dayjs";
import {
  findNextWorkingTime,
  getWorkingHours,
  isWithinWorkingHours,
  mergeSameDayEventParts,
  splitEventIntoWorkingHours,
} from "../dateschedule-utils";
import { WorkingHoursConfig } from "../productioncalendartypes";
import { deduplicateEventIds } from "../event-utils";

export function handleSaveEdit(
  selectedEvent: EventInput | null,
  editStart: Dayjs | null,
  editEnd: Dayjs | null,
  prevEvents: EventInput[],
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): EventInput[] {
  if (!selectedEvent || !editStart || !editEnd) return prevEvents;

  const originalStart = selectedEvent.start ? dayjs(selectedEvent.start as Date) : null;
  const originalEnd = selectedEvent.end ? dayjs(selectedEvent.end as Date) : null;

  if (!originalEnd || !originalStart) return prevEvents;

  const sorted = [...prevEvents].sort((a, b) =>
    dayjs(a.start as Date).diff(dayjs(b.start as Date))
  );

  const idx = sorted.findIndex(
    ev =>
      ev.id === selectedEvent.id &&
      dayjs(ev.start as Date).isSame(originalStart) &&
      dayjs(ev.end as Date).isSame(originalEnd)
  );

  if (idx === -1) return prevEvents;

  const updatedEvent: EventInput = {
    ...sorted[idx],
    start: editStart.toDate(),
    end: editEnd.toDate(),
  };

  if (sorted[idx].extendedProps?.isOfftime) {
    const newDuration = editEnd.diff(editStart, "minute");
    updatedEvent.extendedProps = {
      ...sorted[idx].extendedProps,
      offtimeduration: newDuration,
      offtimeStartDate: dayjs(editStart).format('YYYY-MM-DDTHH:mm:ssZ'),
      offtimeEndDate: dayjs(editEnd).format('YYYY-MM-DDTHH:mm:ssZ'),
    };
  }

   if (sorted[idx].extendedProps?.isPause) {
    const newDuration = editEnd.diff(editStart, "minute");
    updatedEvent.extendedProps = {
      ...sorted[idx].extendedProps,
      pauseduration: newDuration,
      pausestartdate: dayjs(editStart).format('YYYY-MM-DDTHH:mm:ssZ'),
      pauseenddate: dayjs(editEnd).format('YYYY-MM-DDTHH:mm:ssZ'),
    };
  }


  sorted[idx] = updatedEvent;

  let prevEnd = editEnd;

  for (let i = idx + 1; i < sorted.length; i++) {
    const ev = sorted[i];
    const duration = dayjs(ev.end as Date).diff(dayjs(ev.start as Date), "minute");

    const tentativeStart = isWithinWorkingHours(prevEnd, dailyWorkingHours, defaultWorkingHours)
      ? prevEnd
      : findNextWorkingTime(prevEnd, dailyWorkingHours, defaultWorkingHours);

    sorted.splice(i, 1);

    const splitEvents = splitEventIntoWorkingHours(
      tentativeStart,
      duration,
      dailyWorkingHours,
      defaultWorkingHours,
      {
        ...ev,
        start: tentativeStart.toDate(),
        end: undefined,
      }
    );

    sorted.splice(i, 0, ...splitEvents);
    i += splitEvents.length - 1;
    prevEnd = dayjs(splitEvents[splitEvents.length - 1].end as Date);
  }
deduplicateEventIds(sorted);
  return mergeSameDayEventParts(sorted);
}

/**
 * Merges events that are on the same day and consecutive.
 * This is useful to avoid having multiple parts of the same event on the calendar.
 * 
 * @param events - Array of FullCalendar EventInput objects
 * @returns Merged array of EventInput objects
 */

