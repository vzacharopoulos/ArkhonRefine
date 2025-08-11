import { List, useTable, EditButton, ShowButton, DeleteButton, DateField, getDefaultSortOrder, FilterDropdown } from "@refinedev/antd";
import { Table, Space, Input, Select, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getDefaultFilter, GetManyResponse, HttpError, setInitialFilters, useCustom, useGetIdentity, useList, useMany } from "@refinedev/core";

import { GET_AVAILABLE_COILS, GET_EXPECTED_COILS, COILCOLORS } from "@/graphql/queries";
import { Coil, CoilColorsQueryResult, Users } from "graphql/types";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import React from "react";
import { CoilList } from "./CoilList";
import { CoilColorType } from "@/graphql/schema.types";
import { useCoilColors } from "./hooks/useCoilColors";



type CoilColorQueryResult = {
  coilColors: {
    code: string;
    name: string | null;
    hexcode?: string;
  }[];
};

const resourceOptions = {
  available: {
    label: "Διαθέσιμα Ρολά",
    resource: "availableCoils",
    query: GET_AVAILABLE_COILS,
  },
  expected: {
    label: "Αναμενόμενα Ρολά",
    resource: "expectedCoils",
    query: GET_EXPECTED_COILS,
  },
};

export const CoilPage: React.FC = () => {
  // everything else remains the same, but use `query` and `resource` instead of hardcoded values
  const { data: user, isLoading: userLoading, } = useGetIdentity<Users>();
  const [mode, setMode] = React.useState<"available" | "expected">("available");
  const selected = resourceOptions[mode];

  const locationFilter = React.useMemo(
    () =>
      user?.allowedLocations?.length
        ? user.allowedLocations.map((l) => typeof l.locationId === "string" ? parseInt(l.locationId, 10) : l.locationId) // Convert to integers
        : [],
    [user?.allowedLocations],
  );

  const locationMap = React.useMemo(() => {
    const map = new Map<number, string>();
    user?.allowedLocations?.forEach(loc => {
      map.set(loc.locationId, loc.name || `Location ${loc.locationId}`);
    });
    return map;
  }, [user?.allowedLocations]);




  const locationOptions = React.useMemo(() => {
    if (!user?.allowedLocations) return [];
    return user.allowedLocations.map(location => ({
      label: location.name || `Location ${location.locationId}`, // Use name if available, fallback to ID
      value: location.locationId
    }));
  }, [user?.allowedLocations]);

  type CoilsQueryResult = {
    availableCoils: {
      nodes: Coil[];
      totalCount: number;
    };
    coilColors: {
      code: string;
      name: string | null;
      hexcode?: string;
    }[];
  };


  const { tableProps,
    current,
    pageSize,
    setCurrent,
    sorters,
    filters,
    setFilters,
    tableQuery,
  } = useTable<CoilsQueryResult, HttpError, CoilsQueryResult>({
    resource: selected.resource,
    metaData: {
      gqlQuery: selected.query,
    },
    pagination: {
      mode: "server",
      current: 1,
      pageSize: 10,
    },
    sorters: {
      mode: "server",
      initial: [
        {
          field: "upDate",
          order: "desc",
        },
      ],
    },
    filters: {
      mode: "server",
      // This one always runs and never shows up in the UI:
      permanent: [
        {
          field: "loc_in",
          operator: "in",
          value: locationFilter,
        },
      ],

      // These are your actual visible filters:
      initial: [
        {
          field: "coilno",
          operator: "contains",
          value: undefined,
        },
        {
          field: "loc",
          operator: "in",
          value: [], // Default to empty selection
        },
        {
          field: "widthCoil",
          operator: "eq",
          value: undefined,
        },

        {
          field: "color",
          operator: "eq",
          value: undefined,
        },

        // add more if you need…
      ],
    },
    queryOptions: {
      retry: (failureCount, error) =>
        error.message.includes("Network Error") && failureCount <= 3,
    },
  });





const { colorMap, isLoading: colorsLoading } = useCoilColors();






  const initialFilters = [
    { field: "coilno", operator: "contains", value: undefined },
    { field: "widthCoil", operator: "eq", value: undefined },
    { field: "loc", operator: "in", value: [] },
    { field: "currWeightFrom", operator: "gte", value: undefined },
    { field: "currWeightTo", operator: "lte", value: undefined },
    { field: "color", operator: "eq", value: undefined },
  ];



  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{selected.label}</span>
          <Select
            value={mode}
            onChange={(value) => setMode(value)}
            style={{ width: 200 }}
            options={[
              { value: "available", label: "Διαθέσιμα Ρολά" },
              { value: "expected", label: "Αναμενόμενα Ρολά" },
            ]}
          />
        </div>
      }
    >
      <CoilList
        user={user}
        userLoading={userLoading}
        setFilters={setFilters}
        locationOptions={locationOptions}
        locationMap={locationMap}
        colorMap={colorMap}
        tableProps={tableProps}
        current={current}
        pageSize={pageSize}
        setCurrent={setCurrent}
        sorters={sorters}
        filters={filters}
        initialFilters={initialFilters}
      />
    </Card>
  );
};

export default CoilPage;