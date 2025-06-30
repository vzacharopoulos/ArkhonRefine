import React, { useMemo, useState } from "react";
import { useCustom } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERLINES_OF_PPORDER, GET_PPORDERS } from "@/graphql/queries";
import { formatDate } from '@fullcalendar/core'
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";
import { useRef, useEffect } from "react";
import { CalendarApi } from "@fullcalendar/core";
import { STATUS_MAP, StatusTag } from "@/utilities/map-status-id-to-name";

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

export interface PPOrderLine {
  id: number;
  pporderno?: string;
  panelcode?: string;
  status?: number;
  custporderno?: string;
  upDate?: Date;
}

export interface finishedPporders extends Omit<PPOrder, 'estDateOfProd' | 'panelcode'> {
  totalMeter?: number;
  speed?: number;
  code: string;
  time?: number;
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
  } = useCustom<{ masterlengths: finishedPporders[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_FINISHED_PPORDERS,
      variables: {
        filter: {
          status: [4],
        },
      },
    },
  });


  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedPporderno, setSelectedPporderno] = useState<string | null>(null);

  const finished = finishedData?.data?.masterlengths ?? [];


  const finishedEvents: EventInput[] = finished.map((order) => {
    // Calculate theoretical time safely
    const theoreticalTime = order.time != null ? (order.time / 60).toFixed(2) : "0.00";

    return {
      id: String(order.id),
      title: ` ${order.code} - - θεωρητικός χρόνος ${theoreticalTime} h`,
      start: order.startDateDatetime ? new Date(order.startDateDatetime) : undefined,
      end: order.finishDateDatetime ? new Date(order.finishDateDatetime) : undefined,
      color: "lightgreen",
      extendedProps: {
        status: order.status,
        totalMeter: order.totalMeter,
        speed: order.speed,
        tooltip: `${order.pporderno} - ${order.code} - μήκος παραγγελίας: ${order.totalMeter || 0}m\n` +
          `Θεωρητικός χρόνος: ${theoreticalTime} h\n` +
          `Ημερομηνία έναρξης: ${order.startDateDatetime ? dayjs(order.startDateDatetime).format("YYYY-MM-DD HH:mm") : "—"}` +
          `Ημερομηνία ληξης: ${order.finishDateDatetime ? dayjs(order.finishDateDatetime).format("YYYY-MM-DD HH:mm") : "—"}` +
          `κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}`,
      },
    };
  });



  const { data: orderLinesData, isLoading: orderLinesLoading } = useCustom<{ pporderlines2: PPOrderLine[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERLINES_OF_PPORDER,
      variables: {
        filter: {
          ppordernos: selectedPporderno,
        },
      },
    },
    queryOptions: {
      enabled: !!selectedPporderno,
    },
  });

  const orderLines = orderLinesData?.data?.pporderlines2 ?? [];


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
    color: order.status === 4 ? "green" : order.status === 1 ? "yellow" : undefined,
    extendedProps: {
      status: order.status
    }
  }));

  // Toggle function
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleCurrentEventToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };


  const totalTimeInHours = useMemo(() => {
    return orderLines.reduce((sum, line) => {
      return sum + (line.prodOrdersView?.time ?? 0);
    }, 0) / 60;
  }, [orderLines]);
 


  interface SidebarProps {
    weekendsVisible: boolean;
    onToggleWeekends: () => void;
    currentEvents: EventInput[];
    onToggleCurrentEvents: () => void;
    unscheduledorders: PPOrder[];
    selectedOrderId: number | null;
    onSelectOrder: (id: number) => void;
    orderLines: PPOrderLine[];
    orderLinesLoading: boolean;
  }

  const Sidebar: React.FC<SidebarProps> = ({
    weekendsVisible,
    onToggleWeekends,
    currentEvents,
    onToggleCurrentEvents,
    unscheduledorders,
    selectedOrderId,
    onSelectOrder,

    orderLines,
    orderLinesLoading


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
    
  

    useEffect(() => {
      let containerEl = document.getElementById("external-events");
      if (containerEl) {
        new Draggable(containerEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            const data = eventEl.getAttribute("data-event");
            return data ? JSON.parse(data) : {};
          },
        });
      }
    }, []);


    return (
      <Sider width={300} style={{ background: "#fff", padding: 2 }}>
        <div className="demo-app-sidebar-section" id="external-events">
          <Title level={4}>Προγραμματισμός Master</Title>
          <Menu
            mode="inline"
            selectedKeys={selectedOrderId !== null ? [String(selectedOrderId)] : []}
            onClick={({ key }) => onSelectOrder(Number(key))}
            style={{
              border: "none",
              fontSize: 13,
              overflowY: "auto",
            }}
          >
            {unscheduledorders.map((order) => (
              <Menu.Item key={order.id}>
                <div className="fc-event"
                  title={order.panelcode}
                  style={{ whiteSpace: "normal", lineHeight: 1.4 }}
                  data-event={JSON.stringify({
                    id: String(order.id),
                    title: `${order.pporderno} - ${order.panelcode}`,
                  })}>
                  {order.panelcode} {order.id === selectedOrderId && (
                    <Text strong> - {totalTimeInHours.toFixed(2)} ώρες</Text>
                  )}
                  <div><StatusTag status={order.status} /></div>
                </div>
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

        {selectedOrderId && (
          <div className="demo-app-sidebar-section">
            <Title level={5}>Κομμάτια Εντολής</Title>
            <div style={{ maxHeight: 390, overflowY: "scroll", paddingRight: 8 }}>
              {orderLinesLoading ? (
                <span>Loading...</span>
              ) : (
                <List
                  size="small"
                  dataSource={orderLines}
                  renderItem={(line) => (
                    <List.Item key={line.id}>
                      <span>{line.custporderno}-{line.prodOrdersView.time != null ? (line.prodOrdersView.time / 60).toFixed(2) : "0.00"}h</span>
                      <StatusTag status={line.status} />
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
        )}
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
          onSelectOrder={(id) => {
            setSelectedOrderId(id);
            const order = unscheduledorders.find((o) => o.id === id);
            setSelectedPporderno(order?.pporderno || null);
          }}
          orderLines={orderLines}
          orderLinesLoading={orderLinesLoading}

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
          events={[...finishedEvents, ...currentEvents]}
          weekends={weekendsVisible}
          selectMirror={true}            //this makes draggable events also drag the visual        
          //initialEvents={INITIAL_EVENTS}         *
          editable={true}
         
          eventOverlap={false}
          droppable={true}
          selectable={true}
          
          height="100%"
          eventDidMount={(info) => {
            // Attach the full event title to the element as a native HTML tooltip
            info.el.setAttribute("title", info.event.extendedProps.tooltip);
          }}
           businessHours={{
            // Monday–Friday, 08:00–16:00
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '06:00',
            endTime: '22:00',
          }}
          drop={(info) => {
            // Called when an external element is dropped
            console.log("Dropped event:", info.draggedEl.dataset.event);
            const draggedEvent = JSON.parse(info.draggedEl.dataset.event || '{}');
            const durationInHours = totalTimeInHours || 2;

            // Compute the end time
            const startDate = dayjs(info.date);
            const endDate = startDate.add(durationInHours, "hour");
            // Add to current events
            setCurrentEvents((prev) => [
              ...prev,
              {
                ...draggedEvent,
                start: startDate.toDate(),
                end: endDate.toDate(),
              },
            ]);
          }}

        dropAllow={(dropInfo) => {
    const date = dayjs(dropInfo.date);
    const day = date.day();
    const hour = date.hour();
    
    // Monday-Friday between 6:00-22:00
    return day >= 1 && day <= 5 && hour >= 6 && hour < 22;
  }}
        />
      </Content>
    </Layout>
  );


};




export default ProductionCalendar;