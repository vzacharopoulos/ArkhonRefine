// hooks/useStartPporder.ts

import { useCustom, useDataProvider, useUpdate } from "@refinedev/core";
import { print } from "graphql";
import dayjs from "dayjs";
import {
  PPOrder,
  PPOrderLine,
  WorkingHoursConfig,
} from "@/pages/ProductionPlanning/productioncalendartypes";
import {
  GET_PPORDERLINES_OF_PPORDER,
  UPDATE_PPORDERS,
} from "@/graphql/queries";
import {
  calculateWorkingMinutesBetween,
  splitEventIntoWorkingHours,
  addWorkingMinutesDynamic,
} from "@/pages/ProductionPlanning/dateschedule-utils";
import { statusColorMap, STATUS_MAP } from "@/utilities/map-status-id-to-name";
import {
  HandleUpdateAllEventsParams,
  UpdateFn,
} from "@/pages/ProductionPlanning/handlers/handleupdateall";
import { EventInput } from "fullcalendar";

interface UseStartPporderParams {
  finishedOrders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<any[]>>;
  handleUpdateAllEvents: (params: HandleUpdateAllEventsParams) => Promise<void>;
}

export const useStartPporder = ({
  finishedOrders,
  dailyWorkingHours,
  defaultWorkingHours,
  currentEvents,
  setCurrentEvents,
  handleUpdateAllEvents,
}: UseStartPporderParams) => {
  const dataProvider = useDataProvider()();

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

  const handleStart = async (order: PPOrder) => {
    if (!order.pporderno) return;

    try {
      const { data } = await dataProvider.custom!<{
        pporderlines2: PPOrderLine[];
      }>({
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
        0,
      );

      const now = dayjs('2025-07-22T07:10:00');

      const lastFinished = [...finishedOrders]
        .filter((f) => f.finishDateDatetime)
        .sort((a, b) =>
          dayjs(a.finishDateDatetime as Date).diff(
            dayjs(b.finishDateDatetime as Date),
          ),
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
            defaultWorkingHours,
          )
        : 0;
      const prevpanelcode = (lastFinished as any)?.code;
      console.log("offDuration", offDuration);
      console.log("offStart", offStart);
      console.log("prevpanelcode", prevpanelcode);

      const offSegments =
        offDuration && offStart
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
                  prevpanelcode: prevpanelcode,
                  prevId: lastFinished?.id,
                  currId: order.id.toString(),
                  offtimeduration: offDuration,
                  offtimeStartDate: offStart.toISOString(),
                  offtimeEndDate: offEnd.toISOString(),
                },
              },
            )
          : [];

      let jobStart = now;

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
        },
      );

      const jobEnd = addWorkingMinutesDynamic(
        jobStart,
        totalMinutes,
        dailyWorkingHours,
        defaultWorkingHours,
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

      console.log("currentEvents", currentEvents);
      
      setCurrentEvents((prev) => {
        // The updated/new events (offtime + job segments)
        const updatedEvents = [...offSegments, ...jobSegments];
        
        // Get IDs of the updated events
        const updatedIds = new Set(updatedEvents.map((ev) => ev.id?.toString()));
        const updatedBaseIds = new Set(
          Array.from(updatedIds).map((id) => id?.split("-part-")[0])
        );

        // Filter out the old version of the updated event and scheduled events
        const filteredPrevEvents = prev.filter((ev) => {
          const evId = ev.id?.toString();
          const evBaseId = evId?.split("-part-")[0];
          return (
            !updatedIds.has(evId) &&
            !updatedBaseIds.has(evBaseId) &&
            ev?.extendedProps?.status !== 14 &&
            !ev.extendedProps?.isOfftime
          );
        });

        // Separate events that need to be rescheduled (status 14 and other scheduled events)
        const eventsToReschedule = prev.filter((ev) => {
          const evId = ev.id?.toString();
          const evBaseId = evId?.split("-part-")[0];
          return (
            !updatedIds.has(evId) &&
            !updatedBaseIds.has(evBaseId) &&
            (ev?.extendedProps?.status === 14 || ev.extendedProps?.isOfftime)
          );
        });

        // Get the end time of the updated event
        const updatedEventEndTime = dayjs(
          updatedEvents[updatedEvents.length - 1]?.end as Date
        );

        // Group events to reschedule by their base ID
        const groupedEventsToReschedule: Record<string, EventInput[]> = {};
        eventsToReschedule.forEach((ev) => {
          if (!ev.id) return;
          
          const evId = ev.id.toString();
          const baseId = evId.includes("-part-") ? evId.split("-part-")[0] : evId;
          
          if (!groupedEventsToReschedule[baseId]) {
            groupedEventsToReschedule[baseId] = [];
          }
          groupedEventsToReschedule[baseId].push(ev);
        });

        // Reschedule events to start after the updated event ends
        const rescheduledEvents: EventInput[] = [];
        let currentStartTime = updatedEventEndTime;

        // Sort grouped events by their original start time
        const sortedGroups = Object.entries(groupedEventsToReschedule).sort(
          ([, eventsA], [, eventsB]) => {
            const startA = dayjs(eventsA[0]?.start as Date);
            const startB = dayjs(eventsB[0]?.start as Date);
            return startA.diff(startB);
          }
        );

        for (const [baseId, events] of sortedGroups) {
          // Calculate total duration for this group
          const groupDuration = events.reduce((total, ev) => {
            const start = dayjs(ev.start as Date);
            const end = dayjs(ev.end as Date);
            return total + end.diff(start, 'minutes');
          }, 0);

          // Check if this is an offtime event
          const isOfftimeEvent = events.some(ev => ev.extendedProps?.isOfftime);
          
          if (isOfftimeEvent) {
            // For offtime events, use the original segments structure
            const rescheduledOfftimeSegments = splitEventIntoWorkingHours(
              currentStartTime,
              groupDuration,
              dailyWorkingHours,
              defaultWorkingHours,
              {
                id: `${baseId}-offtime`,
                title: events[0]?.title || "προετοιμασία μηχανής",
                color: "gray",
                extendedProps: {
                  ...events[0]?.extendedProps,
                  isOfftime: true,
                },
              }
            );
            rescheduledEvents.push(...rescheduledOfftimeSegments);
            currentStartTime = dayjs(
              rescheduledOfftimeSegments[rescheduledOfftimeSegments.length - 1]?.end as Date
            );
          } else {
            // For regular job events
            const rescheduledJobSegments = splitEventIntoWorkingHours(
              currentStartTime,
              groupDuration,
              dailyWorkingHours,
              defaultWorkingHours,
              {
                id: baseId,
                title: events[0]?.title || `Job ${baseId}`,
                color: events[0]?.color || "gray",
                extendedProps: {
                  ...events[0]?.extendedProps,
                },
              }
            );
            rescheduledEvents.push(...rescheduledJobSegments);
            currentStartTime = dayjs(
              rescheduledJobSegments[rescheduledJobSegments.length - 1]?.end as Date
            );
          }
        }

        // Combine all events: kept events + updated events + rescheduled events
        const newEvents = [
          ...filteredPrevEvents,  // Events that don't need rescheduling
          ...updatedEvents,       // The newly updated event (comes first in sequence)
          ...rescheduledEvents    // Events rescheduled to start after the updated event
        ];

 handleUpdateAllEvents({
        events: newEvents,
        dailyWorkingHours,
        defaultWorkingHours,
        updatePporder: updatePporderFn,
      });


        console.log("🟡 newEvents being passed to update all:", newEvents);
        return newEvents;
      });
    } catch (error) {
      console.error("Failed to start order:", error);
    }
  };

  return { handleStart };
};