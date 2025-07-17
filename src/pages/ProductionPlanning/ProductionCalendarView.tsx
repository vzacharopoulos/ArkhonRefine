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
    selectable
    drop={dropHandler}
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
    height="100%"
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
    eventContent={(args) => (
      <EventTooltip
        tooltip={String(args.event.extendedProps?.tooltip || "")}
        status={args.event.extendedProps?.status}
      >
        <div
          style={{
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
    )}
  />
);