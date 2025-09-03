import { useCustom } from "@refinedev/core";
import { GET_PPORDERS, GET_PPORDERS_LIST } from "@/graphql/queries";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";
import type { PpordersFilterInput } from "@/graphql/schema.types";
export const usePporders = (filter?: PpordersFilterInput) =>
  useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    
    meta: {
      gqlQuery: GET_PPORDERS,
      resource: "pporders",
      variables: { filter: filter || {} as PpordersFilterInput },
    },
  });
  export const usePpordersList = (filter?: PpordersFilterInput) =>
  useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    
    meta: {
      gqlQuery: GET_PPORDERS_LIST,
      resource: "pporders",
      variables: { filter: filter || {} as PpordersFilterInput },
    },
  });