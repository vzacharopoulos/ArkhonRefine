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
interface UseStartPporderParams {
  finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  setCurrentEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

export const useStartPporder = ({
  finishedOrders,
  dailyWorkingHours,
  defaultWorkingHours,
  setCurrentEvents,
}: UseStartPporderParams) => {
  const dataProvider = useDataProvider()();
  console.log("DP has custom:", typeof dataProvider.custom);

  const { mutate: updatePporder } = useUpdate<PPOrder>();
  const handleStart = async (order: PPOrder) => {
    if (!order.pporderno) return;
                        console.log("data");
                                                 console.log("data",order.pporderno);


    try {
      const { data } = await dataProvider.custom<{ pporderlines2: PPOrderLine[] }>({
        url: "",
        method: "get",
        meta: {
          gqlQuery: GET_PPORDERLINES_OF_PPORDER,
          variables: { filter: { ppordernos: order.pporderno } },
        },
      });

      const pporderlines2 = data?.pporderlines2 ?? [];
                         console.log("capporderlines2lled",pporderlines2);
                         console.log("data",data);

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
    console.log("offDuration",offDuration)
        console.log("offStart",offStart)

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
                currId: order.id.toString(),
                offtimeduration: offDuration,
                offtimeStartDate: offStart.toISOString(),
                offtimeEndDate: offEnd.toISOString(),
              },
            }
          )
        : [];

      let jobStart;


  console.warn("offSegments is empty, using current time for jobStart");
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

      setCurrentEvents(prev => [...prev, ...offSegments, ...jobSegments]);
    } catch (error) {
      console.error("Failed to start order:", error);
    }
  };

  return { handleStart };
};