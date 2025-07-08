import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrderLine } from './productioncalendartypes';


import React, { useState } from "react";
import { Tooltip } from "antd";


import { StatusTag } from "@/utilities/map-status-id-to-name";


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
    overlayStyle={{ maxWidth: 600 }}
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




export const calculateTotalTime= (orderLines: PPOrderLine[]) => {
  const totalMinutes = orderLines.reduce((sum, line) => {
    return sum + (line.prodOrdersView?.time ?? 0);
  }, 0);

  // Create duration object
  const duration = dayjs.duration(totalMinutes, 'minutes');
  
  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    formatted: `${duration.hours()}h ${duration.minutes()}m`
  };
}


