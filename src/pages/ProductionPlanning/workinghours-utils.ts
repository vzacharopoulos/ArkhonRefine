import dayjs, { Dayjs } from "dayjs";
import { WorkingHoursConfig } from "./productioncalendartypes";
import { findNextWorkingTime, isWithinWorkingHours, mergeSameDayEventParts, splitEventIntoWorkingHours } from "./dateschedule-utils";
import { EventInput } from "fullcalendar";

export const handleDateSelect = (
  date: Dayjs,
  setSelectedDate: (d: Dayjs) => void,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>,
  setTempWorkingHours: (cfg: WorkingHoursConfig) => void,
  setWorkingHoursModalOpen: (open: boolean) => void
) => {
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

export const handleSaveWorkingHours = (
      selectedDate: Dayjs | null,
  tempWorkingHours: WorkingHoursConfig,
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>,
  setDailyWorkingHours: (cfg: Record<string, WorkingHoursConfig>) => void,
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>, // Replace 'any' with your actual event type
  setWorkingHoursModalOpen: (open: boolean) => void
) => {
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
