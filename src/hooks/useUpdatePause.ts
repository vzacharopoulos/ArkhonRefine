import { useDataProvider } from "@refinedev/core";
import { UPDATE_PAUSE } from "@/graphql/queries";
import { PanelMachinePause } from "@/pages/ProductionPlanning/productioncalendartypes";

export const useUpdatePause = () => {
  const dataProvider = useDataProvider()();

  const updatePause = async (input: PanelMachinePause) => {
    await dataProvider.custom!<{ updatePauseDetails: PanelMachinePause }>({
      url: "",
      method: "post",
      meta: {
        gqlMutation: UPDATE_PAUSE,
        variables: { input },
      },
    });
  };

  return { updatePause };
};