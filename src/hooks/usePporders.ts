import { useCustom } from "@refinedev/core";
import { GET_PPORDERS, GET_PPORDERS_LIST } from "@/graphql/queries";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";

export const usePporders = (filter?: any) =>
  useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    
    meta: {
      gqlQuery: GET_PPORDERS,
      resource: "pporders",
      variables: {
       filter: filter || {},
      },
    },
  });

  export const usePpordersList = (filter?: any) =>
  useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    
    meta: {
      gqlQuery: GET_PPORDERS_LIST,
      resource: "pporders",
      variables: {
       filter: filter || {},
      },
    },
  });