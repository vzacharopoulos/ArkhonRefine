import { List, useTable, EditButton, ShowButton, DeleteButton, DateField, getDefaultSortOrder, FilterDropdown, rangePickerFilterMapper, useSelect } from "@refinedev/antd";
import { Table, Space, Input, Select, Button, DatePicker } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs, { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import { CrudFilters, getDefaultFilter, LogicalFilter, setInitialFilters, useGetIdentity } from "@refinedev/core";

import { GET_AVAILABLE_COILS, GET_STATUSES } from "@/graphql/queries";
import { Coil, Users } from "graphql/types";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import React from "react";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import SailingIcon from "@mui/icons-material/Sailing";
import { CoilsFilterInput, FilterLock } from "./coiltypes/coil_types";



interface CoilListProps {
  user: Users | undefined;
  userLoading: boolean;
  setFilters: (filters: any, behavior?: 'merge' | 'replace') => void;
  locationOptions: Array<{ label: string; value: number }>;
  locationMap: Map<number, string>;
  colorMap: Map<string, { name: string; hexcode?: string }>
  tableProps: any;
  totalWeight: number;
  current: number;
  pageSize: number;
  setCurrent: (page: number) => void;
  sorters: any;
  filters: any;
  initialFilters: any[];
  setLockedPermanent: React.Dispatch<React.SetStateAction<CrudFilters>>;
  clearLockedPermanent: () => void;
}


export const CoilList: React.FC<CoilListProps> = ({
  user,
  userLoading,
  setFilters,
  locationOptions,
  locationMap,
  colorMap,
  tableProps,
  current,
  pageSize,
 totalWeight,
  setCurrent,
  sorters,
  filters,
  initialFilters,
  setLockedPermanent,
  clearLockedPermanent
}) => {
  // pull in your user so you can derive allowedLocations

  const SEND_FMT = "YYYY-MM-DD HH:mm:ss"; // what backend expects (local time)
  // Status options for filtering by status id using label name
  const { selectProps: statusSelectProps } = useSelect({
    resource: "statuses",
    optionLabel: "nameGrp",
    optionValue: "id",
    meta: { gqlQuery: GET_STATUSES },
  });




  if (userLoading || !user) {
    return <div>Loading...</div>;
  } else {
   
return (
  <List
    headerButtons={() => (
      <>
        {/* Reset visible (non-permanent) filters */}
      <Button onClick={() => setFilters(initialFilters, "replace")}  style={{
              backgroundColor: '#1890ff', // Blue color
              color: 'white',
              borderColor: '#1890ff'
            }}>
        Επαναφορά Πίνακα
      </Button>

      {/* Status filter (by name; filters by status id) */}
      {/* <Select
        {...statusSelectProps}
        allowClear
        style={{ width: 220, marginLeft: 8 }}
        placeholder="Κατάσταση"
        value={getDefaultFilter("status", filters)}
        onChange={(val) => {
          setFilters([{ field: "status", operator: "eq", value: val || undefined }], "merge");
        }}
      /> */}

      {/* Permanent filter: isUnloaded */}
      <Select
        style={{ width: 220, marginLeft: 8 }}
        placeholder="Φίλτρο αποφόρτωσης"
        options={[
          { label: 'Αποφορτωμένα ', value: 'unloaded' },
          { label: 'Μη αποφορτωμένα ', value: 'not_unloaded' },
          { label: 'Φορτωμένα ', value: 'loaded' },

          { label: 'Όλα (χωρίς φίλτρο)', value: 'all' },
        ]}
        onChange={(val) => {
          setLockedPermanent((prev) => {
            const current = Array.isArray(prev) ? prev : [];
            const others = current.filter((f: any) => f.field !== 'isUnloaded' && f.field !== 'isLoaded');
            if (val === 'unloaded') {
              return [
                ...others,
                { field: 'isUnloaded', operator: 'eq', value: true },
              ];
            }
            if (val === 'not_unloaded') {
              return [
                ...others,
                { field: 'isUnloaded', operator: 'eq', value: false },
              ];
            }
            if (val === 'loaded') {
              return [
                ...others,
                { field: 'isLoaded', operator: 'eq', value: true },
              ];
            }
            // all -> clear only the isUnloaded/isLoaded constraints, keep others
            return others;
          });
        }}
      />

      {/* 🔒 Set specific permanent filters (e.g., documents) */}
      <Button
        onClick={() => {
          const docs = [
            "2025CS-ARK13","2025CS-ARK12B","2025CS-ARK12A",
            "2025CS-ARK14","2025CS-ARK15","2025CS-ARK16",
            "2025CS-ARK17","25JY-AS04",
          ];
          // set as *permanent*
          setLockedPermanent([
            { field: "documents", operator: "in", value: docs },
          ]);
          // optional: clear same filter from the visible layer to avoid duplication
          setFilters([{ field: "documents", operator: "in", value: undefined }], "merge");
        }}
      >
        καράβι πάτρα
        <DirectionsBoatIcon />
      </Button>

      {/* 🔓 Clear dynamic permanent filters */}
      <Button onClick={clearLockedPermanent}>
        Ξεκλείδωμα μόνιμων φίλτρων
      </Button>

      {/* 🔒 Bonus: lock *current* visible filters as permanent */}
      <Button
        onClick={() => {
          // take current filters that have a value and make them permanent
          const toLock = (filters ?? []).filter((f: LogicalFilter) => f.value !== undefined && f.value !== null && f.value !== "");
          setLockedPermanent(toLock);
          // then clear them from the visible layer
          setFilters((prev: LogicalFilter[]) => prev.filter(f => !toLock.some((t: LogicalFilter) => t.field === f.field)));
        }}
      >
        Κλείδωμα τρεχόντων φίλτρων
      </Button>
    </>
  )}
>
        <Table
          {...tableProps}
          rowKey="id"
          sticky
              className="compact-table"

            size="small"                 // smaller paddings overall
            scroll={{ x: "max-content" }} // enables sticky columns
            
          pagination={{
            ...tableProps.pagination, 
            current,
            pageSize,
            total: tableProps.pagination?.total ?? 0,
            onChange: (page) => setCurrent(page),
            showSizeChanger: true,
            
             showTotal: (total, range) => (
            <span>
              σύνολο {total} Coils — συνολικό βάρος:&nbsp;
              <strong>{(totalWeight ?? 0).toLocaleString('el-GR')}</strong> kg
            </span>
          ),
          }}
          bordered
        >
          // coilno — contains (text)
<Table.Column
  dataIndex="supcoilId"
  title="Κωδικός Προμ"
  filteredValue={getDefaultFilter("supcoilId", filters, "contains")} // Specify the operator here
  filterIcon={   <span style={{ fontSize: 22 }}>
      <SearchOutlined />
    </span>}
  
  filterDropdown={(props) => (
    <FilterDropdown {...props}>
      <Input
        placeholder="Αναζήτηση κωδικού"
        onChange={(e) => {
          const v = e.target.value.trim();
          props.setSelectedKeys?.(v ? [v] : []);
          // Commit immediately so changing page won't reset it
          props.confirm?.({ closeDropdown: false });
        }}
        onPressEnter={() => props.confirm?.()}
        onKeyDown={(e) => e.stopPropagation()}
      />
    </FilterDropdown>
  )}
  
  render={(value) => value || "-"}
/>

   <Table.Column
            dataIndex="currWeight"
            title="Βάρος"
            filteredValue={getDefaultFilter("currWeight", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props   } 
              >
          
                <Input
                  placeholder='Έως βάρος'
                  type="number"
                  step="0.01"
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    // Convert to number if not empty, else clear
                    props.setSelectedKeys?.(val ? [Number(val)] : []);
                  }}
                  onPressEnter={() => props.confirm?.()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </FilterDropdown>
            )}
            render={(value) => value ? `${value} kg` : '-'}
            align="right"
            sorter={true} // Enable sorting
          />



          <Table.Column
            dataIndex="thickness"
            title="Πάχος"
            filteredValue={getDefaultFilter("thickness", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Αναζήτηση πάχους" type="number" />
              </FilterDropdown>
            )}
            render={(v) => (v ? `${v } mm` : "-")}
            sorter
          />

 <Table.Column
  dataIndex="widthCoil"
  title="Πλάτος"
  filteredValue={getDefaultFilter("widthCoil", filters)}
  filterIcon={<SearchOutlined />}
  filterDropdown={(props) => (
    <FilterDropdown {...props}>
      <Input
        placeholder="Πλάτος (mm)"
        inputMode="numeric"
        onChange={(e) => {
          const mm = e.target.value.trim();
          const meters = mm ? String(Number(mm) / 1000) : "";
          props.setSelectedKeys?.(meters ? [meters] : []);
        }}
        onPressEnter={() => props.confirm?.()}
        onKeyDown={(e) => e.stopPropagation()}
      />
    </FilterDropdown>
  )}
  render={(v) => (v ? `${v * 1000} mm` : "-")}
  sorter
/>

<Table.Column
  dataIndex="loadDate"
  title="Φορτώθηκε"
  render={(v) => <DateField value={v} format="LLL" />}
  // Do NOT pass string values to filteredValue for a RangePicker.
  // Just show the filter icon as active if any filter is set:
  filteredValue={getDefaultFilter('loadDate', filters, 'in') }
  filterDropdown={(props) => (
  <FilterDropdown
    {...props}
    mapValue={(selectedKeys, event) => rangePickerFilterMapper(selectedKeys, event)}
  >
    <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
  </FilterDropdown>
)}
  sorter
/>
       

<Table.Column
  dataIndex="upDate"
  title="Τελευταία ενημέρωση"
  render={(v) => <DateField value={v} format="LLL" />}
  // Do NOT pass string values to filteredValue for a RangePicker.
  // Just show the filter icon as active if any filter is set:
  filteredValue={getDefaultFilter('upDate', filters, 'in') }
  filterDropdown={(props) => (
  <FilterDropdown
    {...props}
    mapValue={(selectedKeys, event) => rangePickerFilterMapper(selectedKeys, event)}
  >
    <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
  </FilterDropdown>
)}
  sorter
/>
          <Table.Column
            dataIndex="loc"
            title="Τοποθεσία"
            filteredValue={getDefaultFilter('loc', filters, 'in')}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Επιλογή τοποθεσιών"
                  options={locationOptions}
                  allowClear
                  // {...props.filters} // This binds Refine's internal state
                />
              </FilterDropdown>
            )}
            render={(value) => locationMap.get(value) || `Τοπ. ${value}`}
          />

          {/* <Table.Column
            dataIndex="openstatus"
            title="Κατάσταση Ανοίγματος"
            width={50}
            filterIcon={<SearchOutlined />}
            filteredValue={getDefaultFilter('openstatus', filters, 'in')}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Επιλογή τοποθεσιών"
                  options={[
                    { label: "Ανοιχτό", value: "OPEN" },
                    { label: "Κλειστό", value: "CLOSED" }
                  ]}

                  //value={getDefaultFilter('status', filters)} // Fixed field name from 'loc' to 'status'
                />
              </FilterDropdown>
            )}
            render={(value) => {
              if (value === null || value === undefined) return '-';
              return value === 'OPEN' ? 'Ανοιχτό' : 'Κλειστό';
            }}

          /> */}

          <Table.Column
            dataIndex="shipBayNo"
            title="αμπαρι"
            filteredValue={getDefaultFilter('shipBayNo', filters, 'in')}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 160 }}
                  mode="multiple"
                  placeholder="Select bay"
                  options={[1,2,3,4,5].map((n) => ({ label: String(n), value: n }))}
                  allowClear
                />
              </FilterDropdown>
            )}
            render={(value) => (value ?? '-')}
            sorter
          />

          <Table.Column
            dataIndex="comments"
            title="Σχόλια"
            render={(value) => value || '-'}
          />

          <Table.Column
            dataIndex={['status', 'name']}
            title="Κατάσταση"
            render={(value) => value || '-'}
          />
         <Table.Column
  dataIndex="color"
  title="Χρώμα"
  defaultSortOrder={getDefaultSortOrder("color", sorters)}
  sorter
  filteredValue={getDefaultFilter('color', filters, 'in')}
           filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input
                  placeholder='Αναζήτηση χρώμα'
                  type="text"
                  step="0.01"
                />
              </FilterDropdown>
            )}
  render={(colorCode: string) => {
    const colorInfo = colorMap.get(colorCode?.trim());

    if (!colorInfo) return "-";
    

    return (
      <div
        style={{
          backgroundColor: colorInfo.hexcode || "#f0f0f0",
          padding: "4px 8px",
          borderRadius: "4px",
          color: "#000",
          display: "inline-block",
          minWidth: 80,
          textAlign: "center",
        }}
      >
        {colorInfo.name}
      </div>
    );
  }}
/>


          <Table.Column<Coil>
            title="Actions"
            dataIndex="actions"
              fixed="right"
              width={40} // adjust as needed
            render={(_, record) => (
              <Space>
                <EditButton hideText size="large" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    );
  };
}
export default CoilList
