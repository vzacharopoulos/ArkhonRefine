import { useCustom, useDataProvider } from "@refinedev/core";
import { GET_PPORDERS, GET_PPORDERS_LIST } from "@/graphql/queries";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";
import type { PpordersFilterInput, PpordersSortField, PpordersSortInput } from "@/graphql/schema.types";
import { useCallback, useMemo, useState } from "react";

interface RefetchState {
  isLoading: boolean;
  error: Error | null;
  lastSuccess: number | null;
}

export const usePporders = (filter?: PpordersFilterInput) => {
  const sorting: PpordersSortInput[] = [
    { field: 'estStartDate' as PpordersSortField, direction: 'DESC' },
  ];

  return useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS,
      resource: "pporders",
      variables: { filter: (filter || {}) as PpordersFilterInput, sorting },
    },
  });
}

export const usePpordersList = (filter?: PpordersFilterInput) => {
  const sorting: PpordersSortInput[] = [
    { field: 'estStartDate', direction: 'DESC' },
  ];

  const queryResult = useCustom<{ pporders: PPOrder[] }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS_LIST,
      resource: "pporders",
      variables: { filter: (filter || {}) as PpordersFilterInput, sorting },
    },
  });

  const dataProvider = useDataProvider()();
  const [overrides, setOverrides] = useState<Record<number, PPOrder>>({});
  
  // State to manage refetch states per order ID
  const [refetchStates, setRefetchStates] = useState<Record<number, RefetchState>>({});

  const refetchById = useCallback(
    async (id: number) => {
      // Set loading state
      setRefetchStates(prev => ({
        ...prev,
        [id]: { isLoading: true, error: null, lastSuccess: null }
      }));

      try {
        const { data } = await dataProvider.custom!<{ pporders: PPOrder[] }>({
          url: "",
          method: "get",
          meta: {
            gqlQuery: GET_PPORDERS_LIST,
            resource: "pporders",
            variables: { filter: { id: { in: [id] } } as PpordersFilterInput },
          },
        });

        const updated = data?.pporders?.[0];
        if (updated?.id) {
          setOverrides((prev) => ({ ...prev, [updated.id]: updated }));
        }

        // Set success state
        setRefetchStates(prev => ({
          ...prev,
          [id]: { isLoading: false, error: null, lastSuccess: Date.now() }
        }));

        return updated;
      } catch (error) {
        // Set error state
        setRefetchStates(prev => ({
          ...prev,
          [id]: { isLoading: false, error: error as Error, lastSuccess: null }
        }));
        throw error; // Re-throw so caller can handle if needed
      }
    },
    [dataProvider]
  );

  // Helper to get refetch state for a specific ID
  const getRefetchState = useCallback((id: number): RefetchState => {
    return refetchStates[id] || { isLoading: false, error: null, lastSuccess: null };
  }, [refetchStates]);

  // Helper to clear refetch state for a specific ID
  const clearRefetchState = useCallback((id: number) => {
    setRefetchStates(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }, []);

  const mergedData = useMemo(() => {
    const original = queryResult.data?.data?.pporders ?? [];
    if (!original.length || Object.keys(overrides).length === 0) {
      return queryResult.data;
    }
    const mergedList = original.map((o) => overrides[o.id] ?? o);
    return { 
      ...queryResult.data, 
      data: { ...queryResult.data?.data, pporders: mergedList } 
    } as typeof queryResult.data;
  }, [queryResult.data, overrides]);

  return {
    ...queryResult,
    data: mergedData,
    refetchById,
    getRefetchState,
    clearRefetchState,
    refetchStates, // Expose all states if needed
  } as typeof queryResult & { 
    refetchById: (id: number) => Promise<PPOrder | undefined>;
    getRefetchState: (id: number) => RefetchState;
    clearRefetchState: (id: number) => void;
    refetchStates: Record<number, RefetchState>;
  };
};
