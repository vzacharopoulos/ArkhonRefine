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
import { Button, Card, Checkbox, Divider,Typography, List, Space } from "antd";
const { Title, Text } = Typography;


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

 const handleEvents = (events: EventInput[]) => {
    setCurrentEvents(events);
 };

  const renderSidebarEvent = (event: EventInput) => (
    <List.Item>
      <Space>
        <Text strong>
          {event.start && new Date(event.start).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
        <Text italic>{event.title}</Text>
       
      </Space>
    </List.Item>
  );

  const renderSidebar = () => (
    <Card 
      style={{ 
        width: 300,
        boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
        border: '1px solid #f0f0f0'
      }}
    >
      <Card.Grid style={{ width: '100%', boxShadow: 'none' }}>
        <Title level={4} style={{ marginBottom: 16 }}>Instructions</Title>
        <List size="small">
          <List.Item>Select dates to create new events</List.Item>
          <List.Item>Drag, drop, and resize events</List.Item>
          <List.Item>Click an event to delete it</List.Item>
        </List>
      </Card.Grid>
      
      <Card.Grid style={{ width: '100%', boxShadow: 'none' }}>
        <Checkbox
          checked={weekendsVisible}
          onChange={handleWeekendsToggle}
        >
          Toggle weekends
        </Checkbox>
      </Card.Grid>
      
      <Card.Grid style={{ width: '100%', boxShadow: 'none' }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          All Events ({currentEvents.length})
        </Title>
        <List
          size="small"
          dataSource={currentEvents}
          renderItem={renderSidebarEvent}
          style={{ maxHeight: 400, overflowY: 'auto' }}
        />
      </Card.Grid>
    </Card>
  );


  return (
     <div style={{ padding: 24, display: "flex", gap: "24px" }}>
      {renderSidebar()}
      <div style={{ display: "flex", justifyContent: "flex-end",marginBottom: 16 }}>
       
      </div>
       <div style={{ flex: 1, minHeight: "80vh" }}>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        events={events}
        weekends={weekendsVisible}
        editable={true}
        selectable={true}
        height="100%"
      />
    </div>
    </div>
  );


};




export default ProductionCalendar;