import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCustom, useUpdate } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERLINES_OF_PPORDER, GET_PPORDERS, UPDATE_PPORDERS } from "@/graphql/queries";
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip, TimePicker, Modal, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";
import { STATUS_MAP, statusColorMap, StatusTag } from "@/utilities/map-status-id-to-name";
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
import { handleSaveEdit } from "./utilities/usehandleedit";
import { eventNames } from "process";
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

  const { mutate: updatePporder } = useUpdate<PPOrder>();

  // Then create a function to handle the mutation:
  const handleUpdatePporder = async (id: number, startDate: Date, finishDate: Date) => {
    try {
      await updatePporder({
        resource: "pporders",
        id,
        values: {
          // Wrap in 'input' object
          startDateDatetime: startDate ? startDate.toISOString() : null,
          finishDateDatetime: finishDate ? finishDate.toISOString() : null,
          status: 14, // Default to status 2 if not provided

        },
        meta: {
          gqlMutation: UPDATE_PPORDERS,
        },
      });
    } catch (error) {
      console.error("Failed to update PPOrder:", error);
    }
  };
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
    const initialSyncRef = useRef(false); 
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



  // When the start time is edited, shift the end time by the same delta
  useEffect(() => {
    if (!selectedEvent || !editStart || !selectedEvent.start || !selectedEvent.end) return;

    const originalStart = dayjs(selectedEvent.start as Date);
    const originalEnd = dayjs(selectedEvent.end as Date);

    const delta = editStart.diff(originalStart, "minute");

    setEditEnd(originalEnd.add(delta, "minute"));
  }, [editStart, selectedEvent]);

  const handleSaveWorkingHours = () => {
    if (!selectedDate) return;

    const dateKey = selectedDate.format("YYYY-MM-DD");

    const newDailyWorkingHours = {
      ...dailyWorkingHours,
      [dateKey]: { ...tempWorkingHours },
    };

    setDailyWorkingHours(newDailyWorkingHours);

    setCurrentEvents(prevEvents => {
      const sorted = [...prevEvents].sort((a, b) =>
        dayjs(a.start as Date).diff(dayjs(b.start as Date))
      );

      const startIdx = sorted.findIndex(ev =>
        dayjs(ev.start as Date).isSameOrAfter(selectedDate.startOf('day'))
      );

      if (startIdx === -1) return prevEvents;

      let prevEnd = startIdx > 0
        ? dayjs(sorted[startIdx - 1].end as Date)
        : selectedDate.startOf('day');

      for (let i = startIdx; i < sorted.length; i++) {
        const ev = sorted[i];
        const duration = dayjs(ev.end as Date).diff(dayjs(ev.start as Date), 'minute');

        const tentativeStart = isWithinWorkingHours(prevEnd, newDailyWorkingHours, defaultWorkingHours)
          ? prevEnd
          : findNextWorkingTime(prevEnd, newDailyWorkingHours, defaultWorkingHours);

        sorted.splice(i, 1);

        const splitEvents = splitEventIntoWorkingHours(
          tentativeStart,
          duration,
          newDailyWorkingHours,
          defaultWorkingHours,
          {
            ...ev,
            start: tentativeStart.toDate(),
            end: undefined,
          }
        );

        sorted.splice(i, 0, ...splitEvents);

        i += splitEvents.length - 1;

        prevEnd = dayjs(splitEvents[splitEvents.length - 1].end as Date);
      }

      const mergedEvents = mergeSameDayEventParts(sorted);
      return mergedEvents;
    });

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



  function mergeSameDayEventParts(events: EventInput[]): EventInput[] {
    const eventGroups = new Map<string, EventInput[]>();

    // Group events by date and base ID
    events.forEach(event => {
      if (!event.start || !event.id) return;

      const eventDate = dayjs(event.start as Date).format('YYYY-MM-DD');
      const baseId = event.id.toString().split('-part-')[0]; // Extract base ID
      const groupKey = `${eventDate}-${baseId}`;

      if (!eventGroups.has(groupKey)) {
        eventGroups.set(groupKey, []);
      }
      eventGroups.get(groupKey)!.push(event);
    });

    const mergedEvents: EventInput[] = [];

    eventGroups.forEach((group, groupKey) => {
      if (group.length === 1) {
        // Single event, no merging needed
        mergedEvents.push(group[0]);
      } else {
        // Multiple parts to merge
        const sortedParts = group.sort((a, b) =>
          dayjs(a.start as Date).diff(dayjs(b.start as Date))
        );

        const firstPart = sortedParts[0];
        const lastPart = sortedParts[sortedParts.length - 1];

        // Create merged event
        const mergedEvent: EventInput = {
          ...firstPart,
          id: firstPart.id!.split('-part-')[0], // Use base ID
          start: firstPart.start,
          end: lastPart.end,
          title: firstPart.title?.replace(/ - μέρος \d+$/, '') || firstPart.title, // Remove part suffix if exists
        };

        mergedEvents.push(mergedEvent);
      }
    });

    return mergedEvents;
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
    if (order.status == null || ![1, 2, 3, 14].includes(order.status)) return false;
    const recentThreshold = getlast80days();
    return order.createDate && dayjs(order.createDate).isAfter(recentThreshold);
  });


  const totalTime = useMemo(() => calculateTotalTime(orderLines), [orderLines]);



  const finishedEvents: EventInput[] = finished.map((order) => {
    const theoreticalTime =
      order.time != null
        ? dayjs.duration(order.time, "minutes").format("H[h] m[m]")
        : "0h 0m";
    const status = order.status ?? -1;
    const color = statusColorMap[status] || "gray";

    return {
      id: String(order.id),
      title: `${order.code} - θεωρητικός χρόνος ${theoreticalTime}`,
      start: order.startDateDatetime ? new Date(order.startDateDatetime) : undefined,
      end: order.finishDateDatetime ? new Date(order.finishDateDatetime) : undefined,
      duration: order.time,
      color,
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
  const [droppedIds, setDroppedIds] = useState<Set<string>>(new Set());
  const lastDroppedIdRef = useRef<string | null>(null);
  const dropTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dropHandler = useMemo(() =>
    handleDropFactory(
      currentEvents,
      finishedEvents,
      totalMinutes,
      dailyWorkingHours,
      defaultWorkingHours,
      setCurrentEvents,
      droppedIds,
      setDroppedIds
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
          eventDataTransform={(event) => {

            const duration = (event.duration);

            return {
              ...event,
              title:
                duration < 20
                  ? `${event.title.slice(0, 2)}...`
                  : event.title,
            };
          }}
          eventContent={(args) => (
            <EventTooltip
              tooltip={String(args.event.extendedProps?.tooltip || "")}
              status={args.event.extendedProps?.status}
            >
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                display: 'block',
                padding: '0px',
                width: '100%',
                height: '100%',



              }}>
                {args.timeText && <b>{args.timeText}</b>} {args.event.title}{args.event.textColor}
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
        onSave={() => {
          setCurrentEvents(prevEvents =>
            handleSaveEdit(
              selectedEvent,
              editStart,
              editEnd,
              prevEvents,
              dailyWorkingHours,
              defaultWorkingHours
            )
          );

          if (selectedEvent?.id) {
            handleUpdatePporder(
              Number(selectedEvent?.id?.split('-part-')[0]),
              editStart?.toDate() as Date,
              editEnd?.toDate() as Date

            );
          }
          console.log(selectedEvent?.id?.split('-part-')[0])
          setEditModalOpen(false); // optional: close modal after saving
        }}


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