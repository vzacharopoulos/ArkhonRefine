import React, { useMemo, useRef, useState } from "react";
import { useCustom } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERLINES_OF_PPORDER, GET_PPORDERS } from "@/graphql/queries";
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip, TimePicker, Modal, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";
import { STATUS_MAP, StatusTag } from "@/utilities/map-status-id-to-name";
import duration from "dayjs/plugin/duration";
import { finishedPporders, PPOrder, PPOrderLine, WorkingHoursConfig } from "./productioncalendartypes";
import { Sidebar } from "./sidebar";
import { EditOutlined } from "@ant-design/icons";
import isBetween from 'dayjs/plugin/isBetween';
import { addWorkingMinutes, findLastEventEndTime, findNextWorkingTime, generateNonWorkingHourBackgroundEvents, getWorkingHours, isWithinWorkingHours, splitEventIntoWorkingHours } from "./dateschedule-utils";
import { calculateTotalTime, EventTooltip } from "./event-utils";
import { WorkingHoursModal } from "@/components/modals/workinghoursmodal";
import { EditEventModal } from "@/components/modals/editeventmodal";
import { handleDropFactory } from "./utilities/usehandledrop";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
const { Title, Text } = Typography;
const { Sider, Content } = Layout;
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);





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
  const [workingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStart, setEditStart] = useState<Dayjs | null>(null);
  const [editEnd, setEditEnd] = useState<Dayjs | null>(null);

  // Keep your current defaultWorkingHours structure
  const [defaultWorkingHours, setDefaultWorkingHours] = useState<Record<number, WorkingHoursConfig>>({
    1: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, workingDays: [1, 2, 3, 4, 5, 6] }, // Monday
    2: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, workingDays: [1, 2, 3, 4, 5, 6] }, // Tuesday
    3: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, workingDays: [1, 2, 3, 4, 5, 6] }, // Wednesday
    4: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, workingDays: [1, 2, 3, 4, 5, 6] }, // Thursday
    5: { startHour: 6, startMinute: 0, endHour: 24, endMinute: 0, workingDays: [1, 2, 3, 4, 5, 6] }, // Friday (ends at midnight)
    6: { startHour: 0, startMinute: 0, endHour: 15, endMinute: 0, workingDays: [1, 2, 3, 4, 5, 6] },//saturday
    0: { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, workingDays: [] }, // Sunday is off
  });

  // Daily working hours overrides
  const [dailyWorkingHours, setDailyWorkingHours] = useState<Record<string, WorkingHoursConfig>>({});

  // Temporary state for modal
  const [tempWorkingHours, setTempWorkingHours] = useState<WorkingHoursConfig>({
    startHour: 6,
    startMinute: 0,
    endHour: 22,
    endMinute: 0,
    workingDays: [1, 2, 3, 4, 5],
  });

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;

    const start = event.start ? dayjs(event.start) : null;
    const end = event.end ? dayjs(event.end) : null;

    setSelectedEvent(event);
    setEditStart(start);
    setEditEnd(end);
    setEditModalOpen(true);
  };

  const handleSaveWorkingHours = () => {
    if (!selectedDate) return;

    const dateKey = selectedDate.format("YYYY-MM-DD");
    setDailyWorkingHours((prev) => ({
      ...prev,
      [dateKey]: { ...tempWorkingHours },
    }));

    setWorkingHoursModalOpen(false);
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    const dateKey = date.format("YYYY-MM-DD");
    const existing = dailyWorkingHours[dateKey];

    if (existing) {
      setTempWorkingHours({ ...existing });
    } else {
      const weekday = date.day(); // 0 (Sunday) to 6 (Saturday)
      const defaultConfig = defaultWorkingHours[weekday];

      if (defaultConfig) {
        setTempWorkingHours({ ...defaultConfig });
      } else {
        // fallback if no config exists for that weekday
        setTempWorkingHours({
          startHour: 6,
          startMinute: 0,
          endHour: 22,
          endMinute: 0,
          workingDays: [1, 2, 3, 4, 5],
        });
      }
    }
    setWorkingHoursModalOpen(true);
  };

  const onSave = () => {
  if (!selectedEvent || !editStart || !editEnd) return;

  // Find the original event
  const originalEvent = currentEvents.find(ev => ev.id === selectedEvent.id);
  if (!originalEvent?.end) return;

  // Calculate the time difference
  const originalEnd = dayjs(originalEvent.end as Date);
  const newEnd = editEnd;
  const deltaMinutes = newEnd.diff(originalEnd, "minute");

  // Get all events that need to be shifted (those after our modified event)
  const eventsToShift = currentEvents.filter(ev => {
    return ev.start && dayjs(ev.start as Date).isSameOrAfter(originalEnd);
  });

  // Update the events
  setCurrentEvents(prev => {
    return prev.map(ev => {
      // 1. Update the selected event
      if (ev.id === selectedEvent.id) {
        return { ...ev, start: editStart.toDate(), end: editEnd.toDate() };
      }

      // 2. Shift subsequent events
      if (ev.start && dayjs(ev.start as Date).isSameOrAfter(originalEnd)) {
        const workingHours = getWorkingHours(
          dayjs(ev.start as Date), 
          dailyWorkingHours, 
          defaultWorkingHours
        );
        
        // Calculate new start time
        let newStart = addWorkingMinutes(
          dayjs(ev.start as Date),
          deltaMinutes,
          workingHours
        );

        // Ensure we don't schedule before the new end of the modified event
       

        // Adjust to working hours if needed
        if (!isWithinWorkingHours(newStart, dailyWorkingHours, defaultWorkingHours)) {
          newStart = findNextWorkingTime(newStart, dailyWorkingHours, defaultWorkingHours);
        }

        // Calculate new end time maintaining the same duration
        const duration = ev.end 
          ? dayjs(ev.end as Date).diff(dayjs(ev.start as Date), "minute")
          : 0;
          
        const newEnd = duration > 0
          ? addWorkingMinutes(newStart, duration, workingHours)
          : undefined;

        return { 
          ...ev, 
          start: newStart.toDate(), 
          end: newEnd?.toDate() 
        };
      }

      return ev;
    });
  });

  setEditModalOpen(false);
};

 const handleSaveEdit = () => {
  if (!selectedEvent || !editStart || !editEnd) return;

  setCurrentEvents(prevEvents => {
    // 1. Remove the original event and any existing split parts
    const baseId = String(selectedEvent.id).split("-part-")[0];
    const partRegex = new RegExp(`^${baseId}(-part-\\d+)?$`);
    const filteredEvents = prevEvents.filter(ev => !partRegex.test(String(ev.id)));

    // 2. Calculate duration and split into working hours
    const duration = editEnd.diff(editStart, 'minute');
    const splitEvents = splitEventIntoWorkingHours(
      editStart,
      duration,
      dailyWorkingHours,
      defaultWorkingHours,
      {
        ...selectedEvent,
        start: editStart.toDate(),
        end: editEnd.toDate()
      }
    );

    // 3. Process subsequent events
    const subsequentEvents = prevEvents.filter(ev => 
      ev.start && dayjs(ev.start as Date).isAfter(editStart)
    ).map(ev => ({ ...ev }));

    let lastEnd = editEnd;
    const processedSubsequentEvents = subsequentEvents.map(ev => {
      const evDuration = ev.end 
        ? dayjs(ev.end as Date).diff(dayjs(ev.start as Date), 'minute')
        : 0;

      const newStart = isWithinWorkingHours(lastEnd, dailyWorkingHours, defaultWorkingHours)
        ? lastEnd
        : findNextWorkingTime(lastEnd, dailyWorkingHours, defaultWorkingHours);

      const newEnd = evDuration > 0
        ? addWorkingMinutes(newStart, evDuration, 
            getWorkingHours(newStart, dailyWorkingHours, defaultWorkingHours))
        : undefined;

      lastEnd = newEnd || newStart;

      return {
        ...ev,
        start: newStart.toDate(),
        end: newEnd?.toDate()
      };
    });

    // 4. Group and merge split events by day
    const mergedEvents: EventInput[] = [];
    const eventsByDay: Record<string, EventInput[]> = {};

    // Group split events by day
    splitEvents.forEach(event => {
      if (!event.start) return;
      const dayKey = dayjs(event.start).format('YYYY-MM-DD');
      if (!eventsByDay[dayKey]) {
        eventsByDay[dayKey] = [];
      }
      eventsByDay[dayKey].push(event);
    });

    // Merge events for each day
    Object.entries(eventsByDay).forEach(([dayKey, dayEvents]) => {
      if (dayEvents.length === 0) return;

      // Sort events by start time
      dayEvents.sort((a, b) => 
        dayjs(a.start as Date).diff(dayjs(b.start as Date))
      );

      // Find earliest start and latest end
      const mergedStart = dayEvents.reduce((min, ev) => 
        !ev.start ? min : dayjs(ev.start).isBefore(min) ? dayjs(ev.start) : min, 
        dayjs(dayEvents[0].start as Date)
      );

      const mergedEnd = dayEvents.reduce((max, ev) => 
        !ev.end ? max : dayjs(ev.end).isAfter(max) ? dayjs(ev.end) : max, 
        dayjs(dayEvents[0].end as Date)
      );

      // Create merged event
      mergedEvents.push({
        ...selectedEvent,
        id: `${baseId}-${dayKey}`, // Unique ID with day suffix
        start: mergedStart.toDate(),
        end: mergedEnd.toDate(),
        extendedProps: {
          ...selectedEvent.extendedProps,
          originalParts: dayEvents.length // Track how many parts were merged
        }
      });
    });

    // 5. Combine all events
    return [
      ...filteredEvents,
      ...mergedEvents,
      ...processedSubsequentEvents
    ].sort((a, b) => 
      dayjs(a.start as Date).diff(dayjs(b.start as Date))
    );
  });

  setEditModalOpen(false);
};

  function calculateWorkingMinutesBetween(
  start: Dayjs,
  end: Dayjs,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): number {
  let total = 0;
  let current = start.clone();

  while (current.isBefore(end)) {
    const dateKey = current.format("YYYY-MM-DD");
    const day = current.day();
    const config = dailyWorkingHours[dateKey] ?? defaultWorkingHours[day];

    if (config && config.workingDays.includes(day)) {
      const dayStart = current
        .startOf("day")
        .hour(config.startHour)
        .minute(config.startMinute);
      const dayEnd = current
        .startOf("day")
        .hour(config.endHour)
        .minute(config.endMinute);

      const segStart = current.isBefore(dayStart) ? dayStart : current;
      const segEnd = end.isBefore(dayEnd) ? end : dayEnd;

      if (segStart.isBefore(segEnd)) {
        total += segEnd.diff(segStart, "minute");
      }
    }

    current = current.add(1, "day").startOf("day");
  }

  return total;
}

 function calculateNonWorkingMinutesBetween(
  start: Dayjs,
  end: Dayjs,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): number {
  const totalMinutes = end.diff(start, "minute");
  const workingMinutes = calculateWorkingMinutesBetween(
    start,
    end,
    dailyWorkingHours,
    defaultWorkingHours
  );

  return Math.max(totalMinutes - workingMinutes, 0);
}

 function deleteQuantityOutsideWorkingHours(
  start: Dayjs,
  end: Dayjs,
  quantity: number,
  quantityPerMinute: number,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): number {
  const nonWorkingMinutes = calculateNonWorkingMinutesBetween(
    start,
    end,
    dailyWorkingHours,
    defaultWorkingHours
  );

  const quantityToDelete = nonWorkingMinutes * quantityPerMinute;
  return Math.max(quantity - quantityToDelete, 0);
}

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
  const finished = finishedData?.data?.masterlengths ?? [];
  const orders = ppordersData?.data?.pporders ?? [];

  const unscheduledorders = orders.filter((order) => {
    if (order.status !== 1) return false;
    const recentThreshold = getlast80days();
    return order.createDate && dayjs(order.createDate).isAfter(recentThreshold);
  });

  const totalTime = useMemo(() => calculateTotalTime(orderLines), [orderLines]);

  

  const finishedEvents: EventInput[] = finished.map((order) => {
    const theoreticalTime =
      order.time != null
        ? dayjs.duration(order.time, "minutes").format("H[h] m[m]")
        : "0h 0m";

       
    return {
      id: String(order.id),
      title: `${order.code} - θεωρητικός χρόνος ${theoreticalTime}`,
      start: order.startDateDatetime ? new Date(order.startDateDatetime) : undefined,
      end: order.finishDateDatetime ? new Date(order.finishDateDatetime) : undefined,
      color: "lightgreen",
      extendedProps: {
        status: order.status,
        totalMeter: order.totalMeter,
        speed: order.speed,
        tooltip: `${order.pporderno} - ${order.code}\n - μήκος παραγγελίας: ${(order.totalMeter ?? 0).toFixed(2) || 0}m\n` +
          `Θεωρητικός χρόνος: ${theoreticalTime} \n` +
          `Ημερομηνία έναρξης: ${order.startDateDatetime ? dayjs(order.startDateDatetime).format("YYYY-MM-DD HH:mm") : "—"} \n` +
          `Ημερομηνία ληξης: ${order.finishDateDatetime ? dayjs(order.finishDateDatetime).format("YYYY-MM-DD HH:mm") : "—"} \n` +
          `κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}`,
      },
    };
  });

   const totalMinutes = totalTime.hours * 60 + totalTime.minutes;

const dropTimeoutRef = useRef<NodeJS.Timeout | null>(null);

const dropHandler = useMemo(() =>
  handleDropFactory(
    currentEvents,
    finishedEvents,
    totalMinutes,
    dailyWorkingHours,
    defaultWorkingHours,
    setCurrentEvents,
    dropTimeoutRef
  ), [
    currentEvents,
    finishedEvents,
    totalMinutes,
    dailyWorkingHours,
    defaultWorkingHours,
    setCurrentEvents
]);

  const nonWorkingTimeBackgroundEvents = useMemo(() => {
    return generateNonWorkingHourBackgroundEvents(dailyWorkingHours, defaultWorkingHours);
  }, [dailyWorkingHours, defaultWorkingHours]);

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

        <Divider />

        <div style={{ marginBottom: 16 }}>
          <Title level={5}>αλλαγή ωρών λειτουργίας</Title>
          <DatePicker
            placeholder="διάλεξε ημερα"
            onChange={(date) => {
              if (date) handleDateSelect(date);
            }}
            style={{ width: "100%" }}
          />
        </div>
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
          events={[...finishedEvents, ...currentEvents, ...nonWorkingTimeBackgroundEvents]}
          weekends={weekendsVisible}
          eventClick={handleEventClick}
          selectMirror={true}
          editable={true}
          eventOverlap={false}
          droppable={true}
          selectable={true}
          drop={dropHandler}
          dayHeaderContent={(arg) => (
            <div
              onClick={() => handleDateSelect(dayjs(arg.date))}
              style={{ cursor: 'pointer', padding: '4px' }}
            >
              {arg.text}
              <Tooltip title="ώρισε εργάσιμες ώρες">
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDateSelect(dayjs(arg.date));
                  }}
                />
              </Tooltip>
            </div>
          )}
          height="100%"
          eventContent={(args) => (
            <EventTooltip
              tooltip={String(args.event.extendedProps?.tooltip || "")}
              status={args.event.extendedProps?.status}
            >
              <div style={{
                overflow: 'hidden',
                overflowWrap: 'anywhere',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                width: '100%',
                padding: '2px',
                wordBreak: 'break-word',
                height: 'auto',
                

              }}>
                {args.timeText && <b>{args.timeText}</b>} {args.event.title}
              </div>
            </EventTooltip>
          )}
          

     
        />
      </Content>
     <EditEventModal
  open={editModalOpen}
  event={selectedEvent}
  editStart={editStart}
  editEnd={editEnd}
  onCancel={() => setEditModalOpen(false)}
  onDelete={() => {
    if (!selectedEvent) return;
    setCurrentEvents(prev => prev.filter(ev => ev.id !== selectedEvent.id));
    setEditModalOpen(false);
  }}
 onSave={handleSaveEdit}



  onChangeStart={setEditStart}
  onChangeEnd={setEditEnd}
/>

<WorkingHoursModal
  open={workingHoursModalOpen}
  date={selectedDate}
  config={tempWorkingHours}
  onChange={setTempWorkingHours}
  onCancel={() => setWorkingHoursModalOpen(false)}
  onOk={handleSaveWorkingHours}
/>
    </Layout>
  );
};

export default ProductionCalendar;