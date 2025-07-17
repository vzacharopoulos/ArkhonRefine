import { useCustom } from "@refinedev/core";
import { GET_FINISHED_PPORDERS } from "@/graphql/queries";
import { finishedPporders } from "@/pages/ProductionPlanning/productioncalendartypes";

export const useFinishedPporders = () =>
  useCustom<{ masterlengths: finishedPporders[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_FINISHED_PPORDERS,
      variables: {
        filter: { status: [4] },
      },
    },
  });
