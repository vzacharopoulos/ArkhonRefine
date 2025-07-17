// hooks/useStartPporder.ts

import { useCustom, useDataProvider, useUpdate } from "@refinedev/core";
import { print } from "graphql";
import dayjs from "dayjs";
import { PPOrder, PPOrderLine, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { GET_PPORDERLINES_OF_PPORDER, UPDATE_PPORDERS } from "@/graphql/queries";
import {
  calculateWorkingMinutesBetween,
  splitEventIntoWorkingHours,
  addWorkingMinutesDynamic
} from "@/pages/ProductionPlanning/dateschedule-utils";
import { statusColorMap, STATUS_MAP } from "@/utilities/map-status-id-to-name";
import { HandleUpdateAllEventsParams, UpdateFn  } from "@/pages/ProductionPlanning/handlers/handleupdateall";

interface UseStartPporderParams {
  finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
    setCurrentEvents: React.Dispatch<React.SetStateAction<any[]>>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;

}

export const useStartPporder = ({
  finishedOrders,
  dailyWorkingHours,
  defaultWorkingHours,
  setCurrentEvents,
  handleUpdateAllEvents,
}: UseStartPporderParams) => {
  const dataProvider = useDataProvider()();

  const { mutate: updatePporder } = useUpdate<PPOrder>();

   const updatePporderFn: UpdateFn = async (
    id: number,
    start: Date,
    end: Date,
    extraValues: Partial<PPOrder> = {}
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
  
  const handleStart = async (order: PPOrder) => {
    if (!order.pporderno) return;

    try {
      const { data } = await dataProvider.custom!<{ pporderlines2: PPOrderLine[] }>({
        url: "",
        method: "get",
        meta: {
          gqlQuery: GET_PPORDERLINES_OF_PPORDER,
          variables: { filter: { ppordernos: order.pporderno } },
        },
      });

      const pporderlines2 = data?.pporderlines2 ?? [];
      console.log("pporderlines2", pporderlines2);
      console.log("data", data);

      const totalMinutes = pporderlines2.reduce(
        (sum, line) => sum + (line.prodOrdersView?.time ?? 0),
        0
      );

      const now = dayjs();

      const lastFinished = [...finishedOrders]
        .filter(f => f.finishDateDatetime)
        .sort((a, b) =>
          dayjs(a.finishDateDatetime as Date).diff(dayjs(b.finishDateDatetime as Date))
        )
        .pop();

      const offStart = lastFinished?.finishDateDatetime
        ? dayjs(lastFinished.finishDateDatetime)
        : null;
      
      const offEnd = now;
      const offDuration = offStart
        ? calculateWorkingMinutesBetween(
            offStart,
            offEnd,
            dailyWorkingHours,
            defaultWorkingHours
          )
        : 0;
      const prevpanelcode= lastFinished?.code
      console.log("offDuration", offDuration);
      console.log("offStart", offStart);
            console.log("prevpanelcode", prevpanelcode);


      const offSegments = offDuration && offStart
        ? splitEventIntoWorkingHours(
            offStart,
            offDuration,
            dailyWorkingHours,
            defaultWorkingHours,
            {
              id: `${order.id}-offtime`,
              title: "προετοιμασία μηχανής",
              color: "gray",
              extendedProps: {
                isOfftime: true,
                prevpanelcode:prevpanelcode,
                prevId:lastFinished?.id,
                currId: order.id.toString(),
                offtimeduration: offDuration,
                offtimeStartDate: offStart.toISOString(),
                offtimeEndDate: offEnd.toISOString(),
              },
            }
          )
        : [];
        console.log()

      let jobStart;

      jobStart = now;

      const jobSegments = splitEventIntoWorkingHours(
        jobStart,
        totalMinutes,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: String(order.id),
          title: `${order.pporderno} - ${order.panelcode}`,
          color: statusColorMap[order.status ?? 2] || "gray",
          extendedProps: {
            panelcode: order.panelcode,
            status: 2,
            tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}\nκατάσταση: ${
              STATUS_MAP[2] || "Άγνωστη"
            }`,
          },
        }
      );

      const jobEnd = addWorkingMinutesDynamic(
        jobStart,
        totalMinutes,
        dailyWorkingHours,
        defaultWorkingHours
      );

      await updatePporder({
        resource: "pporders",
        id: order.id,
        values: {
          startDateDatetime: jobStart.toISOString(),
          estStartDate: jobStart.toISOString(),
          finishDateDatetime: jobEnd.toISOString(),
          estFinishDate: jobEnd.toISOString(),
          offtimestartdate: offStart ? offStart.toISOString() : null,
          offtimeenddate: offEnd.toISOString(),
          offtimeduration: offDuration,
          status: 2,
        },
        meta: {
          gqlMutation: UPDATE_PPORDERS,
        },
      });

      // Update the current events state
      setCurrentEvents(prev => {
        const newEvents = [...prev, ...offSegments, ...jobSegments];
        
        // // Call handleUpdateAllEvents after state is updated
        // setTimeout(async () => {
        //   await handleUpdateAllEvents({
        //     events: newEvents,
        //     dailyWorkingHours,
        //     defaultWorkingHours,
        //     updatePporder:updatePporderFn,
        //   });
        // }, 0);
        

        return newEvents;
      });
    } catch (error) {
      console.error("Failed to start order:", error);
    }
  };

  return { handleStart };
};