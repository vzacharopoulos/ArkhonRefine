import { useCustom, useUpdate } from "@refinedev/core";
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
  useCustom<{ dailyWorkingHours: DailyWorkingHours[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_WORKING_HOURS,
    },
  });

export const useUpdateDailyWorkingHours = () => {
  const { mutate } = useUpdate<any>();

const updateDailyWorkingHours = async (date: string, values: WorkingHoursConfig) => {
  await mutate({
    resource: "dailyWorkingHours",
    id: date,
    values: { date, values } as any,
    meta: {
      gqlMutation: UPDATE_DAILY_WORKING_HOURS,
      variables: {
        date,
        update: values,
      },
    },
  });
};

  return { updateDailyWorkingHours };
};