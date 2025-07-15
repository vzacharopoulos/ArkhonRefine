import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCustom, useResourceSubscription, useUpdate } from "@refinedev/core";
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
import { STATUS_MAP, statusColorMap, StatusTag } from "@/utilities/map-status-id-to-name";
import duration from "dayjs/plugin/duration";
import { finishedPporders, PPOrder, PPOrderLine, WorkingHoursConfig } from "./productioncalendartypes";
import { Sidebar } from "./sidebar";
import { EditOutlined } from "@ant-design/icons";
import isBetween from 'dayjs/plugin/isBetween';
import { addWorkingMinutes, addWorkingMinutesDynamic, calculateWorkingMinutesBetween, findLastEventEndTime, findNextWorkingTime, generateNonWorkingHourBackgroundEvents, getWorkingHours, isWithinWorkingHours, mergeSameDayEventParts, splitEventIntoWorkingHours } from "./dateschedule-utils";
import { calculateTotalTime, EventTooltip } from "./event-utils";
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
  const handleUpdatePporder = async (
    id: number,
    startDate: Date,
    finishDate: Date,
    extraValues?: Partial<PPOrder>
  ) => {
    try {
      await updatePporder({
        resource: "pporders",
        id,
        values: {
          // Wrap in 'input' object
          estStartDate: startDate ? startDate.toISOString() : null,
          estFinishDate: finishDate ? finishDate.toISOString() : null,
          status: 14, // Default to status 2 if not provided

          ...extraValues,
        },
        meta: {
          gqlMutation: UPDATE_PPORDERS,
        },
      });
    } catch (error) {
      console.error("Η εντολή δεν ενημερώθηκε:", error);
    }
  };

  const handleUnschedulePporder = async (
    id?: string,
    extraValues?: Partial<PPOrder>
  ) => {
    const allPartsId = String(id).split('-')[0];
    const numerified = Number(allPartsId);

    const currentOrder = orders.find(order => order.id === numerified);
    if (!currentOrder) return;

    // Find the next order in the chain
    const nextOrder = orders.find(order => order.previd === numerified);

    try {
      // 1. Clear current order
      await updatePporder({
        resource: "pporders",
        id: numerified,
        values: {
          estStartDate: null,
          estFinishDate: null,
          status: 1,
          offtimeduration: null,
          offtimestartdate: null,
          offtimeenddate: null,
          previd: null,
          prevpanelcode: null,
          ...extraValues,
        },
        meta: {
          gqlMutation: UPDATE_PPORDERS,
        },
      });

      // 2. If there's a next order, transfer offtime data to it
      if (nextOrder) {
        const previousCode = currentOrder.prevpanelcode?.replace(/-001$/, "");
        const currentCode = nextOrder.panelcode?.replace(/-001$/, "");
        const offtimeduration = offTimeMap?.[previousCode ?? 0]?.[currentCode ?? 0] ?? 30;
        console.log(currentOrder.prevpanelcode)
        console.log(nextOrder.panelcode)
        console.log(offtimeduration)

        await updatePporder({
          resource: "pporders",
          id: nextOrder.id,
          values: {
            offtimeduration: offtimeduration ?? null,
            offtimestartdate: currentOrder.offtimestartdate ?? null,
            offtimeenddate: currentOrder.offtimeenddate ?? null,
            previd: currentOrder.previd ?? null,
            prevpanelcode: currentOrder.prevpanelcode ?? null,
          },
          meta: {
            gqlMutation: UPDATE_PPORDERS,
          },
        });
      }
    } catch (error) {
      console.error("Η εντολή δεν ενημερώθηκε:", error);
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
    5: { startHour: 6, startMinute: 0, endHour: 23, endMinute: 59, workingDays: [1, 2, 3, 4, 5, 6] }, // Friday (ends at midnight)
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

  useEffect(() => {

    if (!wsClient) return;
    console.log("subscription srartd")

    const dispose = wsClient.subscribe(

      { query: print(PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION) },
      {
        next: async (value: any) => {
          console.log("Subscription value received:", value);
          const line = value?.data?.pporderlineStatusChanged;
          console.log("line", line)
          if (line.status != 2) {
            return
          }
          else {

            const orderId = line?.pporders?.id;
            if (orderId) {
              await updatePporder({
                resource: "pporders",
                id: orderId,
                values: { status: 2 },
                meta: { gqlMutation: UPDATE_PPORDERS },
              });
              message.success("Παραγγελία ενημερώθηκε");
              console.log("useffect srartd")
            }
          }
        },
        error: (err) => console.error(err),
        complete: () => { },
      }

    );

    return () => {
      dispose();
    };
  }, [updatePporder]);

  useEffect(() => {
    if (!wsClient) return;

    const dispose = wsClient.subscribe(
      { query: print(PPORDER_UPDATED_SUBSCRIPTION) },
      {
        next: () => {
          refetchPporders();
        },
        error: (err) => console.error(err),
        complete: () => { console.log("refetched") },
      }
    );

    return () => {
      dispose();
    };
  }, [refetchPporders]);

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

  const unscheduledorders = useMemo(
    () =>
      orders.filter(order => {
        if (order.status == null || ![1, 2, 3, 14].includes(order.status)) return false;
        const recentThreshold = getlast80days();
        return order.createDate && dayjs(order.createDate).isAfter(recentThreshold);
      }),
    [orders]
  );






  useEffect(() => { // renders currentEvents from unscheduled orders whenever orders change
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
        console.log("unupdated offStart", offStart)
        if (prevEnd && !prevEnd.isSame(offStart)) {
          offStart = prevEnd
        }
        console.log("offStart", offStart)
        const offtimeSegments = splitEventIntoWorkingHours(
          offStart,
          offtimeduration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: `${order.id}-offtime`,
            title: "προετοιμασία μηχανής",
            color: "gray",
            extendedProps: {
              isOfftime: true,
              prevId: order.previd?.toString(),
              currId: order.id.toString(),
              prevpanelcode: order.prevpanelcode,
              offtimeduration: order.offtimeduration,
            },
          }
        );

        // Manually apply split segment start/end to their extendedProps
        offtimeSegments.forEach(seg => {
          seg.extendedProps = {
            ...seg.extendedProps,
            offtimeStartDate: (seg.start as Date).toISOString(),
            offtimeEndDate: (seg.end as Date).toISOString(),
          };
        });

        processed.push(...offtimeSegments);
        const lastSegment = offtimeSegments[offtimeSegments.length - 1];
        prevEnd = dayjs(lastSegment.end as Date);
        tentativeStart = isWithinWorkingHours(prevEnd, dailyWorkingHours, defaultWorkingHours)
          ? prevEnd
          : findNextWorkingTime(prevEnd, dailyWorkingHours, defaultWorkingHours);
      }

      const segments = splitEventIntoWorkingHours(
        tentativeStart,
        duration,
        dailyWorkingHours,
        defaultWorkingHours,
        {
          id: String(order.id),
          title: `${order.pporderno} - ${order.panelcode}`,
          color: statusColorMap[order.status ?? 0] || "gray",
          extendedProps: {
            panelcode: order.panelcode,
            status: order.status,
            tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}\nκατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}`,
          },
        }
      );

      processed.push(...segments);
      prevEnd = dayjs(segments[segments.length - 1].end as Date);
      console.log("prevend", prevEnd)

    });
    const mergedEvents = mergeSameDayEventParts(processed);
    setCurrentEvents(mergedEvents);
    initialSyncRef.current = true;
  }
    , [unscheduledorders, dailyWorkingHours, defaultWorkingHours]);


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
        panelcode: order.code,
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
    console.log(currentEvents)
  };

  const handleCurrentEventToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleUpdateAllEvents = async (eventsArg?: EventInput[]) => {
    const rawEvents = eventsArg ?? currentEvents;

    if (!eventsArg) {
      setCurrentEvents(rawEvents);
    }

    const grouped: Record<string, EventInput[]> = {};
    const offInfo: Record<string, Partial<PPOrder>> = {};

    // Process all events and group them (similar to handleDrop logic)
    rawEvents.forEach(ev => {
      if (!ev.id || !ev.start || !ev.end) return;

      const idStr = ev.id.toString();

      // Handle offtime events - use the already split segments from handleDrop
      if (ev.extendedProps?.isOfftime) {
        const currId = ev.extendedProps.currId;
        const strPrevId = ev.extendedProps.prevId?.toString();
        const prevId = strPrevId?.split('-part-')[0];
        const prevPanelCode = ev.extendedProps.prevpanelcode;

        if (currId) {
          console.log("currId", currId);
          const currIdStr = currId.toString();

          // If this is the first offtime segment for this currId, initialize offInfo
          if (!offInfo[currIdStr]) {
            offInfo[currIdStr] = {
              previd: Number(prevId),
              prevpanelcode: prevPanelCode,
              offtimeduration: ev.extendedProps.offtimeduration,
              // Use the individual segment's start/end from extendedProps (set by handleDrop)
              offtimestartdate: ev.extendedProps.offtimeStartDate
                ? new Date(ev.extendedProps.offtimeStartDate)
                : new Date(ev.start as Date),
              offtimeenddate: ev.extendedProps.offtimeEndDate
                ? new Date(ev.extendedProps.offtimeEndDate)
                : new Date(ev.end as Date),
            };
          } else {
            // Update the end date if this segment ends later
            const currentEnd = new Date(ev.extendedProps.offtimeEndDate || ev.end as Date);
            const existingEnd = offInfo[currIdStr].offtimeenddate;
            if (existingEnd && currentEnd > existingEnd) {
              offInfo[currIdStr].offtimeenddate = currentEnd;
            }
          }
        }
        return;
      }

      // Handle regular events - extract base ID (same as before)
      const baseId = idStr.includes('-part-') ? idStr.split('-part-')[0] : idStr;

      // Only process events with status 1, 2, 3, or 14
      const eventStatus = ev.extendedProps?.status;
      if (eventStatus && [1, 2, 3, 14].includes(eventStatus)) {
        if (!grouped[baseId]) {
          grouped[baseId] = [];
        }
        grouped[baseId].push(ev);
      }
    });

    console.log('Grouped events:', Object.keys(grouped));
    console.log('OffInfo:', offInfo);

    // Second pass: Process each group and update PPOrders (same as before)
    for (const [baseId, events] of Object.entries(grouped)) {
      if (events.length === 0) continue;

      const sortedEvents = events.sort((a, b) =>
        new Date(a.start as Date).getTime() - new Date(b.start as Date).getTime()
      );

      const firstStart = new Date(sortedEvents[0].start as Date);
      const lastEnd = new Date(sortedEvents[sortedEvents.length - 1].end as Date);

      const extra = offInfo[baseId];
      let updatedOffInfo = extra;
      console.log("extra", extra)
      // If there's an offtime duration, recalculate and split using working hours
      if (extra?.offtimeduration && extra.offtimestartdate) {
        const offtimeSegments = splitEventIntoWorkingHours(
          dayjs(extra.offtimestartdate),
          extra.offtimeduration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: `${baseId}-offtime`,
            title: "προετοιμασία μηχανής",
            color: "gray",
            extendedProps: {
              isOfftime: true,
              currId: baseId,
              prevId: extra.previd?.toString(),
              prevpanelcode: extra.prevpanelcode,
              offtimeduration: extra.offtimeduration,
            },
          }
        );

        const first = offtimeSegments[0];
        const last = offtimeSegments[offtimeSegments.length - 1];

        // Replace offtime range in `updatedOffInfo`
        updatedOffInfo = {
          ...updatedOffInfo,
          offtimestartdate: new Date(first.start as Date),
          offtimeenddate: new Date(last.end as Date),
        };
      }

      console.log(`Updating PPOrder ${baseId}:`, {
        start: firstStart,
        end: lastEnd,
        offInfo: updatedOffInfo,
      });

      try {
        await handleUpdatePporder(
          Number(baseId),
          firstStart,
          lastEnd,
          {
            ...updatedOffInfo,

          }

        );
        console.log(`Successfully updated PPOrder ${baseId}`);
      } catch (error) {
        console.error(`Failed to update PPOrder ${baseId}:`, error);
      }
    }

    console.log('All updates completed');
  };
/* handleStartEvent()
  const handleStartEvent = async (eventsArg?: EventInput[]) => {
    const rawEvents = eventsArg ?? currentEvents;

    if (!eventsArg&&rawEvents  !== currentEvents) {
      setCurrentEvents(rawEvents);
    }

    const grouped: Record<string, EventInput[]> = {};
    const offInfo: Record<string, Partial<PPOrder>> = {};

    // Process all events and group them (similar to handleDrop logic)
    rawEvents.forEach(ev => {
      if (!ev.id || !ev.start || !ev.end) return;

      const idStr = ev.id.toString();

      // Handle offtime events - use the already split segments from handleDrop
      if (ev.extendedProps?.isOfftime) {
        const currId = ev.extendedProps.currId;
        const strPrevId = ev.extendedProps.prevId?.toString();
        const prevId = strPrevId?.split('-part-')[0];
        const prevPanelCode = ev.extendedProps.prevpanelcode;

        if (currId) {
          console.log("currId", currId);
          const currIdStr = currId.toString();

          // If this is the first offtime segment for this currId, initialize offInfo
          if (!offInfo[currIdStr]) {
            offInfo[currIdStr] = {
              previd: Number(prevId),
              prevpanelcode: prevPanelCode,
              offtimeduration: ev.extendedProps.offtimeduration,
              // Use the individual segment's start/end from extendedProps (set by handleDrop)
              offtimestartdate: ev.extendedProps.offtimeStartDate
                ? new Date(ev.extendedProps.offtimeStartDate)
                : new Date(ev.start as Date),
              offtimeenddate: ev.extendedProps.offtimeEndDate
                ? new Date(ev.extendedProps.offtimeEndDate)
                : new Date(ev.end as Date),
            };
          } else {
            // Update the end date if this segment ends later
            const currentEnd = new Date(ev.extendedProps.offtimeEndDate || ev.end as Date);
            const existingEnd = offInfo[currIdStr].offtimeenddate;
            if (existingEnd && currentEnd > existingEnd) {
              offInfo[currIdStr].offtimeenddate = currentEnd;
            }
          }
        }
        return;
      }

      // Handle regular events - extract base ID (same as before)
      const baseId = idStr.includes('-part-') ? idStr.split('-part-')[0] : idStr;

      // Only process events with status 1, 2, 3, or 14
      const eventStatus = ev.extendedProps?.status;
      if (eventStatus && [1, 2, 3, 14].includes(eventStatus)) {
        if (!grouped[baseId]) {
          grouped[baseId] = [];
        }
        grouped[baseId].push(ev);
      }

      function getEventProperties(ev) {
        return {
          id: String(ev.id),
          title: `${ev.pporderno} - ${ev.panelcode}`,
          start: ev.start,
          end: ev.end,
          color: statusColorMap[ev.status ?? 0] || "gray",
          extendedProps: {
            panelcode: ev.panelcode,
            status: ev.status,
            tooltip: `${ev.pporderno ?? ""} - ${ev.panelcode ?? ""}\nκατάσταση: ${STATUS_MAP[ev.status || 0] || "Άγνωστη"}`,
          }
        };
      }
      const teststart = dayjs(ev.start as Date);


      // Then use it like this:
      const testsegments = splitEventIntoWorkingHours(
        teststart,
        totalMinutes,
        dailyWorkingHours,
        defaultWorkingHours,
        getEventProperties(ev)
      );
      const testfinish = dayjs(testsegments[testsegments.length - 1].end as Date);

      console.log("start", teststart, "-", "finish", testfinish)
    });

    console.log('test Grouped events:', Object.keys(grouped));
    console.log('test OffInfo:', offInfo);

  };

*/

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
              if (date) handleDateSelect(
                date,
                setSelectedDate,
                dailyWorkingHours,
                defaultWorkingHours,
                setTempWorkingHours,
                setWorkingHoursModalOpen
              );;
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
          dayHeaderContent={(arg) => {
            const date = dayjs(arg.date);

            const handleClick = (e?: React.MouseEvent) => {
              if (e) e.stopPropagation(); // prevent double trigger from button
              handleDateSelect(
                date,
                setSelectedDate,
                dailyWorkingHours,
                defaultWorkingHours,
                setTempWorkingHours,
                setWorkingHoursModalOpen
              );
            };

            return (
              <div
                onClick={handleClick}
                style={{ cursor: 'pointer', padding: '4px' }}
              >
                {arg.text}
                <Tooltip title="ώρισε εργάσιμες ώρες">
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={handleClick}
                  />
                </Tooltip>
              </div>

            )
          }}
          height="100%"
          eventDataTransform={(event) => {

            const duration = (event.duration);

            return {
              ...event,
              title:
                duration < 20
                  ? `${event.title?.slice(0, 2) || ""}...`
                  : event.title ?? "",
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
        onDelete={async () => {
          if (!selectedEvent) return;

          // Optional: persist the reset to your backend
          console.log("selectedEvent.id", (selectedEvent.id as string).split('-')[0]);
          handleUnschedulePporder(selectedEvent.id, selectedEvent.extendedProps?.previd)
          const baseId = String(selectedEvent.id).split('-')[0];
          // Remove from calendar display
          setCurrentEvents(prev =>
            prev.filter(ev => String(ev.id).split('-')[0] !== baseId)
          );

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



          /*if (selectedEvent?.id) {
            handleUpdatePporder(
              Number(selectedEvent?.id?.split('-part-')[0]),
              editStart?.toDate() as Date,
              editEnd?.toDate() as Date

            );
          } */
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
        onOk={()=>handleSaveWorkingHours(
          selectedDate,
          tempWorkingHours,
          dailyWorkingHours,
          defaultWorkingHours,
          setDailyWorkingHours,
          setCurrentEvents,
          setWorkingHoursModalOpen,

        )}
      />
      <Button
        type="primary"
        onClick={() => handleUpdateAllEvents()}
        style={{
          position: "fixed",        // stays on screen
          bottom: 24,               // distance from bottom
          right: 24,                // distance from right
          zIndex: 1000,             // make sure it's on top of calendar
        }}
      >
        ενημέρωση όλων
      </Button>
    </Layout>
  );
};

export default ProductionCalendar;