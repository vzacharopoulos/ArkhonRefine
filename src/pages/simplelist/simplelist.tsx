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
      nodes{
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
      totalCount
    }
  }
`;
export type PanelProductionOrderExt2 = {
  prodOrder: string;
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
 const { data, isLoading } = useList<{
  panelProductionOrdersExt2s: {
    nodes: PanelProductionOrderExt2[];
    totalCount: number;
  };
}>({
  meta: {
    gqlQuery: GET_PANEL_PRODUCTION_ORDERS_EXT2,
    fields: [
      {
        nodes: [
          "productionNo",
          "tradecode",
          "materialCode",
          "cin",
          "cout",
          "thickin",
          "thickout",
          "moldin",
          "moldout",
          "widthin",
          "widthout",
          "importNo",
          "ttm",
          "count",
        ],
      },
      "totalCount",
    ],
  },
  pagination: {
    mode: "server",
  },
   filters: [],
  sorters: [],
});
console.log("✅ Full useList response:", data);

console.log("✅ data?.data:", data?.data);

console.log("✅ data?.data?.panelProductionOrdersExt2s:", data?.data?.panelProductionOrdersExt2s);

console.log("✅ data?.data?.panelProductionOrdersExt2s?.nodes:", data?.data?.panelProductionOrdersExt2s?.nodes);

const records = data?.panelProductionOrdersExt2s?.nodes;
  return (
    <List title="Panel Production Orders Ext2">
      <AntdList
        loading={isLoading}
        dataSource={records}
        renderItem={(item) => (
          <AntdList.Item key={item.prodOrder}>
            <AntdList.Item.Meta
              title={item.prodOrder}
              description={`ProductionNo: ${item.productionNo}, Tradecode: ${item.tradecode}`}
            />
          </AntdList.Item>
        )}
      />
    </List>
  );
};

export default SimpleList;