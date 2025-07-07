import React, { useMemo, useState } from "react";
import { useCustom } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERLINES_OF_PPORDER, GET_PPORDERS } from "@/graphql/queries";
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import { EventTooltip, addWorkingMinutes, calculateTotalTime, getWorkingHours, isWithinWorkingHours, splitEventIntoWorkingHours } from './event-utils'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip, TimePicker, Modal, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";
import { STATUS_MAP, StatusTag } from "@/utilities/map-status-id-to-name";
import duration from "dayjs/plugin/duration";
import { finishedPporders, PPOrder, PPOrderLine } from "./productioncalendartypes";
import { Sidebar } from "./sidebar";
import { EditOutlined } from "@ant-design/icons";
import isBetween from 'dayjs/plugin/isBetween';

const { Title, Text } = Typography;
const { Sider, Content } = Layout;
dayjs.extend(duration);
dayjs.extend(isBetween);
export interface WorkingHoursConfig {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  workingDays: number[]; // 0 = Sunday, 6 = Saturday
}

// Helper function to find the last event end time
const findLastEventEndTime = (events: EventInput[]): Dayjs | null => {
  if (events.length === 0) return null;

  const sortedEvents = events
    .filter(event => event.end) // Include ALL events with end times (including offtime)
    .sort((a, b) => {
      const endA = dayjs(a.end as Date);
      const endB = dayjs(b.end as Date);
      return endB.diff(endA); // Sort by end time descending
    });

  return sortedEvents.length > 0 ? dayjs(sortedEvents[0].end as Date) : null;
};
const findNextWorkingTime = (startTime: Dayjs, dailyWorkingHours: Record<string, WorkingHoursConfig>, defaultWorkingHours: Record<number, WorkingHoursConfig>): Dayjs => {
  let currentTime = startTime;
  let maxDaysToCheck = 30; // Prevent infinite loops

  while (maxDaysToCheck > 0) {
    const workingHoursConfig = getWorkingHours(currentTime, dailyWorkingHours, defaultWorkingHours);

    if (workingHoursConfig.isBusinessDay) {
      const dayStart = currentTime.startOf('day')
        .hour(workingHoursConfig.startHour)
        .minute(workingHoursConfig.startMinute);
      const dayEnd = currentTime.startOf('day')
        .hour(workingHoursConfig.endHour)
        .minute(workingHoursConfig.endMinute);

      // If current time is before the working day starts, use the start of working day
      if (currentTime.isBefore(dayStart)) {
        return dayStart;
      }

      // If current time is within working hours, use current time
      if (currentTime.isBetween(dayStart, dayEnd, null, '[]')) {
        return currentTime;
      }

      // If current time is after working hours, move to next day
    }

    // Move to the next day
    currentTime = currentTime.add(1, 'day').startOf('day');
    maxDaysToCheck--;
  }

  // Fallback to original time if no working time found
  return startTime;
};



// Helper function to get date range for background events
function getDateRange(days: number): Dayjs[] {
  const today = dayjs();
  const start = today.subtract(days / 2, "day");
  return Array.from({ length: days }, (_, i) => start.add(i, "day"));
}

// Helper function to generate non-working hour background events
function generateNonWorkingHourBackgroundEvents(
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): EventInput[] {
  const allDays = getDateRange(60);
  const events: EventInput[] = [];

  for (const day of allDays) {
    const dateStr = day.format("YYYY-MM-DD");
    const dayOfWeek = day.day();

    // Get configuration for this specific day
    const specificConfig = dailyWorkingHours[dateStr];
    const config = specificConfig || defaultWorkingHours[dayOfWeek];

    if (!config) continue;

    // If it's not a working day, block the full day
    if (!config.workingDays.includes(dayOfWeek)) {
      events.push({
        start: `${dateStr}T00:00:00`,
        end: `${dateStr}T23:59:59`,
        display: 'background',
        color: 'rgb(158, 128, 128)',
        title: 'αργία',
      });
      continue;
    }

    // Format time strings with proper padding
    const startTimeStr = `${String(config.startHour).padStart(2, '0')}:${String(config.startMinute).padStart(2, '0')}:00`;
    const endTimeStr = `${String(config.endHour).padStart(2, '0')}:${String(config.endMinute).padStart(2, '0')}:00`;

    // Before working hours - only if start time is after 00:00
    if (config.startHour > 0 || config.startMinute > 0) {
      events.push({
        start: `${dateStr}T00:00:00`,
        end: `${dateStr}T${startTimeStr}`,
        display: 'background',
        color: 'rgba(188, 99, 99, 0.51)',
        title: 'πριν την έναρξη',
      });
    }

    // After working hours - only if end time is before 24:00 (midnight)
    if (config.endHour < 24) {
      events.push({
        start: `${dateStr}T${endTimeStr}`,
        end: `${dateStr}T23:59:59`,
        display: 'background',
        color: 'rgba(188, 99, 99, 0.51)',
        title: 'λήξη εργασίας',
      });
    } else if (config.endHour === 24 && config.endMinute > 0) {
      // Handle cases where endHour is 24 but endMinute is not 0
      // This shouldn't normally happen, but if it does, we treat it as ending at midnight
      // No background event needed as it goes to the end of the day
    }
    // If endHour is 24 and endMinute is 0, working hours go to midnight, so no "after hours" event needed
  }

  return events;
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
          <Title level={5}>Configure Working Hours</Title>
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
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
                padding: '2px'
              }}>
                {args.timeText && <b>{args.timeText}</b>} {args.event.title}
              </div>
            </EventTooltip>
          )}
drop={(info) => {
  const dropDate = dayjs(info.date);
  const draggedEvent = JSON.parse(info.draggedEl.dataset.event || '{}');
  const durationInMinutes = totalTime.hours * 60 + totalTime.minutes;

  // Find the last event's end time - this should include offtime events
  const lastEventEndTime = findLastEventEndTime([...currentEvents, ...finishedEvents]);

  // Determine the actual start time for the new event
  let actualStartTime: Dayjs;

  if (lastEventEndTime) {
    // The new event should start immediately after the last event ends
    // No need to check working hours here - just start right after
    actualStartTime = lastEventEndTime;
  } else {
    // If no existing events, use the drop date but ensure it's within working hours
    if (isWithinWorkingHours(dropDate, dailyWorkingHours, defaultWorkingHours)) {
      actualStartTime = dropDate;
    } else {
      // Find the next available working time from the drop date
      actualStartTime = findNextWorkingTime(dropDate, dailyWorkingHours, defaultWorkingHours);
    }
  }

  // Split the event into working hours segments using the actual start time
  const eventSegments = splitEventIntoWorkingHours(
    actualStartTime,
    durationInMinutes,
    dailyWorkingHours,
    defaultWorkingHours,
    draggedEvent
  );

  // Add the offtime event after the last segment
  const lastSegment = eventSegments[eventSegments.length - 1];
  if (lastSegment) {
    // Start offtime immediately after the last segment ends
    const offtimeStart = dayjs(lastSegment.end as Date);

    const offtimeConfig = getWorkingHours(
      offtimeStart,
      dailyWorkingHours,
      defaultWorkingHours
    );

    const offtimeEnd = addWorkingMinutes(offtimeStart, 30, offtimeConfig);

    const offEvent: EventInput = {
      id: `${draggedEvent.id}-offtime`,
      title: 'προετοιμασία μηχανής',
      start: offtimeStart.toDate(),
      end: offtimeEnd.toDate(),
      color: 'gray',
      extendedProps: { isOfftime: true },
    };
    setCurrentEvents((prev) => [...prev, ...eventSegments, offEvent]);
  } else {
    setCurrentEvents((prev) => [...prev, ...eventSegments]);
  }
}}

          eventAllow={(dropInfo) => {
            const start = dayjs(dropInfo.start);
            const end = dayjs(dropInfo.end ?? dropInfo.start);
            const config = getWorkingHours(start, dailyWorkingHours, defaultWorkingHours);

            if (!config.isBusinessDay) return false;

            const isSameDay = start.isSame(end, 'day');
            const startTime = start.hour() * 60 + start.minute();
            const endTime = end.hour() * 60 + end.minute();
            const configStartTime = config.startHour * 60 + config.startMinute;
            const configEndTime = config.endHour * 60 + config.endMinute;

            const isStartValid = startTime >= configStartTime;
            const isEndValid = endTime <= configEndTime;

            return isSameDay && isStartValid && isEndValid;
          }}
        />
      </Content>
      <Modal
  open={editModalOpen}
  title="αλλάξτε ώρα"
  onCancel={() => setEditModalOpen(false)}
  footer={[
    <Button
      key="delete"
      danger
      onClick={() => {
        if (!selectedEvent) return;

        const updated = currentEvents.filter(ev => ev.id !== selectedEvent.id);
        setCurrentEvents(updated);
        setEditModalOpen(false);
      }}
    >
      Διαγραφή
    </Button>,
    <Button key="cancel" onClick={() => setEditModalOpen(false)}>
      Άκυρο
    </Button>,
    <Button
      key="submit"
      type="primary"
      onClick={() => {
        if (!selectedEvent || !editStart || !editEnd) return;

        const updated = currentEvents.map(ev => {
          if (ev.id === selectedEvent.id) {
            return {
              ...ev,
              start: editStart.toDate(),
              end: editEnd.toDate(),
            };
          }
          return ev;
        });

        setCurrentEvents(updated);
        setEditModalOpen(false);
      }}
    >
      Αποθήκευση
    </Button>
  ]}
>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <Text>Start Time:</Text>
            <TimePicker
              value={editStart}
              format="HH:mm"
              onChange={(time) => {
                if (time && editStart) {
                  setEditStart(editStart.hour(time.hour()).minute(time.minute()));
                }
              }}
            />
          </div>

          <div>
            <Text>End Time:</Text>
            <TimePicker
              value={editEnd}
              format="HH:mm"
              onChange={(time) => {
                if (time && editEnd) {
                  setEditEnd(editEnd.hour(time.hour()).minute(time.minute()));
                }
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title={`Set Working Hours for ${selectedDate?.format("YYYY-MM-DD")}`}
        open={workingHoursModalOpen}
        onCancel={() => setWorkingHoursModalOpen(false)}
        onOk={handleSaveWorkingHours}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div>
              <Text>ώρα έναρξης:</Text>
              <TimePicker
                value={dayjs().hour(tempWorkingHours.startHour).minute(tempWorkingHours.startMinute)}
                format="HH:mm"
                onChange={(time) => {
                  if (time) {
                    setTempWorkingHours((prev) => ({
                      ...prev,
                      startHour: time.hour(),
                      startMinute: time.minute(),
                    }));
                  }
                }}
              />
            </div>
            <div>
              <Text>ωρα λήξης:</Text>
              <TimePicker
                value={dayjs().hour(tempWorkingHours.endHour).minute(tempWorkingHours.endMinute)}
                format="HH:mm"
                onChange={(time) => {
                  if (time) {
                    setTempWorkingHours((prev) => ({
                      ...prev,
                      endHour: time.hour(),
                      endMinute: time.minute(),
                    }));
                  }
                }}
              />
            </div>
          </div>

          <div>
            <Text>Working Days:</Text>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <Checkbox
                  key={index}
                  checked={tempWorkingHours.workingDays.includes(index)}
                  onChange={(e) => {
                    setTempWorkingHours((prev) => ({
                      ...prev,
                      workingDays: e.target.checked
                        ? [...prev.workingDays, index]
                        : prev.workingDays.filter((d) => d !== index),
                    }));
                  }}
                >
                  {day}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProductionCalendar;