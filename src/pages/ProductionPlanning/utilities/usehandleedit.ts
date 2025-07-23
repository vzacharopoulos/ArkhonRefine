import { EventInput } from "@fullcalendar/core";
import dayjs, { Dayjs } from "dayjs";
import {
  findNextWorkingTime,
  getWorkingHours,
  isWithinWorkingHours,
  splitEventIntoWorkingHours,
} from "../dateschedule-utils";
import { WorkingHoursConfig } from "../productioncalendartypes";

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
      offtimeStartDate: dayjs(editStart).format('YYYY-MM-DDTHH:mm:ss'),
      offtimeEndDate: dayjs(editEnd).format('YYYY-MM-DDTHH:mm:ss'),
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

  return mergeSameDayEventParts(sorted);
}

function mergeSameDayEventParts(events: EventInput[]): EventInput[] {
  const eventGroups = new Map<string, EventInput[]>();

  events.forEach(event => {
    if (!event.start || !event.id) return;

    const eventDate = dayjs(event.start as Date).format("YYYY-MM-DD");
    const baseId = event.id.toString().split("-part-")[0];
    const groupKey = `${eventDate}-${baseId}`;

    if (!eventGroups.has(groupKey)) {
      eventGroups.set(groupKey, []);
    }
    eventGroups.get(groupKey)!.push(event);
  });

  const mergedEvents: EventInput[] = [];

  eventGroups.forEach(group => {
    if (group.length === 1) {
      mergedEvents.push(group[0]);
    } else {
      const sortedParts = group.sort((a, b) =>
        dayjs(a.start as Date).diff(dayjs(b.start as Date))
      );

      const firstPart = sortedParts[0];
      const lastPart = sortedParts[sortedParts.length - 1];

      mergedEvents.push({
        ...firstPart,
        id: firstPart.id!.split("-part-")[0],
        start: firstPart.start,
        end: lastPart.end,
        title: firstPart.title?.replace(/ - μέρος \d+$/, '') || firstPart.title,
      });
    }
  });

  return mergedEvents;
}
