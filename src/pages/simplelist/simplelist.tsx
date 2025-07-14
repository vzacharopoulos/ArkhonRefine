import React from "react";
import { List } from "@refinedev/antd";
import { List as AntdList } from "antd";
import { useList } from "@refinedev/core";
import gql from "graphql-tag";

export const GET_PANEL_PRODUCTION_ORDERS_EXT2 = gql`
  query GetPanelProductionOrdersExt2s(
    $filter: PanelProductionOrdersExt2FilterInput
    $sorting: [PanelProductionOrdersExt2SortInput!]
    $limit: Int
    $offset: Int
  ) {
    panelProductionOrdersExt2s(
      filter: $filter
      sorting: $sorting
      limit: $limit
      offset: $offset
    ) {
      data {
        productionNo
        tradecode
        materialCode
        cin
        cout
        thickin
        thickout
        moldin
        moldout
        widthin
        widthout
        importNo
        ttm
        count
      }
      total
    }
  }
`;

export type PanelProductionOrderExt2 = {
  prodOrder?: string;
  productionNo: string;
  tradecode: string;
  materialCode: string;
  cin: string;
  cout: string;
  thickin: number | null;
  thickout: number | null;
  moldin: number | null;
  moldout: number | null;
  widthin: number | null;
  widthout: number | null;
  importNo: string;
  ttm: number | null;
  count: number | null;
};

const SimpleList: React.FC = () => {
  const { data, isLoading } = useList({
    resource: "panelProductionOrdersExt2s",
   metaData: {
  gqlQuery: GET_PANEL_PRODUCTION_ORDERS_EXT2,
  fields: [
    "data.productionNo",
    "data.tradecode",
    "data.materialCode",
    "data.cin",
    "data.cout",
    "data.thickin",
    "data.thickout",
    "data.moldin",
    "data.moldout",
    "data.widthin",
    "data.widthout",
    "data.importNo",
    "data.ttm",
    "data.count",
    "total",
  ],
},
    pagination: {
      mode: "server",
    },
    queryOptions: {
      select: (response) => {
        console.log("🚀 Full GraphQL response:", response);
        console.log("📦 Extracted data:", response?.panelProductionOrdersExt2s?.data);
        return response?.panelProductionOrdersExt2s?.data ?? [];
      },
    },
  });

  const records = data ?? [];

  console.log("🧾 Final records passed to AntdList:", records);

  return (
    <List title="Panel Production Orders Ext2">
      <AntdList
        loading={isLoading}
        dataSource={records}
        renderItem={(item) => (
          <AntdList.Item key={item.productionNo + item.materialCode}>
            <AntdList.Item.Meta
              title={`Tradecode: ${item.tradecode}`}
              description={`Production No: ${item.productionNo} | Material: ${item.materialCode}`}
            />
          </AntdList.Item>
        )}
      />
    </List>
  );
};

export default SimpleList;
