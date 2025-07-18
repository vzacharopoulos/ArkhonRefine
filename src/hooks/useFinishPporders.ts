import { useUpdate } from "@refinedev/core";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { UPDATE_PPORDERS } from "@/graphql/queries";
import { HandleUpdateAllEventsParams, UpdateFn } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";

interface UseFinishPporderParams {
  currentEvents: EventInput[];
  setEditEnd: (date: Dayjs | null) => void;
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
}

export const useFinishPporder = ({
  currentEvents,
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

    message.success(`Η Master ${order.pporderno} ολοκληρώθηκε`);
  };

  return { handleFinish };
};