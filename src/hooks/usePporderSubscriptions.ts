import { useEffect, useRef } from "react";
import { print } from "graphql";
import { message } from "antd";
import { PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION, PPORDER_UPDATED_SUBSCRIPTION, GET_PPORDERLINES_OF_PPORDER } from "@/graphql/queries";
import { wsClient } from "@/providers";
import { PPOrder, PPOrderLine, PpOrderLinesResponse, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { useStartPporder } from "@/hooks/useStartPporder";
import { useDataProvider } from "@refinedev/core";
import { HandleUpdateAllEventsParams } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { Dayjs } from "dayjs";
import { useFinishPporder } from "./useFinishPporders";
import { co } from "@fullcalendar/core/internal-common";

interface UsePporderSubscriptionsProps {
  refetchPporders: () => void;
  refetchPporderlines: () => void;
  refetchFinished: () => Promise<any>; finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  setDailyWorkingHours: React.Dispatch<React.SetStateAction<Record<string, WorkingHoursConfig>>>;
  updateDailyWorkingHours: (date: string, values: WorkingHoursConfig) => Promise<WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<any[]>>;
  setEditStart: (date: Dayjs | null) => void;
  setEditEnd: (date: Dayjs | null) => void;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
  manualSyncRef: React.MutableRefObject<boolean>;

}

export const usePporderSubscriptions = ({
  refetchPporders,
  refetchPporderlines,
  refetchFinished,
  finishedOrders,
  dailyWorkingHours,
  setDailyWorkingHours,
  updateDailyWorkingHours,
  defaultWorkingHours,
  currentEvents,
  setCurrentEvents,
  setEditStart,
  setEditEnd,
  handleUpdateAllEvents,
  manualSyncRef,


}: UsePporderSubscriptionsProps) => {

    const lastActiveOrderRef = useRef<PPOrder | null>(null);

  const { handleStart } = useStartPporder({
    finishedOrders,
    dailyWorkingHours,
    setDailyWorkingHours,
    updateDailyWorkingHours,
    defaultWorkingHours,
    currentEvents,
    setCurrentEvents,
    handleUpdateAllEvents,
    lastActiveOrderRef

  });

  

  const { handleFinish } = useFinishPporder({
    currentEvents,
    setCurrentEvents,
    setEditStart,
    setEditEnd,
    dailyWorkingHours,
    setDailyWorkingHours,
    updateDailyWorkingHours,
    defaultWorkingHours,
    handleUpdateAllEvents,
    refetchFinished,
    refetchPporders,
    manualSyncRef,
    lastActiveOrderRef

  });

  const dataProvider = useDataProvider()();

  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION) },
      {
        next: async (value: any) => {
          const line = value?.data?.pporderlineStatusChanged;
          if (line?.status !== 4) return;
          const order = line?.pporders;
          if (!order?.pporderno) return;

          try {
            const { data } = await dataProvider.custom!<PpOrderLinesResponse>({
              url: "",
              method: "get",
              meta: {
                gqlQuery: GET_PPORDERLINES_OF_PPORDER,
                variables: { filter: { ppordernos: { in: [order.pporderno] } } },
              },
            });

            const lines: PPOrderLine[] = data?.pporderlines2?.nodes ?? [];
            const totalLines = lines.length;
            const finishedCount = lines.filter((l) => l.status === 4).length;

            // prefer the richer object if available
            console.log("lines[0]?.pporders", lines[0]?.pporders);
            console.log("order", order);
            const currentOrder: PPOrder = (lines[0]?.pporders ?? order) as PPOrder;
            const prevOrder = null;

            console.log("prevOrder", prevOrder);
            // 1) If the current order has just completed all lines, finish it and clear ref
            if (totalLines > 0 && finishedCount === totalLines) {
              await handleFinish(currentOrder);
              if (prevOrder?.pporderno === currentOrder.pporderno) {
                lastActiveOrderRef.current = null;
              }
              return; // done for this event
            }

            // 2) If we have no previous active order and this is the first finished line, start current
            if (!prevOrder && finishedCount === 1) {
              console.log("engaged in single master");
                            lastActiveOrderRef.current = currentOrder;

              await handleStart(currentOrder);
              message.success(`Η Master ${currentOrder.pporderno} ξεκίνησε`);
              return;
            }

            // 3) If we switched to a different order (and current isn’t finished), finish previous then start current
            if (prevOrder && prevOrder.pporderno !== currentOrder.pporderno && finishedCount < totalLines) {
              console.log("engaged in double master");
              console.log("prevOrder", prevOrder);
              console.log("currentOrder", currentOrder);
                            lastActiveOrderRef.current = currentOrder;

              await handleFinish(prevOrder);
              await handleStart(currentOrder);

              message.success(`Η Master ${currentOrder.pporderno} ξεκίνησε`);
              return;
            }

            // (optional) If same order keeps progressing but not finished yet, do nothing.

          } catch (error) {
            console.error(error);
          }
        },
        error: (err) => console.error(err),
        complete: () => { },
      }
    );

    return () => {
      dispose();
    };
  }, [handleStart, refetchPporderlines, handleFinish]);

  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDER_UPDATED_SUBSCRIPTION) },
      {
        next: () => {
          refetchPporders();
          refetchFinished();
        },
        error: (err) => console.error(err),
        complete: () => {
          console.log("refetched");
        },
      }
    );

    return () => {
      dispose();
    };
  }, [refetchPporders, refetchFinished]);
};