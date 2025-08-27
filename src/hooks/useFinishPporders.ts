import { useUpdate } from "@refinedev/core";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PanelMachinePause, PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { UPDATE_PAUSE, UPDATE_PPORDERS } from "@/graphql/queries";
import { HandleUpdateAllEventsParams, UpdateFn, UpdatePauseFn } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { STATUS_MAP, statusColorMap } from "@/utilities";
import { handleSaveEdit } from "@/pages/ProductionPlanning/utilities/usehandleedit";
import { addWorkingMinutesDynamic, calculateWorkingMinutesBetween, findNextWorkingTime, isWithinWorkingHours } from "@/pages/ProductionPlanning/dateschedule-utils";
import { useUpdateDailyWorkingHours } from "./useWorkingHours";
import { co } from "@fullcalendar/core/internal-common";

interface UseFinishPporderParams {
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  setEditStart: (date: Dayjs | null) => void;
  setEditEnd: (date: Dayjs | null) => void;
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  setDailyWorkingHours: React.Dispatch<React.SetStateAction<Record<string, WorkingHoursConfig>>>;
  updateDailyWorkingHours: (date: string, values: WorkingHoursConfig) => Promise<WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
  refetchFinished?: () => Promise<any>;
  refetchPporders?: () => void;
  manualSyncRef: React.MutableRefObject<boolean>;
  lastActiveOrderRef: React.MutableRefObject<PPOrder | null>;
}


export const useFinishPporder = ({
  currentEvents,
  setCurrentEvents,
  refetchPporders,
  setEditStart,
  setEditEnd,
  dailyWorkingHours,
  setDailyWorkingHours,
  updateDailyWorkingHours,
  defaultWorkingHours,
  handleUpdateAllEvents,
  refetchFinished,
  manualSyncRef,
  lastActiveOrderRef
}: UseFinishPporderParams) => {
  const { mutate: updatePporder } = useUpdate<PPOrder>();
    const { mutate: updatePauseMutation } = useUpdate<PanelMachinePause>();

  const updatePporderFn: UpdateFn = async (
    id: number,
    start: Date,
    end: Date,
    extraValues: Partial<PPOrder> = {},
  ) => {
    await updatePporder({
      resource: "pporders",
      id,
      values: {
        estStartDate: dayjs(start).format('YYYY-MM-DDTHH:mm:ssZ'),
        estFinishDate: dayjs(end).format('YYYY-MM-DDTHH:mm:ssZ'),
        ...extraValues,
      },
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });
  };

    const updatePauseFn: UpdatePauseFn = async (pause: PanelMachinePause) => {
    await updatePauseMutation({
      resource: "panelmachinepauses",
      id: pause.id ?? 0,
      values: pause as any,
      meta: {
        gqlMutation: UPDATE_PAUSE,
      },
    });
  };




  const handleFinish = async (order: PPOrder) => {
      const now = dayjs("2025-08-27T18:00:00.000");
    if (!isWithinWorkingHours(now, dailyWorkingHours, defaultWorkingHours)) {
      const dateKey = now.format("YYYY-MM-DD");

      const existingConfig = dailyWorkingHours[dateKey];
      const defaultConfig = defaultWorkingHours[now.day()]; // day() gives 0–6 (Sun–Sat)

      const startHour = existingConfig?.startHour ?? defaultConfig.startHour;
      const startMinute = existingConfig?.startMinute ?? defaultConfig.startMinute;

      const endHour = parseInt(now.format("HH"), 10);
      const endMinute = parseInt(now.format("mm"), 10);

      const newDailyWorkingHours = {
        ...dailyWorkingHours,
        [dateKey]: {
          startHour,
          startMinute,
          endHour,
          endMinute,
          isWorkingDay: true,
        },
      };



      await updateDailyWorkingHours(dateKey, {
        startHour,
        startMinute,
        endHour,
        endMinute,
        isWorkingDay: true,
      });

      setDailyWorkingHours(newDailyWorkingHours);




    }
    manualSyncRef.current = true;


    const baseId = String(order.id);

    // Determine previous finished order info
    let prevFinish: Dayjs | null = null;
    let prevId: number | undefined;
    let prevPanelCode: string | undefined;
    if (refetchFinished) {
      try {
        const result = await refetchFinished();
        const finished = result?.data?.data.masterlengths ?? [];
        const last = finished

          .filter((f: any) => f.finishDateDatetime)
          .sort((a: any, b: any) =>
            dayjs(a.finishDateDatetime).diff(dayjs(b.finishDateDatetime))
          )
          .pop();
       
        if (last?.finishDateDatetime) {
          console.log("last?.finishDateDatetime", dayjs(last.finishDateDatetime).format("YYYY-MM-DD HH:mm:ss"))
          prevFinish = dayjs(last.finishDateDatetime as Date);
          prevId = last.id;
          prevPanelCode = last.code;
        }
      } catch (e) {
        console.error(e);
      }
    }

    console.log("currentEvents", currentEvents);

    // 1️⃣ Find the earliest job segment for this order
const jobEvents = currentEvents
  .filter(
    (ev) =>
      ev.id &&
      ev.id.toString().split("-part-")[0] === baseId &&
      !ev.extendedProps?.isOfftime,
  )
  .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)));
const selectedEvent = jobEvents[0];
if (!selectedEvent) return;

const editStart = dayjs(selectedEvent.start as Date);

// 🔥 Only keep non-job events or the first job segment
const filteredCurrentEvents = currentEvents.filter(ev => {
  const isSameJob =
    ev.id &&
    !ev.id.toString().includes("offtime")&&
    ev.id.toString().split("-part-")[0] === baseId &&
    !ev.extendedProps?.isOfftime;
  return !isSameJob || ev.id === selectedEvent.id;
});

// Then, use filteredCurrentEvents:
const updatedEvents = handleSaveEdit(
  selectedEvent,
  editStart,
  now,
  filteredCurrentEvents, // 👈 Use filtered here!
  dailyWorkingHours,
  defaultWorkingHours,
    ).map((ev) => {
      const evBase = ev.id?.toString().split("-part-")[0];
      return evBase === baseId && !ev.extendedProps?.isOfftime
        ? {
          ...ev,
          color: statusColorMap[4] || ev.color,
          extendedProps: {
            ...ev.extendedProps,
            tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""
              }\nκατάσταση: ${STATUS_MAP[4]}`,
          },
        }
        : ev;
    });
    console.log("updatedEvents", updatedEvents);
    // Remove all existing events with same baseId (e.g. "123-part-0", "123-part-1", etc)
    const filteredEvents = updatedEvents.filter(
      (ev) => !ev.id?.toString().startsWith(baseId)&&
      !ev.id?.toString().includes(String(selectedEvent.id)
        )    );

//         const filteredEvents = updatedEvents.filter(ev => {
//   const idStr = ev.id?.toString() ?? "";
//   // Remove if starts with baseId
//   if (idStr.startsWith(baseId)) {
//     return false;
//   }
//   // Remove if includes selectedId, unless exactly "selectedId-part-0"
//   if (idStr.includes(selectedId)) {
//     return idStr === `${selectedId}-part-0`;
//   }
//   // Keep all other events
//   return true;
// });

    // 🟢 3. Sort updated segments by start date
    const sorted = filteredEvents
      .filter((ev) => ev.start)
      .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)));

    console.log("sorted", sorted)
    const firstSegment = sorted[0];
 const secondSegment = sorted[1];
    if (!firstSegment || !firstSegment.start || !firstSegment.end) {
      console.warn("First segment is missing start or end date.");
      
       updatePporder({
      resource: "pporders",
      id: order.id,
      values: {
        estFinishDate: dayjs(now).format('YYYY-MM-DDTHH:mm:ssZ'),
        finishDateDatetime: dayjs(now).format('YYYY-MM-DDTHH:mm:ssZ'),
        status: 4,
      
      },
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });
await refetchFinished
await refetchPporders
setCurrentEvents(currentEvents)
  
      return;
    }
    let i=1





    const originalStart = dayjs(firstSegment.start as Date);
    const originalEnd = dayjs(firstSegment.end as Date);
//     const delta = now.diff(originalStart, "minute"); // in minutes (can be negative)

//     const adjustedEnd = delta < 0
//       ? originalEnd.subtract(Math.abs(delta), "minute")
//       : originalEnd.add(delta, "minute");
// console.log("adjustedEnd", adjustedEnd.format("YYYY-MM-DD HH:mm:ss"))
console.log("originalEnd", originalEnd.format("YYYY-MM-DD HH:mm:ss"))
console.log("originalStart", originalStart.format("YYYY-MM-DD HH:mm:ss"))
    
const adjustedEnd =sorted[0].end ? dayjs(sorted[0].end as Date) : originalEnd;
      const NextWorkingTimeadjustedEnd=findNextWorkingTime(
      dayjs(adjustedEnd), // start date
      dailyWorkingHours,
      defaultWorkingHours,
    );

    const finalupdatedEvents = handleSaveEdit(
      firstSegment,
      originalStart, // new start
      NextWorkingTimeadjustedEnd,
      filteredEvents,
      dailyWorkingHours,
      defaultWorkingHours,
    );
    console.log("finalupdatedEvents", finalupdatedEvents);
    setCurrentEvents(finalupdatedEvents);


    // Merge with updated finished events
    console.log("updatedEvents", updatedEvents)
    console.log("filteredEvents", filteredEvents)
    console.log("prevFinish", prevFinish)


    const start = order.startDateDatetime ? dayjs(order.startDateDatetime as Date) : null;
    console.log("start", start)

    let offDuration = 0;
    if (prevFinish && start) {
      offDuration = calculateWorkingMinutesBetween(
        prevFinish,
        start,
        dailyWorkingHours,
        defaultWorkingHours,
      );
    }

    // 4️⃣ Persist finished order immediately
    await updatePporder({
      resource: "pporders",
      id: order.id,
      values: {
        estFinishDate: dayjs(now).format('YYYY-MM-DDTHH:mm:ssZ'),
        finishDateDatetime: dayjs(now).format('YYYY-MM-DDTHH:mm:ssZ'),
        status: 4,
        offtimestartdate: prevFinish ? dayjs(prevFinish).format('YYYY-MM-DDTHH:mm:ssZ') : null,
        offtimeenddate: start ? dayjs(start).format('YYYY-MM-DDTHH:mm:ssZ') : null,
        offtimeduration: offDuration,
        previd: prevId,
        prevpanelcode: prevPanelCode,
      },
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });

  

    console.log(`Successfully updated PPOrder ${order.status}`);

      setTimeout(() => {
        // 5️⃣ Update remaining events & DB
        handleUpdateAllEvents({
          events: finalupdatedEvents,
          dailyWorkingHours,
          defaultWorkingHours,
          updatePporder: updatePporderFn,
          updatePause: updatePauseFn,
        });

        manualSyncRef.current = false;
      }, 2000);
   
    console.log("currentEvents", currentEvents)




    // 6️⃣ Notify user
    message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
  };

  return { handleFinish };
};


