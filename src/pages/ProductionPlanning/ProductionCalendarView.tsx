import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DropArg } from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { Button, Tooltip } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { EditOutlined } from "@ant-design/icons";
import { EventTooltip } from "@/pages/ProductionPlanning/event-utils";
import elLocale from '@fullcalendar/core/locales/el'; // Greek


interface ProductionCalendarViewProps {
  events: EventInput[];
  weekendsVisible: boolean;
  dropHandler: (arg: DropArg) => void;
  onEventClick: (clickInfo: any) => void;
  onDayHeaderClick: (date: Dayjs) => void;
}

export const ProductionCalendarView: React.FC<ProductionCalendarViewProps> = ({
  events,
  weekendsVisible,
  dropHandler,
  onEventClick,
  onDayHeaderClick,
}) => (
  <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    }}
    initialView="timeGridWeek"
    events={events}
    weekends={weekendsVisible}
    eventClick={onEventClick}
    selectMirror
    editable
    droppable
    
      eventOverlap={false}            // 🔒 prevent visual overlap
  slotEventOverlap={false}        // 🔒 force slot-based stacking
  eventMaxStack={999}             // 🧱 allow many stacked events
  eventMinHeight={5}   
    slotMinTime="00:00:00"
  slotMaxTime="24:00:00"
  slotDuration="00:30:00"
  slotLabelInterval="01:00"
  slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
height="auto"
  contentHeight="auto"

    selectable
    allDaySlot={false}
    drop={dropHandler}
       locale={elLocale}
       
    dayHeaderContent={(arg) => {
      
      const date = dayjs(arg.date);
      const handleClick = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        onDayHeaderClick(date);
      };
      return (
        <div onClick={handleClick} style={{ cursor: "pointer", padding: "4px" }}>
          {arg.text}
          <Tooltip title="ώρισε εργάσιμες ώρες">
            <Button type="text" size="small" icon={<EditOutlined />} onClick={handleClick} />
          </Tooltip>
        </div>
      );
    }}
    
    eventDataTransform={(event) => {
      const duration = event.duration;
      return {
        ...event,
        title:
          duration && duration < 20
            ? `${event.title?.slice(0, 2) || ""}...`
            : event.title ?? "",
      };
    }}
    eventContent={(args) =>{ const isMonthView = args.view.type === "dayGridMonth";
 return (
      
      <EventTooltip
        tooltip={String(args.event.extendedProps?.tooltip || "")}
        status={args.event.extendedProps?.status}
      >
        <div
          className={isMonthView ? "fc-month-text-yellow" : ""}
          style={{
            
            marginBottom: "2px", // spacing between stacked events
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            wordBreak: "break-word",
            display: "block",
            padding: "0px",
            width: "100%",
            height: "100%",
          }}
        >
          {args.timeText && <b>{args.timeText}</b>} {args.event.title}
          {args.event.textColor}
        </div>
      </EventTooltip>
    )}}
  />
);