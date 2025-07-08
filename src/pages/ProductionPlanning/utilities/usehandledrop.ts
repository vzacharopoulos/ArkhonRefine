// utils/useHandleDrop.ts
import dayjs, { Dayjs } from "dayjs";
import { DropArg } from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { addWorkingMinutes, findLastEventEndTime, getWorkingHours, isWithinWorkingHours, splitEventIntoWorkingHours } from "../dateschedule-utils";
import { WorkingHoursConfig } from "../productioncalendartypes";



export function handleDropFactory(
  currentEvents: EventInput[],
  finishedEvents: EventInput[],
  totalTimeMinutes: number,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>,
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>,
  dropTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) {
  

  const findNextWorkingTime = (
    startTime: Dayjs,
    dailyWorkingHours: Record<string, WorkingHoursConfig>,
    defaultWorkingHours: Record<number, WorkingHoursConfig>
  ): Dayjs => {
    let currentTime = startTime;
    let maxDaysToCheck = 30;

    while (maxDaysToCheck > 0) {
      const workingHoursConfig = getWorkingHours(currentTime, dailyWorkingHours, defaultWorkingHours);

      if (workingHoursConfig.isBusinessDay) {
        const dayStart = currentTime.startOf("day").hour(workingHoursConfig.startHour).minute(workingHoursConfig.startMinute);
        const dayEnd = currentTime.startOf("day").hour(workingHoursConfig.endHour).minute(workingHoursConfig.endMinute);

        if (currentTime.isBefore(dayStart)) return dayStart;
        if (currentTime.isBetween(dayStart, dayEnd, null, "[]")) return currentTime;
      }

      currentTime = currentTime.add(1, "day").startOf("day");
      maxDaysToCheck--;
    }

    return startTime;
  };

  return function handleDrop(info: DropArg) {
    if (dropTimeoutRef.current) return;

dropTimeoutRef.current = setTimeout(() => {
  dropTimeoutRef.current = null;
}, 50);
    const dropDate = dayjs(info.date);
    const draggedEvent = JSON.parse(info.draggedEl.dataset.event || "{}");
    const durationInMinutes = draggedEvent.extendedProps?.duration ?? totalTimeMinutes;

    const lastEventEndTime = findLastEventEndTime([...currentEvents, ...finishedEvents]);

    let actualStartTime: Dayjs;

    if (lastEventEndTime) {
      const proposedStartTime = lastEventEndTime;

      actualStartTime = isWithinWorkingHours(proposedStartTime, dailyWorkingHours, defaultWorkingHours)
        ? proposedStartTime
        : findNextWorkingTime(proposedStartTime, dailyWorkingHours, defaultWorkingHours);
    } else {
      actualStartTime = isWithinWorkingHours(dropDate, dailyWorkingHours, defaultWorkingHours)
        ? dropDate
        : findNextWorkingTime(dropDate, dailyWorkingHours, defaultWorkingHours);
    }

    const eventSegments = splitEventIntoWorkingHours(
      actualStartTime,
      durationInMinutes,
      dailyWorkingHours,
      defaultWorkingHours,
      draggedEvent
    );

    const lastSegment = eventSegments[eventSegments.length - 1];
    if (lastSegment) {
      const offtimeStart = findNextWorkingTime(dayjs(lastSegment.end as Date), dailyWorkingHours, defaultWorkingHours);
      const offtimeConfig = getWorkingHours(offtimeStart, dailyWorkingHours, defaultWorkingHours);
      const offtimeEnd = addWorkingMinutes(offtimeStart, 30, offtimeConfig);

      const offEvent: EventInput = {
        id: `${draggedEvent.id}-offtime`,
        title: "προετοιμασία μηχανής",
        start: offtimeStart.toDate(),
        end: offtimeEnd.toDate(),
        color: "gray",
        extendedProps: { isOfftime: true },
      };

      setCurrentEvents(prev => [...prev, ...eventSegments, offEvent]);
    } else {
      setCurrentEvents(prev => [...prev, ...eventSegments]);
    }
  };
}
