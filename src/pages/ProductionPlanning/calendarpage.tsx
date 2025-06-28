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
import { Button, Card, Checkbox, Divider,Typography, List, Space,Layout  } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

export interface PPOrder {
  id: number;
  pporderno?: string;
  panelcode?: string;
  status?: number;
  startDateDatetime?: Date;
  finishDateDatetime?: Date;
  estDateOfProd?: Date;
  createDate?: Date;
  
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

  const recentOrders = orders.filter((order) => {
    if (!!order.startDateDatetime && !order.finishDateDatetime) {
      const start = dayjs(order.startDateDatetime)
      return start.isAfter(dayjs().subtract(1, "month"))
    }
    return true
  })

  const events: EventInput[] = recentOrders.map((order) => ({
    id: String(order.id),
    title: `${order.pporderno} - ${order.panelcode}`,
    start: !!order.startDateDatetime ? new Date(order.startDateDatetime) : undefined,
    end: !!order.finishDateDatetime ? new Date(order.finishDateDatetime) : undefined,
    color: order.status === 4 ? "green": order.status === 1? "yellow": undefined,
    extendedProps:{
      status: order.status           }
  }));

    // Toggle function
    const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

   const handleCurrentEventToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };


const handleEvents = (events: EventInput[]) => {
  const last80Days = getlast80days(); // assumed to return a Date

  const filteredEvents = events.filter((event) => {
    const status = event.extendedProps?.status;
    const startDateDatetime = event.start ? dayjs(event.start instanceof Date ? event.start
       : new Date(event.start)) : null

    return status !== 4 && startDateDatetime && startDateDatetime.isBefore(last80Days);
  });

  setCurrentEvents(filteredEvents);
};

  
interface SidebarProps {
  weekendsVisible: boolean;
  onToggleWeekends: () => void;
  currentEvents: EventInput[];
  onToggleCurrentEvents:() => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  weekendsVisible,
  onToggleWeekends,
  currentEvents,
  onToggleCurrentEvents
}) => {
  const renderSidebarEvent = (event: EventInput) => (
    <List.Item key={event.id}>
      <Text strong>
        {event.start &&
          formatDate(event.start as Date, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
      </Text>
      <Text> {event.title}</Text>
    </List.Item>
  );

  return (
    <Sider width={300} style={{ background: "#fff", padding: 3 }}>
      <div className="demo-app-sidebar-section">
        <Title level={4}>Instructions</Title>
        <List
          size="small"
          dataSource={[
            "Select dates and you will be prompted to create a new event",
            "Drag, drop, and resize events",
            "Click an event to delete it",
          ]}
          renderItem={(item) => (
            <List.Item>
              <Text>{item}</Text>
            </List.Item>
          )}
        />
      </div>

      <Divider />

      <div className="demo-app-sidebar-section">
        <Checkbox checked={weekendsVisible} onChange={onToggleWeekends}>
          Toggle weekends
        </Checkbox>
      </div>
      <div className="demo-app-sidebar-section">
        <Checkbox checked={weekendsVisible} onChange={onToggleCurrentEvents}>
          Toggle recent masters
        </Checkbox>
      </div>


      <Divider />

      <div className="demo-app-sidebar-section">
        <Title level={4}>All Events ({currentEvents.length})</Title>
        <List size="small" dataSource={currentEvents} renderItem={renderSidebarEvent} />
      </div>
    </Sider>
  );
};



  return (
        <Layout style={{ padding: 24, display: "flex", gap: 24 }}>
      <Sider width={300} style={{ background: "#fff", padding: 24 }}>
        <Sidebar
          weekendsVisible={weekendsVisible}
          onToggleWeekends={handleWeekendsToggle}
          
          currentEvents={currentEvents}
          onToggleCurrentEvents={handleEvents}
        />
      </Sider>
      <Content style={{ flex: 1, minHeight: "80vh" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
          initialView="dayGridMonth"
          events={events}
          weekends={weekendsVisible}
             selectMirror={true} 

          editable={true}
          eventOverlap={false}
          selectable={true}
          height="100%"
        />
      </Content>
    </Layout>
  );


};




export default ProductionCalendar;