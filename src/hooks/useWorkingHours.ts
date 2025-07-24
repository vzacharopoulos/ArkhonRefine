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