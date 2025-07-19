import React, { useEffect } from "react";
import { List } from "@refinedev/antd";
import { List as AntdList } from "antd";
import { useDataProvider, useList } from "@refinedev/core";
import gql from "graphql-tag";

export const GET_PANEL_PRODUCTION_ORDERS_EXT2 = gql`
  query panelProductionOrdersExt2s(
    $filter: PanelProductionOrdersExt2FilterInput
    $sorting: [PanelProductionOrdersExt2SortInput!]
    $paging: OffsetPaging
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
// Test your GraphQL client separately
import { GraphQLClient } from "graphql-request";

// Call this in your component or browser console


const SimpleList: React.FC = () => {
  const dataProvider = useDataProvider();
  
  // Test if data provider exists
  useEffect(() => {
    console.log("🔧 Data provider exists:", !!dataProvider);
    console.log("🔧 Data provider methods:", Object.keys(dataProvider));
  }, [dataProvider]);


 // Approach 3: Specify correct GraphQL types in meta
  const { data: data, isLoading: loading, error: error } = useList<PanelProductionOrderExt2>({
    resource: "panelProductionOrdersExt2s",
    pagination: {
      current: 1,
      pageSize: 10,
    },
    meta: {
      gqlQuery: GET_PANEL_PRODUCTION_ORDERS_EXT2,
      queryName: "panelProductionOrdersExt2s",
      filterType: "PanelProductionOrdersExt2FilterInput",
      sortType: "PanelProductionOrdersExt2SortInput",
    },
  });
  return (
    <div style={{ padding: 20 }}>
      <h2>Debug Information</h2>
      
    
      <div>
        <p><strong>Data Provider Exists:</strong> {dataProvider ? "✅ Yes" : "❌ No"}</p>
     
        <p><strong>Error:</strong> {error ? error.message : "None"}</p>
        <p><strong>Data Length:</strong> {data?.data?.length || 0}</p>
        <p><strong>Total:</strong> {data?.total || 0}</p>
      </div>

      <details>
        <summary>Raw Data</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>

      {error && (
        <details>
          <summary>Error Details</summary>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

export default SimpleList;