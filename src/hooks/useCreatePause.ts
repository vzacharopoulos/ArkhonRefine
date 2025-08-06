import { useCustomMutation } from "@refinedev/core";
import { CREATE_COMPLETE_PAUSE } from "@/graphql/queries";
import { PanelMachinePause } from "@/pages/ProductionPlanning/productioncalendartypes";

interface CreatePauseInput {
  pporderid: number;
  pausestartdate: Date;
  pauseenddate: Date; // or number, depending on your actual API
  pauseduration: number;
  pausecomment?: string;
}

export const useCreatePause = () => {
  const { mutate, isLoading, error } = useCustomMutation<PanelMachinePause>();

  const createPause = (input: CreatePauseInput): Promise<PanelMachinePause> => {
    return new Promise((resolve, reject) => {
      mutate({
        url: "",
        method: "post",
        values: { input },
        meta: {
          gqlMutation: CREATE_COMPLETE_PAUSE,
          variables: { input },
        },
      }, {
        onSuccess: (data) => resolve(data?.data),
        onError: (err) => reject(err),
      });
    });
  };

  return { createPause, isLoading, error };
};
