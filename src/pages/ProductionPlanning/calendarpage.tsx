import React, { useState } from "react";
import { useCustom } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_PPORDERS } from "@/graphql/queries";
import { formatDate } from '@fullcalendar/core'
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Button } from "antd";

export interface PPOrder {
  id: number;
  pporderno?: string;
  panelcode?: string;
  status?: string;
  startDate?: string;
  finishDate?: string;
  estDateOfProd?: string;
  createDate?: string;
  quantity?: number;
  timeSum?: number;
}

export const ProductionCalendar: React.FC = () => {
  const { data, isLoading, error } = useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS,
    },
  });

 const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);


  const orders = data?.data?.pporders ?? [];

  const events: EventInput[] = orders.map((order) => ({
    id: String(order.id),
    title: `${order.pporderno} - ${order.panelcode}`,
    start: order.startDate ? new Date(order.startDate) : undefined,
    end: order.finishDate ? new Date(order.finishDate) : undefined,
    color:
      order.status === "4"
        ? "gray"
        : order.status === "1"
        ? "yellow"
        : undefined,
  }));

    // Toggle function
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

 const handleEvents = (events) => {
    setCurrentEvents(events)
    }
  }
   

    const renderSidebar = () => (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          />
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </div>
    </div>
  );


  return (
     <div style={{ padding: 24, display: "flex", gap: "24px" }}>
      {renderSidebar()}
      <div style={{ display: "flex", justifyContent: "flex-end",marginBottom: 16 }}>
        <Button type="primary" onClick={handleWeekendsToggle} >
          {weekendsVisible ? "Εμφάνιση  εργάσιμων" : "Εμφάνιση ολων"}
        </Button>
      </div>
      <FullCalendar
         plugins={[
              adaptivePlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              resourceTimelinePlugin,
            ]}
        initialView="dayGridMonth"
        events={events}
        weekends={weekendsVisible} // Pass the state to FullCalendar
        editable={true}
            selectable={true}

      />
    </div>
  );


};




export default ProductionCalendar;