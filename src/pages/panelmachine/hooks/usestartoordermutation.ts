import { useDataProvider } from "@refinedev/core";
import gql from "graphql-tag";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const START_ORDER_MUTATION = gql`
  mutation StartOrder($pporderno: String!, $startTime: DateTime) {
    startOrder(pporderno: $pporderno, startTime: $startTime) {
      id
      pporderno
      panelcode
      status
      startDateDatetime
      finishDateDatetime
      estStartDate
      estFinishDate
    }
  }
`;

export const useStartOrder = () => {
  const dataProvider = useDataProvider()();

  const startOrder = async (pporderno: string, startTime?: Date) => {
    // If no startTime provided, use current time in Athens timezone
    const timeToSend = startTime 
      ? dayjs(startTime).tz('Europe/Athens').toDate()
      : dayjs().tz('Europe/Athens').toDate();

    const result = await dataProvider.custom!<{ startOrder: any }>({
      url: "",
      method: "post",
      meta: {
        gqlMutation: START_ORDER_MUTATION,
        variables: { 
          pporderno,
          startTime: timeToSend
        },
      },
    });
    
    return result.data.startOrder;
  };

  return { startOrder };
};