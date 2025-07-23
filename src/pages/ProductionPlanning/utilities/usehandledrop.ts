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
import { createOfftimeTitle } from "../helpers/offtimetitle";

export function handleDropFactory(
  currentEvents: EventInput[],
  finishedEvents: EventInput[],
  totalTimeMinutes: number,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>,
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>,
  droppedIds: Set<string>,
  setDroppedIds: React.Dispatch<React.SetStateAction<Set<string>>>,
  
) {
  return function handleDrop(info: DropArg) {
    const draggedEvent = JSON.parse(info.draggedEl.dataset.event || "{}");
    if (droppedIds.has(draggedEvent.id)) return;

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

    // Determine offtime duration
    const previousEvent = allEvents
      .filter(ev => ev.end && typeof ev.id === "string" && !ev.id.includes("offtime"))
      .sort((a, b) => dayjs(b.end as Date).diff(dayjs(a.end as Date)))[0];

    const previousCode = previousEvent?.extendedProps?.panelcode?.replace(/-001$/, "");
    const currentCode = draggedEvent.extendedProps.panelcode?.replace(/-001$/, "");
    const offtimeduration = offTimeMap[previousCode]?.[currentCode] ?? 30;

    // Split the offtime event as needed
    const offtimeSegments = splitEventIntoWorkingHours(
      baseStart,
      offtimeduration,
      dailyWorkingHours,
      defaultWorkingHours,
      {
        id: `${draggedEvent.id}-offtime`,
         title: createOfftimeTitle(
          offtimeduration,
          draggedEvent.extendedProps.panelcode,
          previousEvent?.extendedProps?.panelcode,
        ),
        color: "gray",
        extendedProps: {
          isOfftime: true,
          prevId: previousEvent?.id?.toString(),
          currId: draggedEvent.id,
          prevpanelcode: previousEvent?.extendedProps?.panelcode,
          offtimeduration: offtimeduration,
          // We'll set individual segment start/end below
        }
      }
    );

    // Manually apply split segment start/end to their extendedProps
    offtimeSegments.forEach(seg => {
      seg.extendedProps = {
        ...seg.extendedProps,
       offtimeStartDate: dayjs(seg.start as Date).format('YYYY-MM-DDTHH:mm:ss'),
        offtimeEndDate: dayjs(seg.end as Date).format('YYYY-MM-DDTHH:mm:ss'),
      };
    });

    const lastOffEnd = dayjs(offtimeSegments[offtimeSegments.length - 1].end as Date);

    // Now schedule the actual job
    const jobSegments = splitEventIntoWorkingHours(
      lastOffEnd,
      durationInMinutes,
      dailyWorkingHours,
      defaultWorkingHours,
      {
        ...draggedEvent,
        start: lastOffEnd.toDate(),
        end: undefined,
      }
    );

    setCurrentEvents(prev => [...prev, ...offtimeSegments, ...jobSegments]);
  };
}
