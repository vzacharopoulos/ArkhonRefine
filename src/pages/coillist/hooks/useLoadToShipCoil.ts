// hooks/useUpdateCoilStatus.ts
import { useDataProvider, useInvalidate, useNotification, useGo } from "@refinedev/core";
import { LOAD_TO_SHIP_COIL, UPDATE_COIL_STATUS } from "@/graphql/queries";

type UpdateCoilStatusResponse = {
  updateCoilStatus: {
    id: number;
    coilno?: string | null;
    status?: { id: number; name?: string | null; nameGrp?: string | null } | null;
    shipBayNo?:number|null;
  };
};

export const UseLoadToShipCoil = () => {
  const getDataProvider = useDataProvider();
  const invalidate = useInvalidate();
  const { open } = useNotification();
  const go = useGo();

  /**
   * Updates coil status and (optionally) redirects to the coil list.
   * @param id Coil ID
   * @param statusIds New status id (default 7)
   * @param redirectAfter If true, navigate to coil list after success (default true)
   */
  const loadToShipCoil = async (id: number, statusIds: number[] = [7], shipBayNo: number, redirectAfter: boolean = true) => {
    try {
      const res = await getDataProvider().custom!<UpdateCoilStatusResponse>({
        url: "",
        method: "post",
        meta: {
          gqlMutation: LOAD_TO_SHIP_COIL,
          variables: { id, statusIds,shipBayNo },
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

      // Go to the coil list
      if (redirectAfter) {
        go({
          to: { resource: "coil", action: "list" }, // change resource if your list is named differently
          type: "replace", // or "push" if you want it in history
        });
      }

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

  return { loadToShipCoil };
};
