import { List, useTable, EditButton, ShowButton, DeleteButton, DateField, getDefaultSortOrder, FilterDropdown } from "@refinedev/antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { BarcodeOutlined, SearchOutlined } from "@ant-design/icons";
import { CrudFilters, getDefaultFilter, GetManyResponse, HttpError, setInitialFilters, useCustom, useDataProvider, useGetIdentity, useList, useMany, useNavigation } from "@refinedev/core";
import gql from "graphql-tag";

import { GET_AVAILABLE_COILS, GET_EXPECTED_COILS, COILCOLORS, GET_EXPECTED_COILS_WEIGHT } from "@/graphql/queries";
import { Coil, CoilColorsQueryResult, Users } from "graphql/types";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import React from "react";
import { CoilList } from "./CoilList";
import { CoilColorType } from "@/graphql/schema.types";
import { useCoilColors } from "./hooks/useCoilColors";
import CoilNoScanner from "./CoilNoScanner";
import { coilWhitelist } from "./coiltypes/coil_whitelist.sample";
import { Button, Card, Modal, Select, Typography } from "antd";
import { exportCoilsPdf } from "./helpers/handleexportpdf";
import { cleanFilters, toGraphQLFilter, toGraphQLSorting } from "./helpers/filterstographql";

const { Title, Text } = Typography;

type CoilColorQueryResult = {
  coilColors: {
    code: string;
    name: string | null;
    hexcode?: string;
  }[];
};

const resourceOptions = {
  available: {
    label: "Διαθέσιμα",
    resource: "availableCoils",
    query: GET_AVAILABLE_COILS,
  },
  expected: {
    label: "Αναμενόμενα",
    resource: "expectedCoils",
    query: GET_EXPECTED_COILS,
  },
};

export const CoilPage: React.FC = () => {
  const { data: user, isLoading: userLoading } = useGetIdentity<Users>();
  const [mode, setMode] = React.useState<"available" | "expected">("expected");
  const selected = resourceOptions[mode];
  const [scanOpen, setScanOpen] = React.useState(false);
  const dataProvider = useDataProvider()();
  const { edit } = useNavigation();
  const [Roi, setRoi] = React.useState({ left: 0.2, top: 0.35, width: 0.6, height: 0.15 });

  const locationFilter = React.useMemo(
    () =>
      user?.allowedLocations?.length
        ? user.allowedLocations.map((l) =>
          typeof l.locationId === "string" ? parseInt(l.locationId, 10) : l.locationId,
        )
        : [],
    [user?.allowedLocations],
  );

  const locationMap = React.useMemo(() => {
    const map = new Map<number, string>();
    user?.allowedLocations?.forEach((loc) => {
      map.set(loc.locationId, loc.name || `Location ${loc.locationId}`);
    });
    return map;
  }, [user?.allowedLocations]);

  const locationOptions = React.useMemo(() => {
    if (!user?.allowedLocations) return [];
    return user.allowedLocations.map((location) => ({
      label: location.name || `Location ${location.locationId}`,
      value: location.locationId,
    }));
  }, [user?.allowedLocations]);

  type CoilsQueryResult = {
    availableCoils: {
      nodes: Coil[];
      totalCount: number;
      totalWeight: number;
    };
    coilColors: {
      code: string;
      name: string | null;
      hexcode?: string;
    }[];
  };

  const basePermanent: CrudFilters = React.useMemo(
    () => [{ field: "loc_in", operator: "in", value: locationFilter }],
    [locationFilter],
  );

  const [lockedPermanent, setLockedPermanent] = React.useState<CrudFilters>([]);

  const permanent = React.useMemo(
    () => [...basePermanent, ...lockedPermanent],
    [basePermanent, lockedPermanent],
  );

  const {
    tableProps,
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
      defaultBehavior: "merge",
      mode: "server",
      permanent,
      initial: [
        { field: "coilno", operator: "contains", value: undefined },
        { field: "supcoilId", operator: "contains", value: undefined },
        { field: "upDate", operator: "in", value: [] },
        { field: "loc", operator: "in", value: [] },
        { field: "widthCoil", operator: "eq", value: undefined },
        { field: "color", operator: "eq", value: undefined },
        { field: "status", operator: "eq", value: undefined },
        { field: "currWeightFrom", operator: "eq", value: undefined },
        { field: "currWeightTo", operator: "eq", value: undefined },
        { field: "currWeight", operator: "gte", value: undefined }

      ],
    },
    queryOptions: {
      retry: (failureCount, error) =>
        error.message.includes("Network Error") && failureCount <= 3,
    },
    syncWithLocation: true,
  });

  
  const mergedFilters = cleanFilters([...(permanent || []), ...(filters || [])]);
  const gqlFilter = toGraphQLFilter(mergedFilters);
  const gqlSorting = toGraphQLSorting(sorters);

  const { data: aggRes } = useCustom({
    method: "post",
    url: "",
    meta: {
      gqlQuery: GET_EXPECTED_COILS_WEIGHT,
      variables: {
        filter: gqlFilter,
        sorting: gqlSorting,
      },
    },
    queryOptions: { keepPreviousData: true },
  });

  const totalWeight = (aggRes?.data as any)?.[selected.resource]?.totalWeight ?? 0;

  const { colorMap, isLoading: colorsLoading } = useCoilColors();

  const initialFilters = [
    { field: "coilno", operator: "contains", value: undefined },
    { field: "supcoilId", operator: "contains", value: undefined },
    { field: "widthCoil", operator: "eq", value: undefined },
    { field: "loc", operator: "in", value: [] },
    { field: "upDate", operator: "in", value: [] },
    { field: "status", operator: "eq", value: undefined },
    { field: "currWeightFrom", operator: "eq", value: undefined },
    { field: "currWeightTo", operator: "eq", value: undefined },
    { field: "currWeight", operator: "gte", value: undefined },
    { field: "color", operator: "eq", value: undefined },
  ];

  // ---------- Option B: local export function that receives args ----------
//  ------------------------------------------------------------------

  return (
    <>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            {/* LEFT: stacked vertically */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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

              <Button
                type="primary"
                size="large"
                icon={<BarcodeOutlined />}
                onClick={() => setScanOpen(true)}
                style={{
                  backgroundColor: "#13c2c2",   // custom teal
                  borderColor: "#13c2c2",
                  height: 48,                   // taller than default
                  padding: "0 20px",
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 8,
                }}
              >
                Scan Coil
              </Button>
            </div>

            {/* RIGHT: report button */}
            <Button
              onClick={() => {
                const rows = (tableProps?.dataSource ?? []) as any[];
                const totalItems = tableProps?.pagination && typeof tableProps.pagination !== 'boolean'
                  ? tableProps.pagination.total
                  : rows.length;

                exportCoilsPdf({
                  rows,
                  colorMap,
                  locationMap,
                  totalItems,
                  totalWeight,
                });
              }}
            >
              αναφορά
            </Button>
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
          totalWeight={totalWeight}
          current={current}
          pageSize={pageSize}
          setCurrent={setCurrent}
          sorters={sorters}
          filters={filters}
          initialFilters={[]}
          setLockedPermanent={setLockedPermanent}
          clearLockedPermanent={() => setLockedPermanent([])}
        />
      </Card>

      <Modal
        title="Scan Coil Number"
        open={scanOpen}
        onCancel={() => setScanOpen(false)}
        footer={null}
        width={720}
      >
        <CoilNoScanner
          Roi={Roi}
          onRoiChange={setRoi}
          persistRoiKey="coil-scanner-roi"
          validCoils={coilWhitelist}
          continuous={true}
          onFound={async (code) => {
            console.log("Scanned coilno:", code);
            const filter = { supcoilId: { eq: code } } as any;
            const FIND_EXPECTED = gql`
              query FindExpected($filter: CoilsFilterInput) {
                expectedCoils(filter: $filter) {
                  nodes {
                    id
                  }
                }
              }
            `;
            let id: number | null = null;
            try {
              const exp = await dataProvider.custom!<{
                expectedCoils: { nodes: { id: number }[] };
              }>({
                url: "",
                method: "post",
                meta: { gqlQuery: FIND_EXPECTED, variables: { filter } },
              });
              id = exp?.data?.expectedCoils?.nodes?.[0]?.id ?? null;
            } catch (e) {
              console.warn("Lookup error", e);
            }
            setScanOpen(false);
            if (id) {
              edit("coil", id);
            } else {
              console.warn("Coil not found for", code);
            }
          }}
        />
      </Modal>
    </>
  );
};

export default CoilPage;
