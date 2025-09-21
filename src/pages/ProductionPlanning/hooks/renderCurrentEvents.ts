import { useEffect, useRef } from "react";
import { EventInput } from "@fullcalendar/core";
import dayjs, { Dayjs } from "dayjs";
import { PPOrder, WorkingHoursConfig } from "../productioncalendartypes";
import {
  calculateWorkingMinutesBetween,
  splitEventIntoWorkingHours,
  isWithinWorkingHours,
  findNextWorkingTime,
  mergeSameDayEventParts
} from "../dateschedule-utils";
import { statusColorMap, STATUS_MAP } from "@/utilities/map-status-id-to-color";
import { createOfftimeTitle } from "../helpers/offtimetitle";
import { createOfftimeTooltip } from "../helpers/offtimetooltip";
import { deduplicateEventIds} from "../event-utils";

interface UseRenderCurrentEventsParams {
  unscheduledorders: PPOrder[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  manualSyncRef: React.MutableRefObject<boolean>;
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  totalTimeByOrderId: Record<number, { hours: number; minutes: number; formatted: string; totalMinutes: number; totalTtm: number }>;
}

export const useRenderCurrentEvents = ({
  unscheduledorders,
  dailyWorkingHours,
  defaultWorkingHours,
  manualSyncRef,
  setCurrentEvents,
  totalTimeByOrderId,
}: UseRenderCurrentEventsParams) => {
  useEffect(() => { // renders currentEvents from unscheduled orders whenever orders change
    if (manualSyncRef.current) return;   // skip rebuild during manual updates
    const preScheduled = unscheduledorders
      .filter(o => o.estStartDate && o.estFinishDate && !(o.status === 1))
      .sort((a, b) =>
        dayjs(a.estStartDate as Date).diff(dayjs(b.estStartDate as Date))
      );


    if (preScheduled.length === 0) {
      setCurrentEvents([]);
      return;
    }

    const processed: EventInput[] = [];




    let prevEnd: Dayjs | null = null;
    preScheduled.forEach(order => {
      const start = dayjs(order.estStartDate as Date);
      const end = dayjs(order.estFinishDate as Date);
      const duration = calculateWorkingMinutesBetween(start, end, dailyWorkingHours, defaultWorkingHours);
      let tentativeStart = prevEnd
        ? isWithinWorkingHours(prevEnd, dailyWorkingHours, defaultWorkingHours)
          ? prevEnd
          : findNextWorkingTime(
            prevEnd,
            dailyWorkingHours,
            defaultWorkingHours
          )
        : isWithinWorkingHours(start, dailyWorkingHours, defaultWorkingHours)
          ? start
          : findNextWorkingTime(start, dailyWorkingHours, defaultWorkingHours);
      if (order.offtimeduration && order.offtimestartdate && order.offtimeenddate) {
        const offtimeduration = order.offtimeduration;
        let offStart = dayjs(order.offtimestartdate as Date);
        // If the previous event ended later than the planned offtime start,
        // begin the offtime after the previous event
        if (prevEnd && !prevEnd.isSame(offStart)) {
          offStart = prevEnd
        }

        const offtimeSegments = splitEventIntoWorkingHours(
          offStart,
          offtimeduration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: `${order.id}-offtime`,
            title: createOfftimeTitle(
              order.offtimeduration,
              order.panelcode,
              order.prevpanelcode,
            ),
            color: "gray",
            extendedProps: {
              isOfftime: true,
              prevId: order.previd?.toString(),
              currId: order.id.toString(),
              prevpanelcode: order.prevpanelcode,
              panelcode: order.panelcode,
              offtimeduration: order.offtimeduration,
              tooltip: createOfftimeTooltip(
                order.prevpanelcode,
                order.offtimeduration,
                order.offtimestartdate,
                order.offtimeenddate
              ),
            },
          }
        );

        // Manually apply split segment start/end to their extendedProps
        offtimeSegments.forEach(seg => {
          seg.extendedProps = {
            ...seg.extendedProps,
            offtimeStartDate: dayjs(seg.start as Date).format('YYYY-MM-DDTHH:mm:ssZ'),
            offtimeEndDate: dayjs(seg.end as Date).format('YYYY-MM-DDTHH:mm:ssZ'),
          };
        });

        processed.push(...offtimeSegments);
        const lastSegment = offtimeSegments[offtimeSegments.length - 1];
        prevEnd = dayjs(lastSegment.end as Date);
        tentativeStart = isWithinWorkingHours(prevEnd, dailyWorkingHours, defaultWorkingHours)
          ? prevEnd
          : findNextWorkingTime(prevEnd, dailyWorkingHours, defaultWorkingHours);
      }
      duration ? duration : totalTimeByOrderId
      let segments: EventInput[] = [];

      // CORRECTED: Handle multiple pauses
      const pauses = order.pauses || [];

      if (pauses.length > 0) {
        // Sort pauses by start date to process them chronologically
        const sortedPauses = pauses
          .filter(pause => pause.pauseduration && pause.pausestartdate && pause.pauseenddate)
          .sort((a, b) => dayjs(a.pausestartdate as Date).diff(dayjs(b.pausestartdate as Date)));

        if (sortedPauses.length > 0) {
          let currentStart = start;

          sortedPauses.forEach((pause, index) => {
            const pauseStart = dayjs(pause.pausestartdate as Date);
            const pauseEnd = dayjs(pause.pauseenddate as Date);

            // Create work segment before this pause
            if (currentStart.isBefore(pauseStart)) {
              const beforeDuration = calculateWorkingMinutesBetween(
                currentStart,
                pauseStart,
                dailyWorkingHours,
                defaultWorkingHours,
              );

              const beforeSegments = splitEventIntoWorkingHours(
                currentStart,
                beforeDuration,
                dailyWorkingHours,
                defaultWorkingHours,
                {
                  id: `${order.id}-work-${index}`,
                  title: `${order.pporderno} - ${order.panelcode}`,
                  color: statusColorMap[order.status ?? 0] || "gray",
                  extendedProps: {
                    ...order,
                    panelcode: order.panelcode,
                    status: order.status,
                    tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""} (Part ${index + 1})
                    κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
                    εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
                    εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
                    θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
                  },
                },
              );
              segments.push(...beforeSegments);
            }

            // Create pause segment
            const pauseSegments = splitEventIntoWorkingHours(
              pauseStart,
              pause.pauseduration || 0,
              dailyWorkingHours,
              defaultWorkingHours,
              {
                id: `${order.id}-pause-${index}`,
                start: pauseStart.toDate(),
                end: pauseEnd.toDate(),
                title: `παυση ${index + 1}, ${pause.pausecomment}`,
                color: "orange",
                extendedProps: {
                  isPause: true,
                  pauseid: pause.id,
                  currId: order.id.toString(),
                  pauseduration: pause.pauseduration,
                  pausestartdate: dayjs(pauseStart).format('YYYY-MM-DDTHH:mm:ssZ'),
                  pauseenddate: dayjs(pauseEnd).format('YYYY-MM-DDTHH:mm:ssZ'),
                  tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""} (Pause ${index + 1})
                  σχολιο: ${pause.pausecomment || "—"}
                  ωρα έναρξης: ${dayjs(pause.pausestartdate).format("YYYY-MM-DD HH:mm") || "—"}
                  ωρα λήξης: ${dayjs(pause.pauseenddate).format("YYYY-MM-DD HH:mm") || "—"}
                  χρόνος: ${pause.pauseduration || "0"} Λεπτά`,
                },
              },
            );
            segments.push(...pauseSegments);

            // Update current start for next iteration
            currentStart = pauseEnd;
          });

          // Create final work segment after all pauses
          if (currentStart.isBefore(end)) {
            const afterDuration = calculateWorkingMinutesBetween(
              currentStart,
              end,
              dailyWorkingHours,
              defaultWorkingHours,
            );

            const afterSegments = splitEventIntoWorkingHours(
              currentStart,
              afterDuration,
              dailyWorkingHours,
              defaultWorkingHours,
              {
                id: `${order.id}-work-final`,//this is important due to deduplicateeventids
                title: `${order.pporderno} - ${order.panelcode}`,
                color: statusColorMap[order.status ?? 0] || "gray",
                extendedProps: {
                  ...order,
                  panelcode: order.panelcode,
                  status: order.status,
                  tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""} (Final Part)
                  κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
                  εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
                  εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
                  θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
                },
              },
            );
            segments.push(...afterSegments);
          }
        } else {
          // No valid pauses, create single work segment
          segments = splitEventIntoWorkingHours(
            start,
            duration,
            dailyWorkingHours,
            defaultWorkingHours,
            {
              id: String(order.id),
              title: `${order.pporderno} - ${order.panelcode}`,
              color: statusColorMap[order.status ?? 0] || "gray",
              extendedProps: {
                ...order,
                panelcode: order.panelcode,
                status: order.status,
                tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}
                κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
                εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
                εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
                θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
              },
            }
          );
        }
      } else {
        // No pauses, create single work segment
        segments = splitEventIntoWorkingHours(
          start,
          duration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: String(order.id),
            title: `${order.pporderno} - ${order.panelcode}`,
            color: statusColorMap[order.status ?? 0] || "gray",
            extendedProps: {
              ...order,
              panelcode: order.panelcode,
              status: order.status,
              tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}
              κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
              εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
              εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
              θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
            },
          }
        );
      }

      const deduplicatedSegments = deduplicateEventIds(segments);
      mergeSameDayEventParts(deduplicatedSegments);
      processed.push(...deduplicatedSegments);
      prevEnd = dayjs(deduplicatedSegments[deduplicatedSegments.length - 1].end as Date) ?? dayjs();
    });

    setCurrentEvents(processed);
    manualSyncRef.current = false;
  }, [unscheduledorders, dailyWorkingHours, defaultWorkingHours, manualSyncRef, setCurrentEvents, totalTimeByOrderId]);
};