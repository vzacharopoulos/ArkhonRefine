import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCustom, useDataProvider, useResourceSubscription, useUpdate } from "@refinedev/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import { GET_FINISHED_PPORDERS, GET_PPORDERS, PPORDER_UPDATED_SUBSCRIPTION, PPORDERLINE_CREATED_SUBSCRIPTION, PPORDERLINE_DELETED_SUBSCRIPTION, PPORDERLINE_STATUS_CHANGED_SUBSCRIPTION, UPDATE_PPORDERS } from "@/graphql/queries";
import adaptivePlugin from '@fullcalendar/adaptive'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import { Button, Card, Checkbox, Divider, Typography, List, Space, Layout, Menu, Tooltip, TimePicker, Modal, DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { getDateColor, getlast80days } from "@/utilities";
import { STATUS_MAP, statusColorMap, StatusTag } from "@/utilities/map-status-id-to-color";
import duration from "dayjs/plugin/duration";
import { finishedPporders, PanelMachinePause, PPOrder, PPOrderLine, WorkingHoursConfig } from "./productioncalendartypes";
import { Sidebar } from "./sidebar";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import isBetween from 'dayjs/plugin/isBetween';
import { addWorkingMinutes, addWorkingMinutesDynamic, calculateWorkingMinutesBetween, findLastEventEndTime, findNextWorkingTime, generateNonWorkingHourBackgroundEvents, getWorkingHours, isWithinWorkingHours, mergeSameDayEventParts, splitEventIntoWorkingHours } from "./dateschedule-utils";
import { calculateTotalLength, calculateTotalTime, chainEventsSequentially, deduplicateEventIds, EventTooltip } from "./event-utils";
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
import { handleUpdateAllEvents } from "./handlers/handleupdateall";
import { usePporderLines } from "@/hooks/usePporderLines";
import { createOfftimeTitle } from "./helpers/offtimetitle";
import { useDailyWorkingHoursQuery, useUpdateDailyWorkingHours } from "@/hooks/useWorkingHours";
import { useCurrentEvents } from "@/contexts/currentEventsProvider";
import { dummyEvents, SetCurrentEventsButton } from "./buttons/setcurrenteventsbutton";
import { SlotSettingsPopover } from "./buttons/slotsettingspopover";
import { co } from "@fullcalendar/core/internal-common";
import { useUpdatePause } from "@/hooks/useUpdatePause";
import PauseModal from "@/components/modals/pausemodal";
import { useCreatePause } from "@/hooks/useCreatePause";
import { useDeletePause } from "@/hooks/useDeletePause";
import { EnergySavingsLeafTwoTone } from "@mui/icons-material";
import {  usePpordersTimes } from "@/hooks/usePpordersTimes";
import { time } from "console";
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

  } = usePporders({ status: [1, 2, 3, 14] });

  const {
    data: finishedData,
    isLoading: finishedLoading,
    refetch: refetchFinished,
  } = useFinishedPporders();

  const { data: timesData } = usePpordersTimes({ status: [1, 2, 3, 14] });

  const { data: workingHoursData } = useDailyWorkingHoursQuery();

  const { updateDailyWorkingHours } = useUpdateDailyWorkingHours();

  const { updatePporder } = useUpdatePporder();
  const { updatePause } = useUpdatePause();



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

  const handleUpdatePause = async (pause: PanelMachinePause) => {
    try {
      await updatePause(pause);
    } catch (error) {
      console.error("Η παύση δεν ενημερώθηκε:", error);
    }
  };



  const handlePersistWorkingHours = async (date: Dayjs, config: WorkingHoursConfig) => {
    try {
      await updateDailyWorkingHours(date.format('YYYY-MM-DD'), config);
    } catch (error) {
      console.error(error);
    }
  };

  const { deletePause, error: deletePauseError, isLoading: isdeletingPause } = useDeletePause();



  const { createPause, error, isLoading } = useCreatePause();

  const handleSavePause = async () => {
    if (!selectedPausePpOrderId || !pauseStart || !pauseEnd) return;

    const duration = calculateWorkingMinutesBetween
      (pauseStart, pauseEnd, dailyWorkingHours, defaultWorkingHours);
    console.log("Creating pause for order:", selectedPausePpOrderId, "from", pauseStart, "to", pauseEnd, "duration:", duration);

    try {
      await createPause({
        pporderid: selectedPausePpOrderId,
        pausestartdate: pauseStart.toDate(),
        pauseenddate: pauseEnd.toDate(),
        pauseduration: duration,
        pausecomment: pauseComment,
      });

      message.success('Pause created successfully');
      setPauseModalOpen(false);
      refetchPporders(); // Refresh the pporders to include the new pause
      // Optional: Reset form state
      setPauseStart(null);
      setPauseEnd(null);
      setPauseComment("");
      setSelectedPausePpOrderId(null);

    } catch (error) {
      console.error('Failed to create pause:', error);
      message.error('Failed to create pause. Please try again.');
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
        const offtimeenddate = addWorkingMinutesDynamic(dayjs(deletedOrder.offtimestartdate), offtimeduration, dailyWorkingHours, defaultWorkingHours)

        await updatePporder(nextOrder.id, {
          offtimeduration: offtimeduration ?? null,
          estStartDate: offtimeenddate,
          estFinishDate: addWorkingMinutesDynamic(offtimeenddate, totalTimeByOrderId[nextOrder.id].totalMinutes ?? 0, dailyWorkingHours, defaultWorkingHours),
          offtimestartdate: deletedOrder.offtimestartdate ?? null,
          offtimeenddate: offtimeenddate ?? null,
          previd: deletedOrder.previd ?? null,
          prevpanelcode: deletedOrder.prevpanelcode ?? null,
        });
      }

      // Filter out the deleted order and its parts from the currentEvents
      const updatedEvents = currentEvents.filter(ev => {
        const evId = ev.id?.toString();
        return !evId?.startsWith(String(numerified));
      });

      // Optional: filter out incomplete events (without start or end)
      const validEvents = updatedEvents.filter(ev => ev.start && ev.end);
      console.log("valid events", validEvents)
      // Chain remaining events
      const chainedEvents = chainEventsSequentially(validEvents, dailyWorkingHours, defaultWorkingHours);

      console.log("Chained events after unscheduling:", chainedEvents);
      // Update the DB and state
      await handleUpdateAllEvents({
        events: chainedEvents,
        dailyWorkingHours,
        defaultWorkingHours,
        updatePporder: handleUpdatePporder,
        updatePause: handleUpdatePause,
      });

      setCurrentEvents(chainedEvents);
      message.success(`Η εντολή ${deletedOrder.pporderno} ακυρώθηκε επιτυχώς.`);
      // console.log(currentEvents)
    } catch (error) {
      console.error("Η εντολή δεν ενημερώθηκε:", error);
    }
  };



  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
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
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [pauseStart, setPauseStart] = useState<Dayjs | null>(null);
  const [pauseEnd, setPauseEnd] = useState<Dayjs | null>(null);
  const [pauseComment, setPauseComment] = useState("");
  const [selectedPausePpOrderId, setSelectedPausePpOrderId] = useState<number | null>(null);
  const [selectedPausePpOrderTitle, setSelectedPausePpOrderTitle] = useState<string | null>(null);




  const [droppedIds, setDroppedIds] = useState<Set<string>>(new Set());
  const droppedIdsRef = useRef<Set<string>>(new Set());
  const [slotDuration, setSlotDuration] = useState("00:30:00"); // 30 min default
  const [slotDurationLabel, setSlotDurationLabel] = useState("Μισό"); // "Half"

  const [slotMinTime, setSlotMinTime] = useState("05:00:00"); // Default working range
  const [slotMaxTime, setSlotMaxTime] = useState("23:00:00");
  const [slotModeLabel, setSlotModeLabel] = useState("Εργάσιμες ώρες"); // "Working hours"
  // Toggle slot size: 30min vs 60min
  const toggleSlotDuration = () => {
    setSlotDuration(prev => (prev === "00:30:00" ? "01:00:00" : "00:30:00"));
    setSlotDurationLabel(prev => (prev === "Μισό" ? "Ολόκληρο" : "Μισό"));
  };

  // Toggle visible time range: full day vs working hours
  const toggleSlotMinMax = () => {
    setSlotMinTime(prev => (prev === "05:00:00" ? "00:00:00" : "05:00:00"));
    setSlotMaxTime(prev => (prev === "23:00:00" ? "24:00:00" : "23:00:00"));
    setSlotModeLabel(prev =>
      prev === "Εργάσιμες ώρες" ? "Όλες οι ώρες" : "Εργάσιμες ώρες"
    );
  };
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
      endHour: 23,
      endMinute: 59,
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






  useEffect(() => {//when you set pauseStart, find the event that contains it and set selectedPausePpOrderId
    if (!!pauseStart && currentEvents) {
      // Find the event that contains the pause start time
      console.log("Finding containing event for pause start:", pauseStart.format("YYYY-MM-DD HH:mm:ss"));
      console.log("Current events:", currentEvents);
      const containingEvent = currentEvents.find(event => {
        if (!event.start || !event.end) return false;

        const eventStart = dayjs(event.start as Date);
        const eventEnd = dayjs(event.end as Date);

        // Check if pauseStart falls within this event's time range
        return pauseStart.isSameOrAfter(eventStart) && pauseStart.isBefore(eventEnd);
      });

      if (containingEvent) {
        // Extract the PPOrder ID from the event
        const ppOrderId = containingEvent.extendedProps?.currId ||
          containingEvent.id?.toString().split("-part-")[0];

        if (ppOrderId) {
          setSelectedPausePpOrderId(Number(ppOrderId));
          setSelectedPausePpOrderTitle(containingEvent.title || "Unknown Order");
          console.log("Found containing event:", containingEvent);
          console.log("Selected PPOrder ID:", ppOrderId);
        }
      } else {
        // No event found containing this time
        setSelectedPausePpOrderId(null);
        setSelectedPausePpOrderTitle("βαλτε παύση");
        console.log("No event found containing pause start time");
      }
    }
  }, [pauseStart]);
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
  const orderLines = orderLinesData?.data ?? [];
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
const timeRows = timesData?.data?.pporders ?? [];

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
// Build lookup by order id from the compact rows
const byId: Record<number, { totalOrderTime?: number | null; totalTtm?: number | null }> = {};
for (const r of timeRows) byId[r.id] = r as any;
console.log(timeRows)
const map: Record<number, { hours: number; minutes: number; formatted: string; totalMinutes: number; totalTtm: number }> = {};
for (const order of unscheduledorders) {
const minutes = Math.round(Number(byId[order.id]?.totalOrderTime ?? 0)) || 0;
const hours = Math.floor(minutes / 60);
const mins = minutes % 60;
map[order.id] = {
hours,
minutes: mins,
formatted: `${hours}h ${mins}m`,
totalMinutes: minutes,
totalTtm: byId[order.id]?.totalTtm || 0,
};
}
return map;
}, [timeRows, unscheduledorders, PPORDERLINE_CREATED_SUBSCRIPTION, PPORDERLINE_DELETED_SUBSCRIPTION]);



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
      let segments: EventInput[] = [];

      // CORRECTED: Handle multiple pauses
      const pauses = order.pauses || [];

      if (pauses.length > 0) {
        // Sort pauses by start date to process them chronologically
        const sortedPauses = pauses
          .filter(pause => pause.pauseduration && pause.pausestartdate && pause.pauseenddate)
          .sort((a, b) => dayjs(a.pausestartdate as Date).diff(dayjs(b.pausestartdate as Date)));

        if (sortedPauses.length > 0) {
          let currentStart = start;

          sortedPauses.forEach((pause, index) => {
            const pauseStart = dayjs(pause.pausestartdate as Date);
            const pauseEnd = dayjs(pause.pauseenddate as Date);

            // Create work segment before this pause
            if (currentStart.isBefore(pauseStart)) {
              const beforeDuration = calculateWorkingMinutesBetween(
                currentStart,
                pauseStart,
                dailyWorkingHours,
                defaultWorkingHours,
              );

              const beforeSegments = splitEventIntoWorkingHours(
                currentStart,
                beforeDuration,
                dailyWorkingHours,
                defaultWorkingHours,
                {
                  id: `${order.id}-work-${index}`,
                  title: `${order.pporderno} - ${order.panelcode}`,
                  color: statusColorMap[order.status ?? 0] || "gray",
                  extendedProps: {
                    ...order,
                    panelcode: order.panelcode,
                    status: order.status,
                    tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""} (Part ${index + 1})
                    κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
                    εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
                    εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
                    θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
                  },
                },
              );
              segments.push(...beforeSegments);
            }

            // Create pause segment
            const pauseSegments = splitEventIntoWorkingHours(
              pauseStart,
              pause.pauseduration || 0,
              dailyWorkingHours,
              defaultWorkingHours,
              {
                id: `${order.id}-pause-${index}`,
                start: pauseStart.toDate(),
                end: pauseEnd.toDate(),
                title: `παυση ${index + 1}, ${pause.pausecomment}`,
                color: "orange",
                extendedProps: {
                  isPause: true,
                  pauseid: pause.id,
                  currId: order.id.toString(),
                  pauseduration: pause.pauseduration,
                  pausestartdate: dayjs(pauseStart).format('YYYY-MM-DDTHH:mm:ssZ'),
                  pauseenddate: dayjs(pauseEnd).format('YYYY-MM-DDTHH:mm:ssZ'),
                  tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""} (Pause ${index + 1})
                  σχολιο: ${pause.pausecomment || "—"}
                  ωρα έναρξης: ${dayjs(pause.pausestartdate).format("YYYY-MM-DD HH:mm") || "—"}
                  ωρα λήξης: ${dayjs(pause.pauseenddate).format("YYYY-MM-DD HH:mm") || "—"}
                  χρόνος: ${pause.pauseduration || "0"} Λεπτά`,
                },
              },
            );
            segments.push(...pauseSegments);

            // Update current start for next iteration
            currentStart = pauseEnd;
          });

          // Create final work segment after all pauses
          if (currentStart.isBefore(end)) {
            const afterDuration = calculateWorkingMinutesBetween(
              currentStart,
              end,
              dailyWorkingHours,
              defaultWorkingHours,
            );

            const afterSegments = splitEventIntoWorkingHours(
              currentStart,
              afterDuration,
              dailyWorkingHours,
              defaultWorkingHours,
              {
                id: `${order.id}-work-final`,//this is important due to deduplicateeventids
                title: `${order.pporderno} - ${order.panelcode}`,
                color: statusColorMap[order.status ?? 0] || "gray",
                extendedProps: {
                  ...order,
                  panelcode: order.panelcode,
                  status: order.status,
                  tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""} (Final Part)
                  κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
                  εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
                  εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
                  θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
                },
              },
            );
            segments.push(...afterSegments);
          }
        } else {
          // No valid pauses, create single work segment
          segments = splitEventIntoWorkingHours(
            start,
            duration,
            dailyWorkingHours,
            defaultWorkingHours,
            {
              id: String(order.id),
              title: `${order.pporderno} - ${order.panelcode}`,
              color: statusColorMap[order.status ?? 0] || "gray",
              extendedProps: {
                ...order,
                panelcode: order.panelcode,
                status: order.status,
                tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}
                κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
                εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
                εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
                θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
              },
            }
          );
        }
      } else {
        // No pauses, create single work segment
        segments = splitEventIntoWorkingHours(
          start,
          duration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: String(order.id),
            title: `${order.pporderno} - ${order.panelcode}`,
            color: statusColorMap[order.status ?? 0] || "gray",
            extendedProps: {
              ...order,
              panelcode: order.panelcode,
              status: order.status,
              tooltip: `${order.pporderno ?? ""} - ${order.panelcode ?? ""}
              κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}
              εκτ. ωρα έναρξης: ${dayjs(order.estStartDate).format("YYYY-MM-DD HH:mm") || "—"}
              εκτ. ωρα λήξης: ${dayjs(order.estFinishDate).format("YYYY-MM-DD HH:mm") || "—"}
              θεωρητικός χρόνος: ${totalTimeByOrderId[order.id]?.formatted || "0h 0m"}`,
            },
          }
        );
      }

      const deduplicatedSegments = deduplicateEventIds(segments);
      mergeSameDayEventParts(deduplicatedSegments);
      processed.push(...deduplicatedSegments);
      prevEnd = dayjs(deduplicatedSegments[deduplicatedSegments.length - 1].end as Date) ?? dayjs();
    });

    setCurrentEvents(processed);
    manualSyncRef.current = false;
  }, [unscheduledorders, dailyWorkingHours, defaultWorkingHours, manualSyncRef]);


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


      let segments: EventInput[] = [];
      const pause = order.pauses?.[0];
      if (
        pause?.pauseduration &&
        pause.pausestartdate &&
        pause.pauseenddate
      ) {
        const pauseStart = dayjs(pause.pausestartdate as Date);
        const pauseEnd = dayjs(pause.pauseenddate as Date);
        const beforeDuration = calculateWorkingMinutesBetween(
          start,
          pauseStart,
          dailyWorkingHours,
          defaultWorkingHours,
        );
        const afterDuration = calculateWorkingMinutesBetween(
          pauseEnd,
          dayjs(order.finishDateDatetime as Date),
          dailyWorkingHours,
          defaultWorkingHours,
        );
        const beforeSegments = splitEventIntoWorkingHours(
          start,
          beforeDuration,
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
            },
          },
        );
        const pauseSegments = splitEventIntoWorkingHours(
          pauseStart,
          pause.pauseduration,
          dailyWorkingHours,
          defaultWorkingHours,
          {
            id: `${order.id}-pause`,
            title: `pause`,
            color: "orange",
            extendedProps: {
              isPause: true,
              currId: order.id.toString(),
              pauseduration: pause.pauseduration,
              pausestartdate: dayjs(pauseStart).format('YYYY-MM-DDTHH:mm:ssZ'),
              pauseenddate: dayjs(pauseEnd).format('YYYY-MM-DDTHH:mm:ssZ'),
            },
          },
        );
        const afterSegments = splitEventIntoWorkingHours(
          pauseEnd,
          afterDuration,
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
            },
          },
        );
        segments = [...beforeSegments, ...pauseSegments, ...afterSegments];
      } else {
        segments = splitEventIntoWorkingHours(
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
          },
        );
      }
      events.push(...segments);
    });

    return events;
  }, [finished, dailyWorkingHours, defaultWorkingHours]);





  const dropHandler = useMemo(() =>
    handleDropFactory(
      currentEvents,
      finishedEvents,
      dailyWorkingHours,
      defaultWorkingHours,
      setCurrentEvents,
      droppedIdsRef,
      totalTimeByOrderId
    ), [
    currentEvents,
    finishedEvents,
    dailyWorkingHours,
    defaultWorkingHours,
    setCurrentEvents,
    droppedIdsRef,
    totalTimeByOrderId
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
      updatePause: handleUpdatePause,
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
      updatePause: handleUpdatePause,

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
            setPauseModalOpen={setPauseModalOpen}
            onSelectOrder={(id) => {
              setSelectedOrderId(id);
              const order = unscheduledorders.find((o) => o.id === id);
              setSelectedPporderno(order?.pporderno || null);
            }}
            orderLines={orderLines}
            orderLinesLoading={orderLinesLoading}
            totalOrderTime={totalTimeByOrderId[selectedOrderId ?? 0] || "0h 0m"}
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
          <div style={{
            display: "flex", alignItems: "start", gap: 10, marginBottom: 16, marginLeft: 530
          }}>

            <Checkbox checked={weekendsVisible} onChange={handleWeekendsToggle}>
              με/χωρίς σ/κ
            </Checkbox>


            <Checkbox checked={weekendsVisible} onChange={handleCurrentEventToggle}>
              βάλτες ξανά σε σειρά
              <ExclamationCircleOutlined style={{ color: "#ff4d4f", marginLeft: 5 }} />

            </Checkbox>

            <SlotSettingsPopover
              slotDurationLabel={slotDurationLabel}
              toggleSlotDuration={toggleSlotDuration}
              slotModeLabel={slotModeLabel}
              toggleSlotMinMax={toggleSlotMinMax}
            />
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
          onCancel={() => {
            setEditModalOpen(false)
            console.log("Deleting pause event:", selectedEvent?.id);


          }

          }
          onDelete={async () => {
            if (!selectedEvent) return;
            if (selectedEvent.extendedProps?.isPause === true) {
              console.log("Deleting pause event:", selectedEvent.id);
              const success = await deletePause(Number(selectedEvent.extendedProps.pauseid));
              //  await updatePporder(selectedEvent.extendedProps?.currId,
              //      {
              //        estFinishDate: selectedEvent.extendedProps.pauseduration.diff(selectedEvent.end),

              //   });
              // Step 1: Get relevant events
              const relatedEvents = currentEvents.filter(ev =>
                ev.extendedProps?.currId === selectedEvent.extendedProps?.currId
              );

              // Step 2: Find the latest event based on end date

              const lastEvent = relatedEvents.reduce<EventInput | null>((latest, ev) =>
                !latest || new Date(ev.end as Date) > new Date(latest.end as Date) ? ev : latest
                , null);
              const pauseMin = Number(selectedEvent.extendedProps?.pauseduration ?? 0);
              const lastEnd = lastEvent?.end ? dayjs(lastEvent.end as Date) : null;
              // Step 3: Calculate new estFinishDate
              const newEstFinishDate = (pauseMin > 0 && lastEnd)
                ? lastEnd.subtract(pauseMin, "minute")   // returns a dayjs
                : null;
              // Step 4: Update pporder if all good
              if (success && newEstFinishDate) {
                await updatePporder(Number(selectedEvent.extendedProps?.currId), {
                  estFinishDate: newEstFinishDate,
                });
              }







              if (success) {
                message.success("Pause deleted");
                refetchPporders();
                setEditModalOpen(false);
                // Optionally update currentEvents
              } else {
                message.error("Failed to delete pause");
              }
              return;
            }

            // Optional: persist the reset to your backend
            console.log("selectedEvent.id", (selectedEvent.id as string));
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
        <PauseModal
          dailyWorkingHours={dailyWorkingHours}
          defaultWorkingHours={defaultWorkingHours}
          selectedPausePpOrderId={selectedPausePpOrderId}
          selectedPausePpOrderTitle={selectedPausePpOrderTitle}
          open={pauseModalOpen}
          start={pauseStart}
          end={pauseEnd}
          comment={pauseComment}
          onChangeStart={setPauseStart}
          onChangeEnd={setPauseEnd}
          onChangeComment={setPauseComment}
          onCancel={() => setPauseModalOpen(false)}
          onOk={handleSavePause}
        />

        <UpdateAllButton onClick={() => handleUpdateAll()} />
        {/* <SetCurrentEventsButton events={[

          ...currentEvents,
        ]} /> */}
      </Layout>
    </TotalTimeProvider>
  );
};

export default ProductionCalendar;
