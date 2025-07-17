import { useUpdate } from "@refinedev/core";
import { UPDATE_PPORDERS } from "@/graphql/queries";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";

export const useUpdatePporder = () => {
  const { mutate } = useUpdate<PPOrder>();

  const updatePporder = async (id: number, values: Record<string, any>) => {
    await mutate({
      resource: "pporders",
      id,
      values: values as any,
      meta: {
        gqlMutation: UPDATE_PPORDERS,
      },
    });
  };

  return { updatePporder };
};