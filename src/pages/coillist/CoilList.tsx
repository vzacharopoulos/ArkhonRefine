import { List, useTable, EditButton, ShowButton, DeleteButton, DateField, getDefaultSortOrder, FilterDropdown } from "@refinedev/antd";
import { Table, Space, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getDefaultFilter, setInitialFilters, useGetIdentity } from "@refinedev/core";

import { GET_AVAILABLE_COILS } from "@/graphql/queries";
import { Coil, Users } from "graphql/types";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import React from "react";




interface CoilListProps {
  user: Users | undefined;
  userLoading: boolean;
  setFilters: (filters: any, behavior?: 'merge' | 'replace') => void;
  locationOptions: Array<{ label: string; value: number }>;
  locationMap: Map<number, string>;
  colorMap: Map<string, { name: string; hexcode?: string }>
  tableProps: any;
  current: number;
  pageSize: number;
  setCurrent: (page: number) => void;
  sorters: any;
  filters: any;
  initialFilters: any[];
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
  setCurrent,
  sorters,
  filters,
  initialFilters
}) => {
  // pull in your user so you can derive allowedLocations





  if (userLoading || !user) {
    return <div>Loading...</div>;
  } else {
    return (

      <List headerButtons={() => (
        <>
          <Button
            onClick={() => {
              setFilters(initialFilters, "replace");
            }}
            style={{
              backgroundColor: '#1890ff', // Blue color
              color: 'white',
              borderColor: '#1890ff'
            }}

          >
            Επαναφορά Πίνακα
          </Button>
        </>
      )}
      >
        <Table
          {...tableProps}
          rowKey="id"
          pagination={{
            current,
            pageSize,
            total: tableProps.pagination?.total ?? 0,
            onChange: (page) => setCurrent(page),
            showSizeChanger: true,
            showTotal: (t) => `συνολο ${t} αντικείμενα`,
          }}
          bordered
        >
          <Table.Column<Coil>
            dataIndex="coilno"
            title="Κωδικός"
            defaultFilteredValue={getDefaultFilter("coilno", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Αναζήτηση κωδικού" />
              </FilterDropdown>
            )}
            sorter
          />

          <Table.Column
            dataIndex="thickness"
            title="Πάχος"
            defaultFilteredValue={getDefaultFilter("thickness", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Αναζήτηση πάχους" type="number" />
              </FilterDropdown>
            )}
            render={(v) => (v ? `${v * 1000} μm` : "-")}
            sorter
          />

          <Table.Column
            dataIndex="widthCoil"
            title="Πλάτος Ρολού"
            defaultFilteredValue={getDefaultFilter('widthCoil', filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input
                  placeholder='Αναζήτηση πλάτους'
                  type="number"
                  step="0.01"
                />
              </FilterDropdown>
            )}
            render={(value) => value ? `${value} mm` : '-'}
            sorter={true} // Enable sorting
          />
          <Table.Column
            dataIndex="currWeight"
            title="Τρέχον Βάρος"
            defaultFilteredValue={getDefaultFilter('currWeight', filters)} // Note: defaultFilter is for single value, range handled by dropdown
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Space direction="vertical">
                  <Input
                    placeholder='Από βάρος'
                    type="number"
                    step="0.01"

                  />
                  <Input
                    placeholder='Έως βάρος'
                    type="number"
                    step="0.01"

                  />
                </Space>
              </FilterDropdown>
            )}
            render={(value) => value ? `${value} kg` : '-'}
            align="right"
            sorter={true} // Enable sorting
          />

          <Table.Column
            dataIndex="upDate"
            title="Τελευταία ενημέρωση"
            render={(v) => <DateField value={v} format="LLL" />}
            defaultSortOrder={getDefaultSortOrder("upDate", sorters)}
            sorter
          />

          <Table.Column
            dataIndex="loc"
            title="Τοποθεσία"
            defaultFilteredValue={getDefaultFilter('loc', filters, 'in')}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Επιλογή τοποθεσιών"
                  options={locationOptions}
                  allowClear
                  {...props.filters} // This binds Refine's internal state
                />
              </FilterDropdown>
            )}
            render={(value) => locationMap.get(value) || `Τοπ. ${value}`}
          />

          <Table.Column
            dataIndex="openstatus"
            title="Κατάσταση Ανοίγματος"
            width={50}
            filterIcon={<SearchOutlined />}
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

                  value={getDefaultFilter('status', filters)} // Fixed field name from 'loc' to 'status'
                />
              </FilterDropdown>
            )}
            render={(value) => {
              if (value === null || value === undefined) return '-';
              return value === 'OPEN' ? 'Ανοιχτό' : 'Κλειστό';
            }}

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
  defaultFilteredValue={getDefaultFilter('color', filters, 'in')}
           filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input
                  placeholder='Αναζήτηση χρώμα'
                  type={colorMap}
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
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    );
  };
}
export default CoilList
