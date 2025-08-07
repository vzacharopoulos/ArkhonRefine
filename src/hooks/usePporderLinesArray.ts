import { useCustom } from "@refinedev/core";
import { GET_PPORDERLINES_OF_PPORDER } from "@/graphql/queries";
import { PPOrderLine } from "@/pages/ProductionPlanning/productioncalendartypes";

export const usePporderLinesArray = (ppordernos: string[]) =>
  useCustom<{ pporderlines2: PPOrderLine[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERLINES_OF_PPORDER,
      variables: { filter: { ppordernos: { in: ppordernos } } },
    },
    queryOptions: { enabled: ppordernos.length > 0 },
  });