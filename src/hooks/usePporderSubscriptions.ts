import { useEffect } from "react";
import { print } from "graphql";
import { message } from "antd";
import { PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION, PPORDER_UPDATED_SUBSCRIPTION, GET_PPORDERLINES_OF_PPORDER } from "@/graphql/queries";
import { wsClient } from "@/providers";
import { PPOrder, PPOrderLine, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { useStartPporder } from "@/hooks/useStartPporder";
import { useDataProvider } from "@refinedev/core";
import { HandleUpdateAllEventsParams } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { Dayjs } from "dayjs";
import { useFinishPporder } from "./useFinishPporders";

interface UsePporderSubscriptionsProps {
  refetchPporders: () => void;
    refetchPporderlines: () => void;
      refetchFinished: () => Promise<any>;  finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  currentEvents:EventInput[];
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
  defaultWorkingHours,
  currentEvents,
  setCurrentEvents,
    setEditStart,
  setEditEnd,
  handleUpdateAllEvents,
  manualSyncRef,

  
}: UsePporderSubscriptionsProps) => {
  const { handleStart } = useStartPporder({
    finishedOrders,
    dailyWorkingHours,
    defaultWorkingHours,
    currentEvents,
    setCurrentEvents,
    handleUpdateAllEvents,
    
  });

 
  const { handleFinish } = useFinishPporder({
    currentEvents,
        setCurrentEvents,
            setEditStart,
    setEditEnd,
    dailyWorkingHours,
    defaultWorkingHours,
    handleUpdateAllEvents,
      refetchFinished,
            refetchPporders,
        manualSyncRef,

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
            const { data } = await dataProvider.custom!<{ pporderlines2: PPOrderLine[] }>({
              url: "",
              method: "get",
              meta: {
                gqlQuery: GET_PPORDERLINES_OF_PPORDER,
                variables: { filter: { ppordernos: order.pporderno } },
              },
            });

            const lines = data?.pporderlines2 ?? [];
            const totalLines = lines.length;
            const finishedCount = lines.filter((l) => l.status === 4).length;
            const orderInfo = lines[0]?.pporders ?? order;

            if (finishedCount===1) {
              await handleStart(orderInfo);
              message.success(`Η Master ${orderInfo.pporderno} ξεκίνησε`);
            }

            if ( totalLines > 0 && finishedCount === totalLines) {
              await handleFinish(orderInfo);
            }
          } catch (error) {
            console.error(error);
          }
        },
        error: (err) => console.error(err),
        complete: () => {},
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