// utils/handleUpdateAllEvents.ts

import { EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";
import {
  PPOrder,
  WorkingHoursConfig,
} from "@/pages/ProductionPlanning/productioncalendartypes";
import { splitEventIntoWorkingHours } from "@/pages/ProductionPlanning/dateschedule-utils";
import { STATUS_MAP, statusColorMap } from "@/utilities/map-status-id-to-color";
import { createOfftimeTitle } from "../helpers/offtimetitle";

export type UpdateFn = (
  id: number,
  start: Date,
  end: Date,
  extraValues?: Partial<PPOrder>,
) => Promise<void>;

export interface HandleUpdateAllEventsParams {
  events: EventInput[];
  dailyWorkingHours: Record<string, WorkingHoursConfig>;
  defaultWorkingHours: Record<number, WorkingHoursConfig>;
  updatePporder: UpdateFn;
}

export const handleUpdateAllEvents = async ({
  events,
  dailyWorkingHours,
  defaultWorkingHours,
  updatePporder,
}: HandleUpdateAllEventsParams) => {
  const grouped: Record<string, EventInput[]> = {};
  const offInfo: Record<string, Partial<PPOrder>> = {};
  console.log("✅ handleUpdateAllEvents was called with events:", events);
  events.forEach((ev) => {
    if (!ev.id || !ev.start || !ev.end || ev.extendedProps?.status === 4)
      return;

    const idStr = ev.id.toString();

    if (ev.extendedProps?.isOfftime) {
      const currId = ev.extendedProps.currId;
      const prevId = ev.extendedProps.prevId?.toString()?.split("-part-")[0];
      const prevPanelCode = ev.extendedProps.prevpanelcode;

      if (currId) {
        const currIdStr = currId.toString();

        if (!offInfo[currIdStr]) {
          offInfo[currIdStr] = {
            previd: Number(prevId),
            prevpanelcode: prevPanelCode,
            panelcode: ev.extendedProps.panelcode,
            offtimeduration: ev.extendedProps.offtimeduration,
            offtimestartdate: ev.extendedProps.offtimeStartDate
              ? dayjs(ev.extendedProps.offtimeStartDate).toDate()
              : dayjs(ev.start as Date).toDate(),

            offtimeenddate: ev.extendedProps.offtimeEndDate
              ? dayjs(ev.extendedProps.offtimeEndDate).toDate()
              : dayjs(ev.end as Date).toDate(),
          };
        } else {
          const currentEnd = new Date(
            ev.extendedProps.offtimeEndDate || (ev.end as Date),
          );
          const existingEnd = offInfo[currIdStr].offtimeenddate;
          if (existingEnd && currentEnd > existingEnd) {
            offInfo[currIdStr].offtimeenddate = currentEnd;
          }
        }
      }
      return;
    }

    const baseId = idStr.includes("-part-") ? idStr.split("-part-")[0] : idStr;
    const status = ev.extendedProps?.status;

    if (status && [1, 2, 3, 14].includes(status)) {
      if (!grouped[baseId]) {
        grouped[baseId] = [];
      }
      grouped[baseId].push(ev);
    }
  });

  for (const [baseId, group] of Object.entries(grouped)) {
    const sorted = group.sort((a, b) => {
      // Define status priority: in-process (2) comes before scheduled (14)
      const statusPriority: { [key: number]: number } = { 2: 0, 14: 1 };

      // First, sort by status priority
      if (a.status !== b.status) {
        return statusPriority[a.status] - statusPriority[b.status];
      }

      // If same status, sort by start date (earliest first)
      return (
        new Date(a.start as Date).getTime() -
        new Date(b.start as Date).getTime()
      );
    });
    const firstStart = new Date(sorted[0].start as Date);
    const lastEnd = new Date(sorted[sorted.length - 1].end as Date);
    console.log("sorted", sorted);
    const extra = offInfo[baseId];
    let updatedOffInfo = extra;
console.log("dailyWorkingHours", dailyWorkingHours);
    console.log("defaultWorkingHours", defaultWorkingHours);
    if (extra?.offtimeduration && extra.offtimestartdate) {
      const segments = splitEventIntoWorkingHours(
        dayjs(extra.offtimestartdate),
        extra.offtimeduration,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: `${baseId}-offtime`,
          title: createOfftimeTitle(
            extra.offtimeduration,
            extra.panelcode,
            extra.prevpanelcode,
          ),
          color: "gray",
          extendedProps: {
            isOfftime: true,
            currId: baseId,
            prevId: extra.previd?.toString(),
            prevpanelcode: extra.prevpanelcode,
            panelcode: extra.panelcode,
            offtimeduration: extra.offtimeduration,
          },
        },
      );
      console.log("segments:", segments);
      console.log("segment start:", segments[0]?.start);
      console.log("segment end:", segments[segments.length - 1]?.end);
      updatedOffInfo = {
        ...updatedOffInfo,
        offtimestartdate: dayjs(segments[0].start as any).toDate(),
        offtimeenddate: dayjs(
          segments[segments.length - 1].end as any,
        ).toDate(),
      };
    }

    try {
      await updatePporder(
        Number(baseId),
        dayjs(firstStart).toDate(),
        dayjs(lastEnd).toDate(),
        {
          ...updatedOffInfo,
          status:
            group[0]?.extendedProps?.status === 1
              ? 14
              : group[0]?.extendedProps?.status,
        },
      );
      console.log(`Successfully updated PPOrder ${baseId}`);
    } catch (error) {
      console.error(`Failed to update PPOrder ${baseId}:`, error);
    }
  }
};
