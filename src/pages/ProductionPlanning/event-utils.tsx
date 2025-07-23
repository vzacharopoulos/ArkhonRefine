import { EventInput } from '@fullcalendar/core'
import dayjs, { Dayjs } from "dayjs";
import { PPOrderLine } from './productioncalendartypes';


import React, { useState } from "react";
import { Tooltip } from "antd";


import { StatusTag } from "@/utilities/map-status-id-to-color";


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
export const calculateTotalLength= (orderLines: PPOrderLine[]) => {
  const totalttm = orderLines.reduce((sum, line) => {
    return sum + (line.prodOrdersView?.ttm ?? 0);
  }, 0);

  // Create duration object

  return totalttm;
  
    

}

