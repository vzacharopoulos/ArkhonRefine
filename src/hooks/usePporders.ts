import { useCustom } from "@refinedev/core";
import { GET_PPORDERS } from "@/graphql/queries";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";

export const usePporders = () =>
  useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS,
    },
  });