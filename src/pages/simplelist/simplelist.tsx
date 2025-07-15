import React from "react";
import { List } from "@refinedev/antd";
import { List as AntdList } from "antd";
import { useList } from "@refinedev/core";
import gql from "graphql-tag";

export const GET_PANEL_PRODUCTION_ORDERS_EXT2 = gql`
  query panelProductionOrdersExt2s(
    $filter: PanelProductionOrdersExt2FilterInput
    $sorting: [PanelProductionOrdersExt2SortInput!]
    $paging: PagingInput
  ) {
    panelProductionOrdersExt2s(
      filter: $filter
      sorting: $sorting
      paging: $paging
    ) {
      nodes {
        prodOrder
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
  const { data, isLoading, error } = useList<PanelProductionOrderExt2>({
    resource: "panelProductionOrdersExt2s",
    pagination: {
      mode: "off",
    },
    sorters: [
      {
        field: "prodOrder",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: GET_PANEL_PRODUCTION_ORDERS_EXT2,
    },
    // Remove queryOptions entirely - let Refine handle it
  });

  const mockArray: PanelProductionOrderExt2[] = [
    {
      prodOrder: "PO001",
      productionNo: "P123",
      tradecode: "TR001",
      materialCode: "M001",
      cin: "CIN001",
      cout: "COUT001",
      thickin: 1,
      thickout: 2,
      moldin: 1,
      moldout: 2,
      widthin: 100,
      widthout: 120,
      importNo: "IMP001",
      ttm: 123,
      count: 10,
    },
  ];

  // Debug logging
  console.log("useList data:", data);
  console.log("useList error:", error);

  // Use the actual data from the API, fallback to mock if needed
  const records = data?.data ?? mockArray;

  return (
    <List title="Panel Production Orders Ext2">
      <AntdList
        loading={isLoading}
        dataSource={records}
        renderItem={(item) => (
          <AntdList.Item key={item.prodOrder}>
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