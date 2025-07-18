// utils/handleUpdateAllEvents.ts

import { EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";
import { PPOrder, WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { splitEventIntoWorkingHours } from "@/pages/ProductionPlanning/dateschedule-utils";
import { STATUS_MAP, statusColorMap } from "@/utilities/map-status-id-to-name";

export  type UpdateFn = (
  id: number,
  start: Date,
  end: Date,
  extraValues?: Partial<PPOrder>
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
  events.forEach(ev => {
    if (!ev.id || !ev.start || !ev.end) return;

    const idStr = ev.id.toString();

    if (ev.extendedProps?.isOfftime) {
      const currId = ev.extendedProps.currId;
      const prevId = ev.extendedProps.prevId?.toString()?.split('-part-')[0];
      const prevPanelCode = ev.extendedProps.prevpanelcode;

      if (currId) {
        const currIdStr = currId.toString();

        if (!offInfo[currIdStr]) {
          offInfo[currIdStr] = {
            previd: Number(prevId),
            prevpanelcode: prevPanelCode,
            offtimeduration: ev.extendedProps.offtimeduration,
            offtimestartdate: ev.extendedProps.offtimeStartDate
              ? new Date(ev.extendedProps.offtimeStartDate)
              : new Date(ev.start as Date),
            offtimeenddate: ev.extendedProps.offtimeEndDate
              ? new Date(ev.extendedProps.offtimeEndDate)
              : new Date(ev.end as Date),
          };
        } else {
          const currentEnd = new Date(ev.extendedProps.offtimeEndDate || ev.end as Date);
          const existingEnd = offInfo[currIdStr].offtimeenddate;
          if (existingEnd && currentEnd > existingEnd) {
            offInfo[currIdStr].offtimeenddate = currentEnd;
          }
        }
      }
      return;
    }

    const baseId = idStr.includes('-part-') ? idStr.split('-part-')[0] : idStr;
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
    return new Date(a.start as Date).getTime() - new Date(b.start as Date).getTime();
});
    const firstStart = new Date(sorted[0].start as Date);
    const lastEnd = new Date(sorted[sorted.length - 1].end as Date);
console.log("sorted",sorted)
    const extra = offInfo[baseId];
    let updatedOffInfo = extra;

    if (extra?.offtimeduration && extra.offtimestartdate) {
      const segments = splitEventIntoWorkingHours(
        dayjs(extra.offtimestartdate),
        extra.offtimeduration,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: `${baseId}-offtime`,
          title: "προετοιμασία μηχανής",
          color: "gray",
          extendedProps: {
            isOfftime: true,
            currId: baseId,
            prevId: extra.previd?.toString(),
            prevpanelcode: extra.prevpanelcode,
            offtimeduration: extra.offtimeduration,
          },
        }
      );

      updatedOffInfo = {
        ...updatedOffInfo,
        offtimestartdate: new Date(segments[0].start as Date),
        offtimeenddate: new Date(segments[segments.length - 1].end as Date),
      };
    }

    try {
      await updatePporder(Number(baseId), firstStart, lastEnd, {
        ...updatedOffInfo,
        status: group[0]?.extendedProps?.status === 1 ? 14 : group[0]?.extendedProps?.status,
      });
      console.log(`Successfully updated PPOrder ${baseId}`);
    } catch (error) {
      console.error(`Failed to update PPOrder ${baseId}:`, error);
    }
  }
};
