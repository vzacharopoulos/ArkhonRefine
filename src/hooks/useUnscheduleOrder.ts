import { useDataProvider } from "@refinedev/core";
import gql from "graphql-tag";

const REMOVE_ORDER_FROM_PLAN = gql`
  mutation RemoveOrderFromPlan($pporderno: String!) {
    removeOrderFromPlan(pporderno: $pporderno) {
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

export const useUnscheduleOrder = () => {
  const dataProvider = useDataProvider()();

  const unscheduleOrder = async (pporderno: string) => {
    const result = await dataProvider.custom!<{ removeOrderFromPlan: any }>({
      url: "",
      method: "post",
      meta: {
        gqlMutation: REMOVE_ORDER_FROM_PLAN,
        variables: { pporderno },
      },
    });

    return result.data.removeOrderFromPlan;
  };

  return { unscheduleOrder };
};

