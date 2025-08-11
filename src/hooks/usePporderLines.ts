import { useList } from "@refinedev/core";
import { GET_PPORDERLINE2 } from "@/graphql/queries";
import { PPOrderLine } from "@/pages/ProductionPlanning/productioncalendartypes";

export const usePporderLines = (ppordernos: string | null) =>
  useList<PPOrderLine>({
    resource: "pporderlines2",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: GET_PPORDERLINE2,
    },
  filters: ppordernos
      ? [{ field: "ppordernos", operator: "in", value: ppordernos }]
      : [],
    queryOptions: {
      enabled: !!ppordernos,
    },
  });