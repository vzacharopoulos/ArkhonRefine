import { useDataProvider } from "@refinedev/core";
import gql from "graphql-tag";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const FINISH_ORDER_MUTATION = gql`
  mutation FinishOrder($pporderno: String!, $finishTime: DateTime) {
    finishOrder(pporderno: $pporderno, finishTime: $finishTime) {
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

export const useFinishOrder = () => {
  const dataProvider = useDataProvider()();

  const finishOrder = async (pporderno: string, finishTime?: Date) => {
    // If no finishTime provided, use current time in Athens timezone
    const timeToSend = finishTime 
      ? dayjs(finishTime).tz('Europe/Athens').toDate()
      : dayjs().tz('Europe/Athens').toDate();

    const result = await dataProvider.custom!<{ finishOrder: any }>({
      url: "",
      method: "post",
      meta: {
        gqlMutation: FINISH_ORDER_MUTATION,
        variables: { 
          pporderno,
          finishTime: timeToSend
        },
      },
    });
    
    return result.data.finishOrder;
  };

  return { finishOrder };
};