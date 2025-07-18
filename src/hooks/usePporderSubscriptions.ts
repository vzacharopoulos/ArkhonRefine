import { useEffect } from "react";
import { print } from "graphql";
import { message } from "antd";
import { PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION, PPORDER_UPDATED_SUBSCRIPTION } from "@/graphql/queries";
import { wsClient } from "@/providers";
import { PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { useStartPporder } from "@/hooks/useStartPporder";
import { useDataProvider } from "@refinedev/core";
import { HandleUpdateAllEventsParams } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";

interface UsePporderSubscriptionsProps {
  refetchPporders: () => void;
  finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  currentEvents:EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<any[]>>;
   handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
}

export const usePporderSubscriptions = ({
  refetchPporders,
  finishedOrders,
  dailyWorkingHours,
  defaultWorkingHours,
  currentEvents,
  setCurrentEvents,
  handleUpdateAllEvents,
  
}: UsePporderSubscriptionsProps) => {
  const { handleStart } = useStartPporder({
    finishedOrders,
    dailyWorkingHours,
    defaultWorkingHours,
    currentEvents,
    setCurrentEvents,
    handleUpdateAllEvents,
  });

  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION) },
      {
        next: async (value: any) => {
          const line = value?.data?.pporderlineStatusChanged;
          if (line?.status !== 4) return;
                  console.log("value",value);
                   console.log("line");

          const order = line?.pporders;
          if (order?.id && order?.pporderno) {
            await handleStart(order);
            message.success(`Η Master ${order?.pporderno} ξεκίνησε`);
          }
        },
        error: (err) => console.error(err),
        complete: () => {},
      }
    );

    return () => {
      dispose();
    };
  }, [handleStart]);

  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDER_UPDATED_SUBSCRIPTION) },
      {
        next: () => {
          refetchPporders();
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
  }, [refetchPporders]);
};