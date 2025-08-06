import { useState } from "react";
import { useDataProvider } from "@refinedev/core";
import { DELETE_MACHINE_PAUSE } from "@/graphql/queries";

export const useDeletePause = () => {
  const dataProvider = useDataProvider()();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deletePause = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await dataProvider.custom!<{ deleteMachinePause: boolean }>({
        url: "",
        method: "post",
        meta: {
          gqlMutation: DELETE_MACHINE_PAUSE,
          variables: { id },
        },
      });

      return data?.deleteMachinePause ?? false;
    } catch (err) {
      console.error("❌ Error deleting pause:", err);
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deletePause,
    isLoading,
    error,
  };
};
