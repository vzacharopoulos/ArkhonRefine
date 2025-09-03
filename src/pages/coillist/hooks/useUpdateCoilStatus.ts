// hooks/useUpdateCoilStatus.ts
import { useDataProvider, useInvalidate, useNotification } from "@refinedev/core";
import { UPDATE_COIL_STATUS } from "@/graphql/queries";

type UpdateCoilStatusResponse = {
  updateCoilStatus: {
    id: number;
    coilno?: string | null;
    status?: { id: number; name?: string | null; nameGrp?: string | null } | null;
  };
};

export const useUpdateCoilStatus = () => {
  const dataProvider = useDataProvider()();
  const invalidate = useInvalidate();
  const { open } = useNotification();

  const updateCoilStatus = async (id: number, statusId: number = 7) => {
    try {
      const res = await dataProvider.custom!<UpdateCoilStatusResponse>({
        url: "",
        method: "post",
        meta: {
          gqlMutation: UPDATE_COIL_STATUS,
          variables: { id, statusId },
        },
      });

      // Invalidate detail + lists that show coils
      await Promise.all([
        invalidate({ resource: "coil", invalidates: ["detail", "list"] }),
        invalidate({ resource: "availableCoils", invalidates: ["list"] }),
        invalidate({ resource: "expectedCoils", invalidates: ["list"] }),
      ]);

      open?.({
        type: "success",
        message: "Ενημέρωση",
        description: "Η κατάσταση ενημερώθηκε με επιτυχία.",
      });

      return res?.data?.updateCoilStatus;
    } catch (e: any) {
      open?.({
        type: "error",
        message: "Σφάλμα ενημέρωσης",
        description: e?.message ?? "Αποτυχία ενημέρωσης κατάστασης.",
      });
      throw e;
    }
  };

  return { updateCoilStatus };
};
