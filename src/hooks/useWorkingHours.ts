import { useCustom, useDataProvider } from "@refinedev/core";
import { GET_DAILY_WORKING_HOURS, GET_WORKING_HOURS, UPDATE_DAILY_WORKING_HOURS } from "@/graphql/queries";
import { WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";

export interface DailyWorkingHours {
  date: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  isWorkingDay: boolean;
}

export const useDailyWorkingHoursQuery = () =>
  useCustom<{ workingHoursAll: DailyWorkingHours[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_WORKING_HOURS,
    },
  });

export const useUpdateDailyWorkingHours = () => {
  const dataProvider = useDataProvider()();

  const updateDailyWorkingHours = async (
    date: string,
    values: WorkingHoursConfig,
  ) => {
    const { data } = await dataProvider.custom!<{
      updateWorkingHours: DailyWorkingHours;
    }>({
      url: "",
      method: "post",
      meta: {
        gqlMutation: UPDATE_DAILY_WORKING_HOURS,
        variables: {
          date,
          update: values,
        },
      },
    });

    return data?.updateWorkingHours;
  };

  return { updateDailyWorkingHours };
};

// Shared default working hours map (Mon-Sun)
export const DEFAULT_WORKING_HOURS: Record<number, WorkingHoursConfig> = {
  1: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
  2: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
  3: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
  4: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
  5: { startHour: 6, startMinute: 0, endHour: 23, endMinute: 59, isWorkingDay: true },
  6: { startHour: 0, startMinute: 1, endHour: 15, endMinute: 0, isWorkingDay: true },
  0: { startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, isWorkingDay: false },
};

// Optional hook wrapper for consistency with other APIs
export const useDefaultWorkingHours = () => DEFAULT_WORKING_HOURS;
