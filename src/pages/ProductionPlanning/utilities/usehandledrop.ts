import dayjs, { Dayjs } from "dayjs";
import { DropArg } from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import {
  addWorkingMinutes,
  findLastEventEndTime,
  findNextWorkingTime,
  getWorkingHours,
  isWithinWorkingHours,
  splitEventIntoWorkingHours,
} from "../dateschedule-utils";
import { WorkingHoursConfig } from "../productioncalendartypes";
import { offTimeMap } from "./offtime-map";

export function handleDropFactory(
  currentEvents: EventInput[],
  finishedEvents: EventInput[],
  totalTimeMinutes: number,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>,
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>,
  droppedIds: Set<string>,
  setDroppedIds: React.Dispatch<React.SetStateAction<Set<string>>>
) {
  return function handleDrop(info: DropArg) {
    const draggedEvent = JSON.parse(info.draggedEl.dataset.event || "{}");

    if (droppedIds.has(draggedEvent.id)) return;

    // Avoid duplicates
    setDroppedIds(prev => new Set(prev).add(draggedEvent.id));
    setTimeout(() => {
      setDroppedIds(prev => {
        const updated = new Set(prev);
        updated.delete(draggedEvent.id);
        return updated;
      });
    }, 100);

    const dropDate = dayjs(info.date);
    const durationInMinutes = draggedEvent.extendedProps?.duration ?? totalTimeMinutes;
    const allEvents = [...currentEvents, ...finishedEvents];

    const lastEventEndTime = findLastEventEndTime(allEvents);

    let baseStart: Dayjs;
    if (lastEventEndTime) {
      baseStart = isWithinWorkingHours(lastEventEndTime, dailyWorkingHours, defaultWorkingHours)
        ? lastEventEndTime
        : findNextWorkingTime(lastEventEndTime, dailyWorkingHours, defaultWorkingHours);
    } else {
      baseStart = isWithinWorkingHours(dropDate, dailyWorkingHours, defaultWorkingHours)
        ? dropDate
        : findNextWorkingTime(dropDate, dailyWorkingHours, defaultWorkingHours);
    }

    // Find previous event for offtime logic
    
     const previousEvent = allEvents
  .filter(ev => ev.end && typeof ev.id === "string" && !ev.id.includes("offtime"))
  .sort((a, b) => dayjs(b.end as Date).diff(dayjs(a.end as Date)))[0];

   const previousCode = previousEvent.extendedProps?.panelcode?.replace(/-001$/, "");
const currentCode = draggedEvent.extendedProps.panelcode?.replace(/-001$/, "");
const offtimeDuration = offTimeMap[previousCode]?.[currentCode] ?? 30;
 

    // Determine offtime start and end
    const offtimeStart = baseStart;
    const offtimeConfig = getWorkingHours(offtimeStart, dailyWorkingHours, defaultWorkingHours);
    const offtimeEnd = addWorkingMinutes(offtimeStart, offtimeDuration, offtimeConfig);

    // Adjust dropped job to start AFTER offtime
    const jobStart = offtimeEnd;

    const eventSegments = splitEventIntoWorkingHours(
      jobStart,
      durationInMinutes,
      dailyWorkingHours,
      defaultWorkingHours,
      draggedEvent
    );

    const offEvent: EventInput = {
      id: `${draggedEvent.id}-offtime`,
      title: "προετοιμασία μηχανής",
      start: offtimeStart.toDate(),
      end: offtimeEnd.toDate(),
      color: "gray",
      extendedProps: { isOfftime: true },
    };

    setCurrentEvents(prev => [...prev, offEvent, ...eventSegments]);
  };
}
