import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCustom, useDataProvider, useResourceSubscription, useUpdate } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERLINES_OF_PPORDER, GET_PPORDERS, PPORDER_UPDATED_SUBSCRIPTION, PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION, UPDATE_PPORDERS } from "@/graphql/queries";
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip, TimePicker, Modal, DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";
import { STATUS_MAP, statusColorMap, StatusTag } from "@/utilities/map-status-id-to-color";
import duration from "dayjs/plugin/duration";
import { finishedPporders, PPOrder, PPOrderLine, WorkingHoursConfig } from "./productioncalendartypes";
import { Sidebar } from "./sidebar";
import { EditOutlined } from "@ant-design/icons";
import isBetween from 'dayjs/plugin/isBetween';
import { addWorkingMinutes, addWorkingMinutesDynamic, calculateWorkingMinutesBetween, findLastEventEndTime, findNextWorkingTime, generateNonWorkingHourBackgroundEvents, getWorkingHours, isWithinWorkingHours, mergeSameDayEventParts, splitEventIntoWorkingHours } from "./dateschedule-utils";
import { calculateTotalLength, calculateTotalTime, chainEventsSequentially, EventTooltip } from "./event-utils";
import { WorkingHoursModal } from "@/components/modals/workinghoursmodal";
import { EditEventModal } from "@/components/modals/editeventmodal";
import { handleDropFactory } from "./utilities/usehandledrop";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { print } from "graphql";
import { handleSaveEdit } from "./utilities/usehandleedit";
import { eventNames } from "process";
import { handleDateSelect, handleSaveWorkingHours } from "./workinghours-utils";
import { offTimeMap } from "./utilities/offtime-map";
import { wsClient } from "@/providers";
import { TotalTimeProvider } from "@/contexts/TotalTimeContext";
import { WorkingHoursPicker } from "./helpers/workinghourspicker";
import { ProductionCalendarView } from "./ProductionCalendarView";
import { UpdateAllButton } from "./buttons/updateallbutton";
import { usePporderSubscriptions } from "@/hooks/usePporderSubscriptions";
import { useSyncEditEnd } from "@/hooks/useSyncEditEnd";
import { usePporders } from "@/hooks/usePporders";
import { useFinishedPporders } from "@/hooks/useFinishedPporders";
import { useUpdatePporder } from "@/hooks/useUpdatePporder";
import { useStartPporder } from "@/hooks/useStartPporder";
import { handleUpdateAllEvents } from "./handlers/handleupdateall";
import { usePporderLines } from "@/hooks/usePporderLines";
import { createOfftimeTitle } from "./helpers/offtimetitle";
import { useDailyWorkingHoursQuery, useUpdateDailyWorkingHours } from "@/hooks/useWorkingHours";
import { useCurrentEvents } from "@/contexts/currentEventsProvider";
import { dummyEvents, SetCurrentEventsButton } from "./buttons/setcurrenteventsbutton";
const { Title, Text } = Typography;
const { Sider, Content } = Layout;
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);



// Add working minutes considering varying daily working hours



export const ProductionCalendar: React.FC = () => {
  const {
    data: ppordersData,
    isLoading: ppordersLoading,
    error: ppordersError,
    refetch: refetchPporders,

  } = usePporders();

  const {
    data: finishedData,
    isLoading: finishedLoading,
    refetch: refetchFinished,
  } = useFinishedPporders();

  const { data: workingHoursData } = useDailyWorkingHoursQuery();

  const { updateDailyWorkingHours } = useUpdateDailyWorkingHours();

  const { updatePporder } = useUpdatePporder();

  // Then create a function to handle the mutation:
  const handleUpdatePporder = async (
    id: number,
    startDate: Date,
    finishDate: Date,
    extraValues?: Partial<PPOrder>
  ) => {
    try {
      await updatePporder(id, {
        estStartDate: startDate ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ') : null,
        estFinishDate: finishDate ? dayjs(finishDate).format('YYYY-MM-DDTHH:mm:ssZ') : null,

        ...extraValues,
      });
    } catch (error) {
      console.error("Η εντολή δεν ενημερώθηκε:", error);
    }
  };

  const handlePersistWorkingHours = async (date: Dayjs, config: WorkingHoursConfig) => {
    try {
      await updateDailyWorkingHours(date.format('YYYY-MM-DD'), config);
    } catch (error) {
      console.error(error);
    }
  };



  const handleUnschedulePporder = async (
    id?: string,
    extraValues?: Partial<PPOrder>
  ) => {
    const allPartsId = String(id).split('-')[0];
    const numerified = Number(allPartsId);

    const deletedOrder = orders.find(order => order.id === numerified);
    if (!deletedOrder) return;

    // Find the next order in the chain
    const nextOrder = orders.find(order => order.previd === numerified);
    if (nextOrder && deletedOrder) {
      nextOrder.estStartDate = deletedOrder.estStartDate;
    }


    try {
      // 1. Clear current order
      await updatePporder(numerified, {
        estStartDate: null,
        estFinishDate: null,
        status: 1,
        offtimeduration: null,
        offtimestartdate: null,
        offtimeenddate: null,
        previd: null,
        prevpanelcode: null,
        ...extraValues,
      });

      // 2. If there's a next order, transfer offtime data to it
      if (nextOrder) {
        const previousCode = deletedOrder.prevpanelcode?.replace(/-001$/, "");
        const currentCode = nextOrder.panelcode?.replace(/-001$/, "");
        const offtimeduration = offTimeMap?.[previousCode ?? 0]?.[currentCode ?? 0] ?? 30;


        await updatePporder(nextOrder.id, {
          offtimeduration: offtimeduration ?? null,
          offtimestartdate: deletedOrder.offtimestartdate ?? null,
          offtimeenddate: deletedOrder.offtimeenddate ?? null,
          previd: deletedOrder.previd ?? null,
          prevpanelcode: deletedOrder.prevpanelcode ?? null,
        });
      }
      await refetchPporders();
      // Filter out the deleted order and its parts from the currentEvents
      const updatedEvents = currentEvents.filter(ev => {
        const evId = ev.id?.toString();
        return !evId?.startsWith(String(numerified));
      });

      // Optional: filter out incomplete events (without start or end)
      const validEvents = updatedEvents.filter(ev => ev.start && ev.end);

      // Chain remaining events
      const chainedEvents = chainEventsSequentially(validEvents, dailyWorkingHours, defaultWorkingHours);

      console.log("Chained events after unscheduling:", chainedEvents);
      // Update the DB and state
      await handleUpdateAllEvents({
        events: chainedEvents,
        dailyWorkingHours,
        defaultWorkingHours,
        updatePporder: handleUpdatePporder,
      });

      setCurrentEvents(chainedEvents);
      message.success(`Η εντολή ${deletedOrder.pporderno} ακυρώθηκε επιτυχώς.`);
      console.log(currentEvents)
    } catch (error) {
      console.error("Η εντολή δεν ενημερώθηκε:", error);
    }
  };



  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const { currentEvents, setCurrentEvents } = useCurrentEvents();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedPporderno, setSelectedPporderno] = useState<string | null>(null);
  const [workingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStart, setEditStart] = useState<Dayjs | null>(null);
  const [editEnd, setEditEnd] = useState<Dayjs | null>(null);
  const manualSyncRef = useRef<boolean>(false);

  const [droppedIds, setDroppedIds] = useState<Set<string>>(new Set());
  const droppedIdsRef = useRef<Set<string>>(new Set());
  const [slotDuration, setSlotDuration] = useState("00:30:00");
  const toggleSlotDuration = () =>
    setSlotDuration(prev => (prev === "00:30:00" ? "01:00:00" : "00:30:00"));

  const [slotMaxTime, setSlotMaxTime] = useState("23:00:00");
  const [slotMinTime, setSlotMinTime] = useState("05:00:00");
  const toggleSlotMinMax = () =>{
    setSlotMaxTime(prev => (prev === "23:00:00" ? "24:00:00" : "23:00:00"));
  setSlotMinTime(prev => (prev === "05:00:00" ? "00:00:00" : "05:00:00"));
  }
  // Keep your current defaultWorkingHours structure
  const [defaultWorkingHours, setDefaultWorkingHours] = useState<
    Record<number, WorkingHoursConfig>
  >({
    1: {
      startHour: 6,
      startMinute: 0,
      endHour: 22,
      endMinute: 0,
      isWorkingDay: true,
    }, // Monday
    2: {
      startHour: 6,
      startMinute: 0,
      endHour: 22,
      endMinute: 0,
      isWorkingDay: true,
    }, // Tuesday
    3: {
      startHour: 6,
      startMinute: 0,
      endHour: 22,
      endMinute: 0,
      isWorkingDay: true,
    }, // Wednesday
    4: {
      startHour: 6,
      startMinute: 0,
      endHour: 22,
      endMinute: 0,
      isWorkingDay: true,
    }, // Thursday
    5: {
      startHour: 6,
      startMinute: 0,
      endHour: 23,
      endMinute: 59,
      isWorkingDay: true,
    }, // Friday (ends at midnight)
    6: {
      startHour: 0,
      startMinute: 1,
      endHour: 15,
      endMinute: 0,
      isWorkingDay: true,
    }, // Saturday
    0: {
      startHour: 0,
      startMinute: 0,
      endHour: 0,
      endMinute: 0,
      isWorkingDay: false,
    }, // Sunday is off
  });



  // Daily working hours overrides
  const [dailyWorkingHours, setDailyWorkingHours] = useState<
    Record<string, WorkingHoursConfig>
  >({});

  useEffect(() => {
    if (workingHoursData?.data?.workingHoursAll) {
      const mapped = workingHoursData.data.workingHoursAll.reduce(
        (acc, cur) => {
          acc[cur.date] = {
            startHour: cur.startHour,
            startMinute: cur.startMinute,
            endHour: cur.endHour,
            endMinute: cur.endMinute,
            isWorkingDay: cur.isWorkingDay,
          };
          return acc;
        },
        {} as Record<string, WorkingHoursConfig>
      );
      setDailyWorkingHours(mapped);
    }
  }, [workingHoursData?.data]);
  // Temporary state for modal
  const [tempWorkingHours, setTempWorkingHours] = useState<WorkingHoursConfig>({
    startHour: 6,
    startMinute: 0,
    endHour: 22,
    endMinute: 0,
    isWorkingDay: true,
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
  useSyncEditEnd(selectedEvent, editStart, setEditEnd);

  const {
    data: orderLinesData,
    isLoading: orderLinesLoading,
    refetch: refetchPporderlines,
  } = usePporderLines(selectedPporderno);

  const orderLines = orderLinesData?.data?.pporderlines2 ?? [];
  const finished = finishedData?.data?.masterlengths ?? [];
  const orders = ppordersData?.data?.pporders ?? [];
  const unscheduledorders = useMemo(
    () =>
      orders.filter(order => {
        if (order.status == null || ![1, 2, 3, 14].includes(order.status)) return false;
        const recentThreshold = getlast80days();
        return order.createDate && dayjs(order.createDate).isAfter(recentThreshold);
      }),
    [orders]
  );

  usePporderSubscriptions({
    refetchPporders,
    refetchPporderlines,
    refetchFinished,
    finishedOrders: finished,
    dailyWorkingHours,
    setDailyWorkingHours,
    updateDailyWorkingHours,
    defaultWorkingHours,
    currentEvents,
    setCurrentEvents,
    setEditStart,
    setEditEnd,
    handleUpdateAllEvents,
    manualSyncRef,
  });

  const totalTimeByOrderId = useMemo(() => {
    const map: Record<number, { hours: number; minutes: number; formatted: string; totalMinutes: number }> = {};

    unscheduledorders.forEach(order => {
      const lines = orderLines.filter(line => line.pporderno === order.pporderno);
      const time = calculateTotalTime(lines);
      const totalMinutes = time.hours * 60 + time.minutes;
      map[order.id] = {
        ...time,
        totalMinutes,
      };
    });

    return map;
  }, [unscheduledorders, orderLines]);


  useEffect(() => { // renders currentEvents from unscheduled orders whenever orders change
    if (manualSyncRef.current) return;   // skip rebuild during manual updates
    const preScheduled = unscheduledorders
      .filter(o => o.estStartDate && o.estFinishDate && !(o.status === 1))
      .sort((a, b) =>
        dayjs(a.estStartDate as Date).diff(dayjs(b.estStartDate as Date))
      );


    if (preScheduled.length === 0) {
      setCurrentEvents([]);
      return;
    }

    const processed: EventInput[] = [];
    let prevEnd: Dayjs | null = null;
    preScheduled.forEach(order => {
      const start = dayjs(order.estStartDate as Date);
      const end = dayjs(order.estFinishDate as Date);
      const duration = calculateWorkingMinutesBetween(start, end, dailyWorkingHours, defaultWorkingHours);
      let tentativeStart = prevEnd
        ? isWithinWorkingHours(prevEnd, dailyWorkingHours, defaultWorkingHours)
          ? prevEnd
          : findNextWorkingTime(
            prevEnd,
            dailyWorkingHours,
            defaultWorkingHours
          )
        : isWithinWorkingHours(start, dailyWorkingHours, defaultWorkingHours)
          ? start
          : findNextWorkingTime(start, dailyWorkingHours, defaultWorkingHours);
      if (order.offtimeduration && order.offtimestartdate && order.offtimeenddate) {
        const offtimeduration = order.offtimeduration;
        let offStart = dayjs(order.offtimestartdate as Date);
        // If the previous event ended later than the planned offtime start,
        // begin the offtime after the previous event
        if (prevEnd && !prevEnd.isSame(offStart)) {
          offStart = prevEnd
        }

        const offtimeSegments = splitEventIntoWorkingHours(
          offStart,
          offtimeduration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: `${order.id}-offtime`,
            title: createOfftimeTitle(
              order.offtimeduration,
              order.panelcode,
              order.prevpanelcode,
            ),
            color: "gray",
            extendedProps: {
              isOfftime: true,
              prevId: order.previd?.toString(),
              currId: order.id.toString(),
              prevpanelcode: order.prevpanelcode,
              panelcode: order.panelcode,
              offtimeduration: order.offtimeduration,
            },
          }
        );

        // Manually apply split segment start/end to their extendedProps
        offtimeSegments.forEach(seg => {
          seg.extendedProps = {
            ...seg.extendedProps,
            offtimeStartDate: dayjs(seg.start as Date).format('YYYY-MM-DDTHH:mm:ssZ'),
            offtimeEndDate: dayjs(seg.end as Date).format('YYYY-MM-DDTHH:mm:ssZ'),
          };
        });

        processed.push(...offtimeSegments);
        const lastSegment = offtimeSegments[offtimeSegments.length - 1];
        prevEnd = dayjs(lastSegment.end as Date);
        tentativeStart = isWithinWorkingHours(prevEnd, dailyWorkingHours, defaultWorkingHours)
          ? prevEnd
          : findNextWorkingTime(prevEnd, dailyWorkingHours, defaultWorkingHours);
      }
      duration ? duration : totalTimeByOrderId
      const segments = splitEventIntoWorkingHours(
        start,
        duration,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: String(order.id),
          title: `${order.pporderno} - ${order.panelcode}`,
          start: order.estStartDate,
          end: order.estFinishDate,
          color: statusColorMap[order.status ?? 0] || "gray",
          extendedProps: {
            panelcode: order.panelcode,
            status: order.status,
            tooltip: `${order.pporderno ?? ""}
             - ${order.panelcode ?? ""}
             κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"} 
             εκτ. ωρα έναρξης${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
              εκτ. ωρα λήξης${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
              θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}
              `,

          },
        }
      );
      processed.push(...segments);
      prevEnd = dayjs(segments[segments.length - 1].end as Date) ?? Date();

    });
    const mergedEvents = mergeSameDayEventParts(processed);

    setCurrentEvents(mergedEvents);
    manualSyncRef.current = false;
  }
    , [unscheduledorders, dailyWorkingHours, defaultWorkingHours, manualSyncRef]);


  const totalTime = useMemo(() => calculateTotalTime(orderLines), [orderLines]);
  const totalMeter = useMemo(() => calculateTotalLength(orderLines), [orderLines]);

  const finishedEvents: EventInput[] = useMemo(() => {
    const events: EventInput[] = [];
    const sorted = [...finished].sort((a, b) =>
      dayjs(a.startDateDatetime as Date).diff(dayjs(b.startDateDatetime as Date))
    );

    sorted.forEach(order => {
      if (!order.startDateDatetime) return;

      const theoreticalTime =
        order.time != null
          ? dayjs.duration(order.time, "minutes").format("H[h] m[m]")
          : "0h 0m";
      const status = order.status ?? -1;
      const color = statusColorMap[status] || "gray";

      let start = dayjs(order.startDateDatetime as Date);
      if (!isWithinWorkingHours(start, dailyWorkingHours, defaultWorkingHours)) {
        start = findNextWorkingTime(start, dailyWorkingHours, defaultWorkingHours);
      }

      const duration =
        (order.finishDateDatetime
          ? calculateWorkingMinutesBetween(
            start,
            dayjs(order.finishDateDatetime as Date),
            dailyWorkingHours,
            defaultWorkingHours
          )
          : 0);



      if (order.offtimeduration && order.offtimestartdate && order.offtimeenddate) {
        const offStart = dayjs(order.offtimestartdate as Date);
        const offSegments = splitEventIntoWorkingHours(
          offStart,
          order.offtimeduration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: `${order.id}-offtime`,
            title: createOfftimeTitle(
              order.offtimeduration,
              order.code,
              order.prevpanelcode,
            ),
            color: "gray",
            extendedProps: {
              isOfftime: true,
              prevId: order.previd?.toString(),
              currId: order.id.toString(),
              prevpanelcode: order.prevpanelcode,
              panelcode: order.code,
              offtimeduration: order.offtimeduration,
              offtimeStartDate: order.offtimestartdate,
              offtimeEndDate: order.offtimeenddate,
            },
          }
        );
        events.push(...offSegments);
      }


      const segments = splitEventIntoWorkingHours(
        start,
        duration,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: String(order.id),
          title: `${order.code} - θεωρητικός χρόνος ${theoreticalTime}`,
          color,
          extendedProps: {
            panelcode: order.code,
            status: order.status,
            totalMeter: order.totalMeter,
            speed: order.speed,
            tooltip:
              `${order.pporderno} - ${order.code}\n - μήκος παραγγελίας: ${(order.totalMeter ?? 0).toFixed(2) || 0}m\n` +
              `Θεωρητικός χρόνος: ${theoreticalTime} \n` +
              `Ημερομηνία έναρξης: ${order.startDateDatetime ? dayjs(order.startDateDatetime).format("YYYY-MM-DD HH:mm") : "—"} \n` +
              `Ημερομηνία ληξης: ${order.finishDateDatetime ? dayjs(order.finishDateDatetime).format("YYYY-MM-DD HH:mm") : "—"} \n` +
              `κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}`,
          },
        }
      );

      events.push(...segments);
    });

    return events;
  }, [finished, dailyWorkingHours, defaultWorkingHours]);


  const totalMinutes = totalTime.hours * 60 + totalTime.minutes;



  const dropHandler = useMemo(() =>
    handleDropFactory(
      currentEvents,
      finishedEvents,
      totalMinutes,
      dailyWorkingHours,
      defaultWorkingHours,
      setCurrentEvents,
      droppedIdsRef



    ), [
    currentEvents,
    finishedEvents,
    totalMinutes,
    dailyWorkingHours,
    defaultWorkingHours,
    setCurrentEvents,
    droppedIdsRef
  ]);

  const nonWorkingTimeBackgroundEvents = useMemo(() => {
    return generateNonWorkingHourBackgroundEvents(dailyWorkingHours, defaultWorkingHours);
  }, [dailyWorkingHours, defaultWorkingHours]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
    refetchFinished();
    console.log(currentEvents)

  };
  const handleCurrentEventToggle = async (): Promise<EventInput[]> => {
    const chainedEvents = chainEventsSequentially(currentEvents, dailyWorkingHours, defaultWorkingHours);

    await handleUpdateAllEvents({
      events: chainedEvents,
      dailyWorkingHours,
      defaultWorkingHours,
      updatePporder: handleUpdatePporder,
    });



    console.log("inside handle toggle", chainedEvents);

    return chainedEvents;
  };





  const handleUpdateAll = async () => {
    await handleUpdateAllEvents({
      events: currentEvents,
      dailyWorkingHours,
      defaultWorkingHours,
      updatePporder: handleUpdatePporder,

    });
  };


  // useResourceSubscription({
  //   resource: "pporders",
  //   query: print(PPORDER_UPDATED_SUBSCRIPTION),
  //   variables: {},
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     const updatedOrder = subscriptionData.data.pporderUpdated;
  //     if (!updatedOrder) return;

  //     // Update the currentEvents with the new order data
  //     setCurrentEvents(prevEvents => {
  //       return prevEvents.map(event => {
  //         if (event.id === String(updatedOrder.id)) {
  //           return {
  //             ...event,
  //             start: updatedOrder.estStartDate ? new Date(updatedOrder.estStartDate) : null,
  //             end: updatedOrder.estFinishDate ? new Date(updatedOrder.estFinishDate) : null,
  //             extendedProps: {
  //               ...event.extendedProps,
  //               panelcode: updatedOrder.panelcode,
  //               status: updatedOrder.status,
  //             },
  //           };
  //         }
  //         return event;
  //       });
  //     });
  //   },
  // });



  return (
    <TotalTimeProvider value={{ totalTimeByOrderId }}>
      <Layout style={{ padding: 12, display: "flex", gap: 24 }}>
        <Sider width={300} style={{ background: "#fff", padding: 12 }}>
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
            totalMeter={totalMeter}
          />
          <Divider />
          <WorkingHoursPicker
            onSelectDate={(date) =>
              handleDateSelect(
                date,
                setSelectedDate,
                dailyWorkingHours,
                defaultWorkingHours,
                setTempWorkingHours,
                setWorkingHoursModalOpen
              )
            }
          />
        </Sider>
        <Content style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "120vh", // Minimum height
          maxHeight: "auto", // Maximum height
          overflow: "scroll", // Enable scrolling if content overflows
        }}>
          <div style={{ textAlign: "right", marginBottom: 8 }}>
            <Button onClick={toggleSlotDuration}>change slot duration</Button>
          </div>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <Button onClick={toggleSlotMinMax}>ολοκληρο</Button>
          </div>
          <ProductionCalendarView
            events={[
              ...finishedEvents,
              ...currentEvents,
              ...nonWorkingTimeBackgroundEvents,
            ]}
            weekendsVisible={weekendsVisible}
            dropHandler={dropHandler}
            onEventClick={handleEventClick}
            onDayHeaderClick={(date) =>
              handleDateSelect(
                date,
                setSelectedDate,
                dailyWorkingHours,
                defaultWorkingHours,
                setTempWorkingHours,
                setWorkingHoursModalOpen
              )
            }
            slotDuration={slotDuration}
            slotMinTime={slotMinTime}
            slotMaxTime={slotMaxTime}
          />
        </Content>
        <EditEventModal
          open={editModalOpen}
          event={selectedEvent}
          editStart={editStart}
          editEnd={editEnd}
          onCancel={() => setEditModalOpen(false)}
          onDelete={async () => {
            if (!selectedEvent) return;

            // Optional: persist the reset to your backend
            console.log("selectedEvent.id", (selectedEvent.id as string).split('-')[0]);
            handleUnschedulePporder(selectedEvent.id, selectedEvent.extendedProps?.previd)
            // const updatedevents= await handleCurrentEventToggle();
            // setCurrentEvents(updatedevents);

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
          onOk={() => handleSaveWorkingHours(
            selectedDate,
            tempWorkingHours,
            dailyWorkingHours,
            defaultWorkingHours,
            setDailyWorkingHours,
            setCurrentEvents,
            setWorkingHoursModalOpen,
            handlePersistWorkingHours,

          )}
        />
        <UpdateAllButton onClick={() => handleUpdateAll()} />
        <SetCurrentEventsButton events={[

          ...currentEvents,
        ]} />
      </Layout>
    </TotalTimeProvider>
  );
};

export default ProductionCalendar;