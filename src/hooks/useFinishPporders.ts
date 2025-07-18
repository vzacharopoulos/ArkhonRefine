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
}

export const useFinishPporder = ({
  currentEvents,
  setCurrentEvents,
  setEditEnd,
  dailyWorkingHours,
  defaultWorkingHours,
  handleUpdateAllEvents,
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
  const now = dayjs();
  setEditEnd(now);

  const baseId = String(order.id);

  // 1️⃣  Find the first (earliest-start) job segment for this order
  const jobEvents = currentEvents
    .filter(
      (ev) =>
        ev.id &&
        ev.id.toString().split("-part-")[0] === baseId &&
        !ev.extendedProps?.isOfftime,
    )
    .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)));

  const selectedEvent = jobEvents[0];
  if (!selectedEvent) return;            // nothing to finish

  const editStart = dayjs(selectedEvent.start as Date);

  // 2️⃣  Build the **new** events array
  const updatedEvents = handleSaveEdit(
    selectedEvent,
    editStart,
    now,
    currentEvents,                        // <-- use currentEvents, not prev
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
            status: 4,
            tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}\nκατάσταση: ${
              STATUS_MAP[4]
            }`,
          },
        }
      : ev;
  });

  // 3️⃣  Apply to state once
  setCurrentEvents(updatedEvents);

  // 4️⃣  Update subsequent events & DB
  await handleUpdateAllEvents({
    events: updatedEvents,
    dailyWorkingHours,
    defaultWorkingHours,
    updatePporder: updatePporderFn,
  });

  // 5️⃣  Notify user
  message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
}; return { handleFinish }}
    //   console.log("estFinishDate",order.estFinishDate)
    // await handleUpdateAllEvents({
    //   events: currentEvents,
    //   dailyWorkingHours,
    //   defaultWorkingHours,
    //   updatePporder: updatePporderFn,
    // });
    //   console.log("order.estFinishDate",order.estFinishDate)
    //   console.log("order.status",order.status)
 
    // await updatePporder({
    //   resource: "pporders",
    //   id: order.id,
    //   values: {
    //     estFinishDate: now.toISOString(),
    //     finishDateDatetime: now.toISOString(),
    //     status: 4,
    //   },
    //   meta: {
    //     gqlMutation: UPDATE_PPORDERS,
    //   },
    // });

//     message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
//   };

//   return { handleFinish }}