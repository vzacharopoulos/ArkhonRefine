import { Dayjs } from "dayjs";
import { WorkingHoursConfig } from "./productioncalendartypes";

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