import React, { useState } from "react";
import { useCustom } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERS } from "@/graphql/queries";
import { formatDate } from '@fullcalendar/core'
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Button, Card, Checkbox, Divider,Typography, List, Space,Layout, Menu  } from "antd";
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
export interface finishedPporders extends Omit<PPOrder, 'estDateOfProd'> {
  totalMeter?: number;
  speed?: number;
}

export const ProductionCalendar: React.FC = () => {
  const {
  data: ppordersData,
  isLoading: ppordersLoading,
  error: ppordersError
} = useCustom<{ pporders: PPOrder[] }>({
  url: "",
  method: "get",
  meta: {
    gqlQuery: GET_PPORDERS,
  },
});

const {
  data: finishedData,
  isLoading: finishedLoading,
  error: finishedError
} = useCustom<{ finished: finishedPporders[] }>({
  url: "",
  method: "get",
  meta: {
    gqlQuery: GET_FINISHED_PPORDERS,
    variables:{status : [4]},
    
  },
});


 const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);


const finished = finishedData?.data?.finished ?? [];

const initialEvents: EventInput[] = finished.map((order) => ({
  id: `finished-${order.id}`,
  title: `${order.pporderno} - ${order.panelcode}`,
  start: order.startDateDatetime ? new Date(order.startDateDatetime) : undefined,
  end: order.finishDateDatetime ? new Date(order.finishDateDatetime) : order.startDateDatetime,
  color: "lightblue", // optional: distinguish finished orders
  extendedProps: {
    status: order.status,
    totalMeter: order.totalMeter,
    speed: order.speed,
  },
}));







  const orders = ppordersData?.data?.pporders ?? [];
const unscheduledorders = orders.filter((order) => {
  if (order.status !== 1) return false;
  const recentThreshold = getlast80days();
  return order.createDate && dayjs(order.createDate).isAfter(recentThreshold);
});
  const recentOrders = orders.filter((order) => {
    if (!!order.startDateDatetime && !order.finishDateDatetime) {
      const start = dayjs(order.startDateDatetime)
      return start.isAfter(dayjs().subtract(1, "month"))
    }
    if (!!order.startDateDatetime && !!order.finishDateDatetime) {
    const start = dayjs(order.startDateDatetime);
    const finish = dayjs(order.finishDateDatetime);

    // If the duration is more than 1 month, exclude it
    return finish.diff(start, 'month', true) <= 1;
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


/*const handleEvents = (events: EventInput[]) => {
  const last80Days = getlast80days(); // assumed to return a Date

  const filteredEvents = events.filter((event) => {
    const status = event.extendedProps?.status;
     let startDateDatetime: dayjs.Dayjs | null = null;

    if (event.start instanceof Date) {
      startDateDatetime = dayjs(event.start);
    } else if (typeof event.start === 'string' || typeof event.start === 'number') {
      startDateDatetime = dayjs(new Date(event.start));
    }

    return status !== 4 && startDateDatetime && startDateDatetime.isBefore(last80Days);
  });

  setCurrentEvents(filteredEvents);
};*/

  
interface SidebarProps {
  weekendsVisible: boolean;
  onToggleWeekends: () => void;
  currentEvents: EventInput[];
  onToggleCurrentEvents:() => void;
   unscheduledorders: PPOrder[];
    selectedOrderId: number | null;
  onSelectOrder: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  weekendsVisible,
  onToggleWeekends,
  currentEvents,
  onToggleCurrentEvents,
  unscheduledorders,
  selectedOrderId,
  onSelectOrder
  
  
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
       <Title level={4}>Unscheduled Orders</Title>
  <Menu
    mode="inline"
    selectedKeys={selectedOrderId !== null ? [String(selectedOrderId)] : []}
    onClick={({ key }) => onSelectOrder(Number(key))}
    style={{ border: "none" }}
  >
    {unscheduledorders.map((order) => (
      <Menu.Item key={order.id}>
        {order.panelcode}
      </Menu.Item>
    ))}
  </Menu>
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
           unscheduledorders={unscheduledorders}
          currentEvents={currentEvents}
          onToggleCurrentEvents={handleCurrentEventToggle}
          selectedOrderId={selectedOrderId}
          onSelectOrder={(id) => setSelectedOrderId(id)}
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
          initialEvents={initialEvents} 
          weekends={weekendsVisible}
             selectMirror={true}            //this makes draggable events also drag the visual        
              //initialEvents={INITIAL_EVENTS}         *
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