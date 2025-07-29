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
  slotDuration: string;
  slotMinTime: string;
  slotMaxTime: string;

}

export const ProductionCalendarView: React.FC<ProductionCalendarViewProps> = ({
  events,
  weekendsVisible,
  dropHandler,
  onEventClick,
  onDayHeaderClick,
  slotDuration,
  slotMinTime,
  slotMaxTime,
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
    eventMinHeight={3}              // 🔥 Reduced from 5 to 3 for smaller events
    
    slotMinTime={slotMinTime}
    slotMaxTime={slotMaxTime}
    slotDuration={slotDuration}      // 10-second slots
    slotLabelInterval="01:00:00"    // Show labels every minute
    slotLabelFormat={{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }}
    
    // 🔥 Key properties for smaller rows and better fit
    height="auto"                  // Full viewport height
    contentHeight="auto"           // Match the height
    aspectRatio={2.0}               // Very tall and narrow
    
    // 🔥 Additional row height control
    expandRows={false}              // Don't expand rows to fill container
    
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
        <div onClick={handleClick} style={{ cursor: "pointer", padding: "2px" }}> {/* Reduced padding */}
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
    
    eventContent={(args) => {
      const isMonthView = args.view.type === "dayGridMonth";
      return (
        <EventTooltip
          tooltip={String(args.event.extendedProps?.tooltip || "")}
          status={args.event.extendedProps?.status}
        >
          <div
            className={isMonthView ? "fc-month-text-yellow" : ""}
            style={{
              marginBottom: "1px",     // 🔥 Reduced from 2px to 1px
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "block",
              padding: "1px",          // 🔥 Reduced from 0px to add minimal padding
              width: "100%",
              height: "100%",
              fontSize: "11px",        // 🔥 Smaller font size
              lineHeight: "1.1",       // 🔥 Tighter line height
            }}
          >
            {args.timeText && <b style={{ fontSize: "10px" }}>{args.timeText}</b>} {args.event.title}
          </div>
        </EventTooltip>
      );
    }}
  />
);