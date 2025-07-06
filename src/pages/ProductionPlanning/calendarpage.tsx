import React, { useMemo, useState } from "react";
import { useCustom } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERLINES_OF_PPORDER, GET_PPORDERS } from "@/graphql/queries";
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import {  calculateTotalTime, EventTooltip, isWithinWorkingHours, splitIntoWorkingHourEvents } from './event-utils'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";

import { STATUS_MAP, StatusTag } from "@/utilities/map-status-id-to-name";
import duration from "dayjs/plugin/duration";
import { finishedPporders, PPOrder, PPOrderLine  } from "./productioncalendartypes";
import { Sidebar } from "./sidebar";
const { Title, Text } = Typography;
const { Sider, Content } = Layout;
dayjs.extend(duration);







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
   const theoreticalTime =
  order.time != null
    ? dayjs.duration(order.time, "minutes").format("H[h] m[m]")
    : "0h 0m";

    return {
      id: String(order.id),
      title: ` ${order.code} - - θεωρητικός χρόνος ${theoreticalTime} `,
      start: order.startDateDatetime ? new Date(order.startDateDatetime) : undefined,
      end: order.finishDateDatetime ? new Date(order.finishDateDatetime) : undefined,
      color: "lightgreen",
      extendedProps: {
        status: order.status,
        totalMeter: order.totalMeter,
        speed: order.speed,
        tooltip: `${order.pporderno} - ${order.code}\n - μήκος παραγγελίας: ${(order.totalMeter??0).toFixed(2) || 0}m\n` +
          `Θεωρητικός χρόνος: ${theoreticalTime} \n` +
          `Ημερομηνία έναρξης: ${order.startDateDatetime ? dayjs(order.startDateDatetime).format("YYYY-MM-DD HH:mm") : "—"} \n` +
          `Ημερομηνία ληξης: ${order.finishDateDatetime ? dayjs(order.finishDateDatetime).format("YYYY-MM-DD HH:mm") : "—"} \n` +
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
  
const totalTime = useMemo(() => calculateTotalTime(orderLines), [orderLines]);

  // Toggle function
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleCurrentEventToggle = () => {
    setWeekendsVisible(!weekendsVisible);
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
            totalTime={totalTime}
            
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
          initialView="timeGridWeek"
          events={[...finishedEvents, ...currentEvents]}
          weekends={weekendsVisible}
          selectMirror={true}            //this makes draggable events also drag the visual        
          //initialEvents={INITIAL_EVENTS}         *
          editable={true}

          eventOverlap={false}
          droppable={true}
          selectable={true}

          height="100%"
                    eventContent={(args) => (
  <EventTooltip
      tooltip={String(args.event.extendedProps?.tooltip || "")}
      status={args.event.extendedProps?.status}
    >      <div style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        padding: '2px'
      }}>
        {args.timeText && <b>{args.timeText}</b>} {args.event.title}
      </div>
    </EventTooltip>
          )}
          businessHours={{
            // Monday–Friday, 08:00–16:00
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '06:00',
            endTime: '22:00',
          }}
         drop={(info) => {
  const date = dayjs(info.date);

  if (!isWithinWorkingHours(date)) {
    alert("You can only drop events during working hours (Mon–Fri, 06:00–22:00)");
    return;
  }

  const draggedEvent = JSON.parse(info.draggedEl.dataset.event || '{}');
  const theoreticalTime = totalTime.formatted;

    const durationMinutes = totalTime.hours * 60 + totalTime.minutes;
  const segments = splitIntoWorkingHourEvents(date, durationMinutes);
  
 setCurrentEvents((prev) => [
    ...prev,
    ...segments.map((seg) => ({
      ...draggedEvent,
      title: `${draggedEvent.title} - θεωρητικός χρόνος ${theoreticalTime}`,
      start: seg.start,
      end: seg.end,
       extendedProps: {
        ...(draggedEvent.extendedProps ?? {}),
        tooltip:
          `${draggedEvent.extendedProps?.tooltip ?? draggedEvent.title ?? ''}\nΘεωρητικός χρόνος: ${theoreticalTime}`,
        theoreticalTime,
      },
    })),
  ]);
}}

  

        />
      </Content>
    </Layout>
  );


};




export default ProductionCalendar;