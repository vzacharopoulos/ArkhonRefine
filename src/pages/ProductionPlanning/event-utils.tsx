import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrder, PPOrderLine, WorkingHoursConfig } from './productioncalendartypes';


import React, { useState } from "react";
import { Tooltip } from "antd";


import { StatusTag } from "@/utilities/map-status-id-to-color";
import { calc } from 'antd/es/theme/internal';
import { addWorkingMinutesDynamic, calculateWorkingMinutesBetween, splitEventIntoWorkingHours } from './dateschedule-utils';


interface EventTooltipProps {
  tooltip: string;
  status?: number;
  children: React.ReactNode; 
}



export const EventTooltip: React.FC<EventTooltipProps> = ({ tooltip, status, children }) => (
  <Tooltip
    title={
      <div style={{ whiteSpace: "pre-line" }}>
        {tooltip}
        {status !== undefined && (
          <div style={{ marginTop: 8 }}>
            <StatusTag status={status} />
          </div>
        )}
      </div>
    }
    
    styles={{ body: { maxHeight: 200,
      overflowY: "auto",
      paddingRight: 8,
      whiteSpace: "pre-line",} ,
      root: {maxWidth: 600}// controls outer container size
    
    }
    
    }
    
  >
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {children}
    </div>
  </Tooltip>
);



export const calculateTotalTime= (orders: PPOrder[]) => {
  // console.log(orders,"started time calc")
  const totalMinutes = orders.reduce((acc, order) => acc + (order.totalOrderTime || 0), 0);
  // Create duration object
  const duration = dayjs.duration(totalMinutes ?? 0, 'minutes');

  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    formatted: `${duration.hours()}h ${duration.minutes()}m`
  };
}
export const calculateTotalLength= (orders: PPOrder[]) => {
  const totalttm = orders.reduce((acc, order) => acc + (order.totalTtm || 0), 0);
  // Create duration object

  return totalttm;
  
    

}



export function chainEventsSequentially(
  events: EventInput[],
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): EventInput[] {
  if (!events || events.length === 0) return [];

  const sorted = [...events].sort((a, b) =>
    dayjs(a.start as Date).diff(dayjs(b.start as Date))
  );

  // ✅ Check if already sequential
  let isSequential = true;
  for (let i = 1; i < sorted.length; i++) {
    const prevEnd = dayjs(sorted[i - 1].end as Date);
    const currStart = dayjs(sorted[i].start as Date);
    if (!currStart.isSame(prevEnd)) {
      isSequential = false;
      break;
    }
  }

  if (isSequential) {
    return events;
  }

  // 🔁 Chain and split if not already sequential
  let currentStart = dayjs(sorted[0].start as Date);
  const result: EventInput[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const ev = sorted[i];
    const originalStart = dayjs(ev.start as Date);
    const originalEnd = dayjs(ev.end as Date);
    const duration = calculateWorkingMinutesBetween(
      originalStart,
      originalEnd,
      dailyWorkingHours,
      defaultWorkingHours
    );

    const baseId = ev.id?.toString().split("-part-")[0] ?? ev.id?.toString();

    const splitSegments = splitEventIntoWorkingHours(
      currentStart,
      duration,
      dailyWorkingHours,
      defaultWorkingHours,
      {
        ...ev,
        id: baseId,
      }
    );

    result.push(...splitSegments);

    currentStart = dayjs(splitSegments[splitSegments.length - 1].end as Date);
  }

  return result;
}

 export  function deduplicateEventIds(events: EventInput[]): EventInput[] {
      const counterMap = new Map<string, Record<string, number>>();

      const getType = (idOrTitle: string): 'part' | 'pause' | 'offtime' => {
        const lower = idOrTitle.toLowerCase();
        if (lower.includes("pause")) return "pause";
        if (lower.includes("offtime")) return "offtime";
        return "part";
      };

      const getBaseOrderId = (id: string): string => {
        // Extract base order ID from something like: 1234-pause-part-1
        const match = id.match(/^(\d+)/);
        return match ? match[1] : id;
      };

      return events.map(event => {
        const originalId = event.id?.toString() ?? "";
        const type = getType(originalId || event.title || "");
        const baseOrderId = getBaseOrderId(originalId);

        if (!counterMap.has(baseOrderId)) {
          counterMap.set(baseOrderId, { part: 0, pause: 0, offtime: 0 });
        }

        const typeCounts = counterMap.get(baseOrderId)!;
        typeCounts[type] += 1;

        const newId =
          type === "part"
            ? `${baseOrderId}-part-${typeCounts[type]}`
            : `${baseOrderId}-${type}-part-${typeCounts[type]}`;

        return {
          ...event,
          id: newId,
          extendedProps: {
            ...event.extendedProps,
            partIndex: typeCounts[type],
            isPart: typeCounts[type] > 1,
          },
        };
      });
    }
