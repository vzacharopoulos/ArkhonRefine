import { useUpdate } from "@refinedev/core";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { UPDATE_PPORDERS } from "@/graphql/queries";
import { HandleUpdateAllEventsParams, UpdateFn } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { STATUS_MAP, statusColorMap } from "@/utilities";
import { handleSaveEdit } from "@/pages/ProductionPlanning/utilities/usehandleedit";
import { addWorkingMinutesDynamic, calculateWorkingMinutesBetween } from "@/pages/ProductionPlanning/dateschedule-utils";

interface UseFinishPporderParams {
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  setEditStart: (date: Dayjs | null) => void;
  setEditEnd: (date: Dayjs | null) => void;
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
  refetchFinished?: () => Promise<any>;
    refetchPporders?: () => void;
  manualSyncRef: React.MutableRefObject<boolean>;
}

export const useFinishPporder = ({
  currentEvents,
  setCurrentEvents,
        refetchPporders,
  setEditStart,
  setEditEnd,
  dailyWorkingHours,
  defaultWorkingHours,
  handleUpdateAllEvents,
  refetchFinished,
  manualSyncRef,
}: UseFinishPporderParams) => {
  const { mutate: updatePporder } = useUpdate<PPOrder>();

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
        estStartDate: start.toISOString(),
        estFinishDate: end.toISOString(),
        ...extraValues,
      },
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });
  };


  const handleFinish = async (order: PPOrder) => {
    const now = dayjs('2025-07-23T11:00:00');
    manualSyncRef.current = true;
    setEditEnd(now);

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
                console.log("last object:", last);
console.log("Full refetchFinished result:", result);
        console.log("finished object:", finished);
console.log("finishDateDatetime type:", typeof last.finishDateDatetime);
console.log("finishDateDatetime value:", last.finishDateDatetime);
      if (last?.finishDateDatetime) {
        console.log("last?.finishDateDatetime",last?.finishDateDatetime)
        prevFinish = dayjs(last.finishDateDatetime as Date);
        prevId = last.id;
        prevPanelCode = last.code;
      }
    } catch (e) {
      console.error(e);
    }
  }


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

    // 2️⃣ Build the new events array
    const updatedEvents = handleSaveEdit(
      selectedEvent,
      editStart,
      now,
      currentEvents,
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
    // Remove all existing events with same baseId (e.g. "123-part-0", "123-part-1", etc)
    const filteredEvents = updatedEvents.filter(
      (ev) => !ev.id?.toString().startsWith(baseId)
    );

    // 🟢 3. Sort updated segments by start date
    const sorted = filteredEvents
      .filter((ev) => ev.start)
      .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)));


    const firstSegment = sorted[0];

const originalStart = dayjs(firstSegment.start as Date);
const originalEnd = dayjs(firstSegment.end as Date);
const delta = now.diff(originalStart, "minute"); // in minutes (can be negative)

const adjustedEnd = delta < 0
  ? originalEnd.subtract(Math.abs(delta), "minute")
  : originalEnd.add(delta, "minute");

         const finalupdatedEvents = handleSaveEdit(
        firstSegment,
        now, // new start
        adjustedEnd,
        filteredEvents,
        dailyWorkingHours,
        defaultWorkingHours,
      );
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
          estFinishDate: now.toISOString(),
          finishDateDatetime: now.toISOString(),
          status: 4,
           offtimestartdate: prevFinish ? prevFinish.toISOString() : null,
      offtimeenddate: start ? start.toISOString() : null,
      offtimeduration: offDuration,
      previd: prevId,
      prevpanelcode: prevPanelCode,
        },
        meta: {
          gqlMutation: UPDATE_PPORDERS,
        },
      });

          if (refetchPporders) {
      await refetchPporders();
    }


      if (refetchFinished) {
        await refetchFinished();

        setTimeout(() => {
          // 5️⃣ Update remaining events & DB
       handleUpdateAllEvents({
        events: finalupdatedEvents,
        dailyWorkingHours,
        defaultWorkingHours,
        updatePporder: updatePporderFn,
      });

          manualSyncRef.current = false;
        }, 5000);
        return;
      }
      console.log("currentEvents", currentEvents)




      // 6️⃣ Notify user
      message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
    };

    return { handleFinish };
  };


/*import { useUpdate } from "@refinedev/core";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { UPDATE_PPORDERS } from "@/graphql/queries";
import { HandleUpdateAllEventsParams, UpdateFn } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { STATUS_MAP, statusColorMap } from "@/utilities";
import { handleSaveEdit } from "@/pages/ProductionPlanning/utilities/usehandleedit";
import { addWorkingMinutesDynamic } from "@/pages/ProductionPlanning/dateschedule-utils";

interface UseFinishPporderParams {
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  setEditStart: (date: Dayjs | null) => void;
  setEditEnd: (date: Dayjs | null) => void;
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
  refetchFinished?: () => Promise<any>;
  manualSyncRef: React.MutableRefObject<boolean>;
}

export const useFinishPporder = ({
  currentEvents,
  setCurrentEvents,
  setEditStart,
  setEditEnd,
  dailyWorkingHours,
  defaultWorkingHours,
  handleUpdateAllEvents,
  refetchFinished,
  manualSyncRef,
}: UseFinishPporderParams) => {
  const { mutate: updatePporder } = useUpdate<PPOrder>();

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
        estFinishDate: end.toISOString(),
        ...extraValues,
      },
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });
  };


  const handleFinish = async (order: PPOrder) => {
    manualSyncRef.current = true;
    const now = dayjs();

    await updatePporder({
      resource: "pporders",
      id: order.id,
      values: {
        estFinishDate: now.toISOString(),
        finishDateDatetime: now.toISOString(),
        status: 4,
      },
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });

    let lastEnd = now;
    if (refetchFinished) {
      try {
        const result = await refetchFinished();
        const finished = result?.data?.masterlengths ?? [];
        const last = finished
          .filter((f: any) => f.finishDateDatetime)
          .sort((a: any, b: any) =>
            dayjs(a.finishDateDatetime).diff(dayjs(b.finishDateDatetime))
          )
          .pop();
        if (last?.finishDateDatetime) {
          lastEnd = dayjs(last.finishDateDatetime);
        }
      } catch (e) {
        console.error(e);
      }
    }

    setEditStart(lastEnd);

    const nextEvent = currentEvents
      .filter(
        (ev) => ev.extendedProps?.status === 14 && !ev.extendedProps?.isOfftime
      )
      .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)))[0];

    if (!nextEvent) {
      message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
      setTimeout(() => {
        manualSyncRef.current = false;
      }, 15000);
      return;
    }

    const duration = 
     nextEvent.extendedProps?.totalTime  
    ;
    const newEnd = addWorkingMinutesDynamic(
      lastEnd,
      duration,
      dailyWorkingHours,
      defaultWorkingHours
    );

    setEditEnd(newEnd);

    const updatedEvents = handleSaveEdit(
      nextEvent,
      lastEnd,
      newEnd,
      currentEvents,
      dailyWorkingHours,
      defaultWorkingHours
    );

    setCurrentEvents(updatedEvents);

    await handleUpdateAllEvents({
      events: updatedEvents,
      dailyWorkingHours,
      defaultWorkingHours,
      updatePporder: updatePporderFn,
    });

    message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);

    setTimeout(() => {
      manualSyncRef.current = false;
    }, 15000);
  };

  return { handleFinish };
};*/ 