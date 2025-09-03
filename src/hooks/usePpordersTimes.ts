import { useCustom } from "@refinedev/core";
import { GET_PPORDERS_TIMES } from "@/graphql/queries";
import type { PpordersFilterInput } from "@/graphql/schema.types";

 export interface PporderTimeRow {
  id: number;
  totalOrderTime?: number | null;
  totalTtm?: number | null;
}

export const usePpordersTimes = (filter?: PpordersFilterInput) =>
  useCustom<{ pporders: PporderTimeRow[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS_TIMES,
      resource: "pporders",
      variables: { filter: { lastDays: 80, ...(filter ?? {}) } },//change lastDays to 30 in prod
    },
  });


