import { useEffect } from "react";
import { print } from "graphql";
import { message } from "antd";
import { PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION, PPORDER_UPDATED_SUBSCRIPTION, GET_PPORDERLINES_OF_PPORDER, PPORDERLINE_CREATED_SUBSCRIPTION, PPORDERLINE_DELETED_SUBSCRIPTION } from "@/graphql/queries";
import { wsClient } from "@/providers";
import { PPOrder, PPOrderLine, PpOrderLinesResponse, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { useStartPporder } from "@/hooks/useStartPporder";
import { useDataProvider, useUpdate } from "@refinedev/core";
import { HandleUpdateAllEventsParams } from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";
import { Dayjs } from "dayjs";
import { useFinishPporder } from "./useFinishPporders";
import { UPDATE_PAUSE, UPDATE_PPORDERS } from "@/graphql/queries";
import dayjs from "dayjs";
import { calculateWorkingMinutesBetween, splitEventIntoWorkingHours } from "@/pages/ProductionPlanning/dateschedule-utils";
import { handleSaveEdit } from "@/pages/ProductionPlanning/utilities/usehandleedit";

const porders: PPOrder = {
  createDate: new Date("2025-09-08T13:01:30"),
  estFinishDate: new Date("2025-09-10T13:01:30"),
  estStartDate: new Date("2025-09-09T13:01:30"),
  finishDateDatetime: new Date("2025-09-10T13:01:30"),
  groupIn: [],
  id: 1,
  offtimeduration: 41,
  offtimeenddate: new Date("2025-09-10T15:01:30"),
  offtimestartdate: new Date("2025-09-10T14:01:30"),
  panelcode: "PANEL-1000",
  pporderno: "PP-0001",
  previd: undefined,
  prevpanelcode: undefined,
  startDateDatetime: new Date("2025-09-09T13:01:30"),
  status: 2,
  totalOrderTime: 28.08,   // added per updated type
  totalTtm: 488.83,
};


interface UsePporderSubscriptionsProps {
  refetchPporders: () => void;
    refetchPporderlines: () => void;
      refetchFinished: () => Promise<any>;  finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  setDailyWorkingHours: React.Dispatch<React.SetStateAction<Record<string, WorkingHoursConfig>>>;
  updateDailyWorkingHours: (date: string, values: WorkingHoursConfig) => Promise<WorkingHoursConfig>;
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
  const { handleStart } = useStartPporder({
    finishedOrders,
    dailyWorkingHours,
    setDailyWorkingHours,
    updateDailyWorkingHours,
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
    setDailyWorkingHours,
    updateDailyWorkingHours,
    defaultWorkingHours,
    handleUpdateAllEvents,
      refetchFinished,
            refetchPporders,
        manualSyncRef,

  });

  const dataProvider = useDataProvider()();
  const { mutate: updatePporderMut } = useUpdate<PPOrder>();
  const { mutate: updatePauseMut } = useUpdate<any>();

  const updatePporder = async (
    id: number,
    start: Date,
    end: Date,
    extraValues: Partial<PPOrder> = {},
  ) => {
    await updatePporderMut({
      resource: "pporders",
      id,
      values: {
        estStartDate: dayjs(start).format('YYYY-MM-DDTHH:mm:ssZ'),
        estFinishDate: dayjs(end).format('YYYY-MM-DDTHH:mm:ssZ'),
        ...extraValues,
      },
      meta: { gqlMutation: UPDATE_PPORDERS },
    });
  };

  const updatePause = async (pause: any) => {
    await updatePauseMut({
      resource: "panelmachinepauses",
      id: pause.id ?? 0,
      values: pause,
      meta: { gqlMutation: UPDATE_PAUSE },
    });
  };

  // Adjust a PPOrder's scheduled duration by deltaMinutes (positive or negative)
  const adjustOrderDuration = async (orderId: number, deltaMinutes: number) => {
    if (!deltaMinutes || !currentEvents?.length) return;

    const baseId = String(orderId);
    const jobEvents = currentEvents
      .filter((ev) => ev.id && ev.id.toString().split("-part-")[0] === baseId && !ev.extendedProps?.isOfftime)
      .sort((a, b) => dayjs(a.start as Date).diff(dayjs(b.start as Date)));

    // Nothing scheduled for this order in the calendar; nothing to adjust
    if (!jobEvents.length) return;

    const selectedEvent = jobEvents[0];
    if (!selectedEvent.start || !jobEvents[jobEvents.length - 1].end) return;

    const originalStart = dayjs(selectedEvent.start as Date);
    const originalLastEnd = dayjs(jobEvents[jobEvents.length - 1].end as Date);

    // Compute current working duration of the order across parts
    const currentWorkingMinutes = calculateWorkingMinutesBetween(
      originalStart,
      originalLastEnd,
      dailyWorkingHours,
      defaultWorkingHours,
    );

    const newTotalMinutes = Math.max(0, currentWorkingMinutes + deltaMinutes);

    // Compute the new end by splitting from originalStart respecting working hours
    const segments = splitEventIntoWorkingHours(
      originalStart,
      newTotalMinutes,
      dailyWorkingHours,
      defaultWorkingHours,
      // Base the shape on the selected event; the splitter will adjust dates
      {
        ...selectedEvent,
        start: originalStart.toDate(),
        end: undefined,
      },
    );

    const newEnd = segments.length ? dayjs(segments[segments.length - 1].end as Date) : originalStart;

    // Keep only the selected job segment for this order; other job parts will be recalculated
    const filteredCurrent = currentEvents.filter((ev) => {
      const isSameJob = ev.id && ev.id.toString().split("-part-")[0] === baseId && !ev.extendedProps?.isOfftime;
      return !isSameJob || ev.id === selectedEvent.id;
    });

    // Reuse the edit pipeline: move only the end of the first segment, then chain following events
    // setEditEnd is part of the API here, so we update it for consistency with the edit flow
    setEditEnd(newEnd);

    const updated = handleSaveEdit(
      selectedEvent,
      originalStart,
      newEnd,
      filteredCurrent,
      dailyWorkingHours,
      defaultWorkingHours,
    );

    setCurrentEvents(updated);
    await handleUpdateAllEvents({
      events: updated,
      dailyWorkingHours,
      defaultWorkingHours,
      updatePporder,
      updatePause,
    });
  };

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
            const { data } = await dataProvider.custom!<PpOrderLinesResponse >({
              url: "",
              method: "get",
              meta: {
                gqlQuery: GET_PPORDERLINES_OF_PPORDER,
                variables: { filter: { ppordernos: { in: [order.pporderno] } } },
              },
            });

            const lines : PPOrderLine[] = data?.pporderlines2?.nodes ?? [];
            const totalLines = lines.length;
            const finishedCount = lines.filter((l) => l.status === 4).length;
            const orderInfo = lines[0]?.pporders ?? order;

            if (finishedCount===1) {
              //await handleStart(porders);
              message.success(`Η Master ${orderInfo.pporderno} ξεκίνησε`);
            }

            if ( totalLines > 0 && finishedCount === totalLines) {
             // await handleFinish(orderInfo);
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

  // Subscription: pporderline created -> add its time to the parent order's duration
  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDERLINE_CREATED_SUBSCRIPTION) },
      {
        next: async (value: any) => {
          try {
            // Expect either a single created line or an array of lines
            const payload = value?.data?.pporderlineCreated;
            if (!payload) return;

            const asArray = Array.isArray(payload) ? payload : [payload];
            const byOrder: Record<number, number> = {};

            asArray.forEach((line: any) => {
              const minutes = Number(line?.prodOrdersView?.time ?? 0) || 0;
              const orderId = Number(line?.pporders?.id ?? 0);
              if (!orderId || !minutes) return;
              byOrder[orderId] = (byOrder[orderId] ?? 0) + minutes;
            });

            for (const [orderIdStr, addMinutes] of Object.entries(byOrder)) {
              //await adjustOrderDuration(Number(orderIdStr), addMinutes);
            }
          } catch (err) {
            console.error("Failed handling pporderlineCreated:", err);
          }
        },
        error: (err) => console.error(err),
        complete: () => {},
      },
    );

    return () => dispose();
  }, [currentEvents, dailyWorkingHours, defaultWorkingHours]);

  // Subscription: pporderline deleted -> subtract its time from the parent order's duration
  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDERLINE_DELETED_SUBSCRIPTION) },
      {
        next: async (value: any) => {
          try {
            const payload = value?.data?.pporderlineDeleted;
            if (!payload) return;

            const asArray = Array.isArray(payload) ? payload : [payload];
            const byOrder: Record<number, number> = {};

            asArray.forEach((line: any) => {
              const minutes = Number(line?.prodOrdersView?.time ?? 0) || 0;
              const orderId = Number(line?.pporders?.id ?? 0);
              if (!orderId || !minutes) return;
              byOrder[orderId] = (byOrder[orderId] ?? 0) + minutes;
            });

            for (const [orderIdStr, subMinutes] of Object.entries(byOrder)) {
              //await adjustOrderDuration(Number(orderIdStr), -Number(subMinutes));
            }
          } catch (err) {
            console.error("Failed handling pporderlineDeleted:", err);
          }
        },
        error: (err) => console.error(err),
        complete: () => {},
      },
    );

    return () => dispose();
  }, [currentEvents, dailyWorkingHours, defaultWorkingHours]);
};
