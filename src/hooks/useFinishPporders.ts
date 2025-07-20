import { useUpdate } from "@refinedev/core";
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
  const now = dayjs('2025-07-22T08:00:00'); // or use dayjs('2025-07-22T08:00:00') for testing
  manualSyncRef.current = true;

  const baseId = String(order.id);

  // Find all job segments (non-offtime)
  const jobSegments = currentEvents
    .filter(
      (ev) =>
        ev.id?.toString().startsWith(baseId + "-part-") &&
        !ev.extendedProps?.isOfftime
    )
    .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)));

  const firstSegment = jobSegments[0];
  if (!firstSegment) return;
console.log("firstSegment",firstSegment)
console.log("currentEvents before",currentEvents)

  setCurrentEvents(prevEvents =>
              handleSaveEdit(
                firstSegment,
                dayjs(firstSegment.start as Date),
                now,
                prevEvents,
                dailyWorkingHours,
                defaultWorkingHours
              )
            );
console.log("currentEvents",currentEvents)

 
  // 🟢 Remove old segments and set new ones
  const cleanedEvents = currentEvents.filter(
    (ev) => !ev.id?.toString().startsWith(baseId + "-part-")
  );
  const finalEvents = [...cleanedEvents];
  setCurrentEvents(finalEvents);

  // 🟢 Update order in DB
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

  // 🟢 Optional: refetch finished orders
  if (refetchFinished) {
    await refetchFinished();
  }

  // 🟢 Persist final updated events to backend
  await handleUpdateAllEvents({
    events: finalEvents,
    dailyWorkingHours,
    defaultWorkingHours,
    updatePporder: updatePporderFn,
  });

  message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);

  // 🟢 Turn off sync flag after a delay to prevent unintended updates
  setTimeout(() => {
    manualSyncRef.current = false;
  }, 15000);
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