import React from "react";
import { useList } from "@refinedev/core";
import { List } from "@refinedev/antd";
import { Table } from "antd";
import gql from "graphql-tag";

export const GETPANELPRODUCTIONORDERSEXT2 = gql`
  query panelProduction(
    $filter: PanelProductionOrdersExt2FilterInput
    $sorting: [PanelProductionOrdersExt2SortInput!]
    $paging: OffsetPaging
  ) {
    panelProduction(
      filter: $filter
      sorting: $sorting
      paging: $paging
    ) {
      nodes {
        prodOrder
        productionNo
        tradecode
        materialCode
        widthin
        widthout
      }
      totalCount
    }
  }
`;

export type PanelProductionOrderExt2 = {
  
  prodOrder: string;
  productionNo: string;
  tradecode: string;
  materialCode: string;
  widthin: number | null;
  widthout: number | null;
};

export const SimpleCoilList: React.FC = () => {
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading, error } = useList<PanelProductionOrderExt2>({
    resource: "panelProduction",
    liveMode: "auto",
    pagination: {
      mode: "server",
      current,
      pageSize,
    },
    meta: {
      gqlQuery: GETPANELPRODUCTIONORDERSEXT2,
    
    },
  });

  return (
    <List title="Λίστα Παραγωγής Πάνελ (με σελιδοποίηση)">
      <Table
        dataSource={data?.data}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current,
          pageSize,
          total: data?.total || 0,
          onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
          },
        }}
      >
        <Table.Column title="Κωδικός Παραγγελίας" dataIndex="prodOrder" />
        <Table.Column title="Κωδικός Παραγωγής" dataIndex="productionNo" />
        <Table.Column title="Tradecode" dataIndex="tradecode" />
        <Table.Column title="Material Code" dataIndex="materialCode" />
        <Table.Column title="Πλάτος Εισόδου" dataIndex="widthin" />
        <Table.Column title="Πλάτος Εξόδου" dataIndex="widthout" />
      </Table>

      {error && <p style={{ color: "red" }}>Σφάλμα: {error.message}</p>}
    </List>
  );
};

export default SimpleCoilList;
