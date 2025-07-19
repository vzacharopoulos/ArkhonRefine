import { useUpdate } from "@refinedev/core";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { UPDATE_PPORDERS } from "@/graphql/queries";
import { HandleUpdateAllEventsParams, UpdateFn } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { STATUS_MAP, statusColorMap } from "@/utilities";
import { handleSaveEdit } from "@/pages/ProductionPlanning/utilities/usehandleedit";

interface UseFinishPporderParams {
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  setEditEnd: (date: Dayjs | null) => void;
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
  refetchFinished?: () => void;
  manualSyncRef: React.MutableRefObject<boolean>;
}

export const useFinishPporder = ({
  currentEvents,
  setCurrentEvents,
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
     manualSyncRef.current = true;
    const now = dayjs('2025-07-21T08:00:00');
    setEditEnd(now);



    const baseId = String(order.id);

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
 console.log(editStart)
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
            color: ev.color ||statusColorMap[4] ,
            extendedProps: {
              ...ev.extendedProps,
              
              tooltip: `${order.pporderno ?? ""} - ${
                order.panelcode ?? ""
              }\nκατάσταση: ${STATUS_MAP[4]}`,
            },
          }
        : ev;
    });
console.log("updatedEvents",updatedEvents)
    // 3️⃣ Update UI state
    setCurrentEvents(updatedEvents);


  //  5️⃣ Update remaining events & DB
    await handleUpdateAllEvents({
      events: updatedEvents,
      dailyWorkingHours,
      defaultWorkingHours,
      updatePporder: updatePporderFn,
    });

        // 4️⃣ Persist finished order immediately
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

  if (refetchFinished) {
  const result = await refetchFinished();
 
    console.log("✅ result from refetch:", result);
    

}

    // 6️⃣ Notify user
    message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
  }
    // Reset flag after small delay to ensure UI update settles
    setTimeout(() => {
      manualSyncRef.current = false;
    }, 15000);
  

  return { handleFinish };
};