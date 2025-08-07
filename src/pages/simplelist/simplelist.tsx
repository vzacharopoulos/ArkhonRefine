import React from "react";
import { CrudSort, useList } from "@refinedev/core";
import { List } from "@refinedev/antd";
import { Badge, Button, Input, Table, Card, Row, Col, Spin, Alert } from "antd";
import gql from "graphql-tag";
import { PanelProductionOrderExt2 } from "./prodplanningtypes";
import { useTable } from "@refinedev/antd";
import dayjs from "dayjs";
import { ClearOutlined, EditOutlined } from "@ant-design/icons";
import { co } from "@fullcalendar/core/internal-common";
import {Typography} from "antd";
import { usePporders } from "@/hooks/usePporders";
import { usePporderLinesArray } from "@/hooks/usePporderLinesArray";

const { Title, Text } = Typography;

// New component for pporders box layout
export const PpordersBoxList: React.FC = () => {
  const { data: ppordersData, isLoading: ppordersLoading, error: ppordersError } = usePporders();

  if (ppordersLoading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }} />;
  }

  // Show mock data if there's an error (API not available)
  const pporders = ppordersData?.data?.pporders || (ppordersError ? mockPporders : []);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>PP Orders and Order Lines</Title>
      {ppordersError && (
        <Alert 
          message="API not available - showing mock data" 
          type="warning" 
          showIcon 
          style={{ marginBottom: '20px' }}
        />
      )}
      <Row gutter={[16, 16]}>
        {pporders.map((order) => (
          <Col key={order.id} xs={24} sm={12} lg={8} xl={6}>
            <PporderBox order={order} />
          </Col>
        ))}
        {pporders.length === 0 && !ppordersError && (
          <Col span={24}>
            <Alert message="No PP Orders found" type="info" showIcon />
          </Col>
        )}
      </Row>
    </div>
  );
};

// Mock data for demonstration when API is not available
const mockPporders = [
  {
    id: 1,
    pporderno: "POR001",
    panelcode: "PANEL001",
    status: 1,
    estStartDate: "2025-01-15T08:00:00Z",
    estFinishDate: "2025-01-15T16:00:00Z"
  },
  {
    id: 2,
    pporderno: "POR002", 
    panelcode: "PANEL002",
    status: 2,
    estStartDate: "2025-01-16T08:00:00Z",
    estFinishDate: "2025-01-16T18:00:00Z"
  },
  {
    id: 3,
    pporderno: "POR003",
    panelcode: "PANEL003", 
    status: 0,
    estStartDate: "2025-01-17T08:00:00Z",
    estFinishDate: "2025-01-17T17:00:00Z"
  }
];

const mockPporderlines = [
  {
    id: 1,
    panelcode: "LINE001",
    status: 1,
    custporderno: "CUST001",
    prodOrdersView: { ttm: 150 }
  },
  {
    id: 2,
    panelcode: "LINE002", 
    status: 2,
    custporderno: "CUST002",
    prodOrdersView: { ttm: 200 }
  }
];

// Individual pporder box component
const PporderBox: React.FC<{ order: any }> = ({ order }) => {
  const { data: pporderlinesData, isLoading: linesLoading, error: linesError } = usePporderLinesArray([order.pporderno]);

  // Show mock data if there's an error (API not available)
  const pporderlines = pporderlinesData?.data?.pporderlines2 || (linesError ? mockPporderlines : []);

  return (
    <Card
      title={
        <div>
          <Text strong>{order.pporderno}</Text>
          <br />
          <Text type="secondary">{order.panelcode}</Text>
        </div>
      }
      extra={
        <Badge 
          status={order.status === 1 ? "processing" : order.status === 2 ? "success" : "default"} 
          text={`Status: ${order.status}`} 
        />
      }
      style={{ height: '100%' }}
    >
      <div style={{ marginBottom: '10px' }}>
        <Text>Start: {order.estStartDate ? dayjs(order.estStartDate).format("DD/MM/YYYY") : "-"}</Text>
        <br />
        <Text>Finish: {order.estFinishDate ? dayjs(order.estFinishDate).format("DD/MM/YYYY") : "-"}</Text>
      </div>
      
      {linesLoading ? (
        <Spin />
      ) : (
        <div>
          <Title level={5}>Order Lines ({pporderlines.length})</Title>
          {pporderlines.length === 0 ? (
            <Alert message="No order lines found" type="info" showIcon />
          ) : (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {pporderlines.map((line) => (
                <Card 
                  key={line.id} 
                  size="small" 
                  style={{ marginBottom: '8px' }}
                  bodyStyle={{ padding: '8px' }}
                >
                  <div>
                    <Text strong>{line.panelcode}</Text>
                    <br />
                    <Text type="secondary">Status: {line.status}</Text>
                    {line.custporderno && (
                      <>
                        <br />
                        <Text>Customer Order: {line.custporderno}</Text>
                      </>
                    )}
                    {line.prodOrdersView?.ttm && (
                      <>
                        <br />
                        <Text>TTM: {line.prodOrdersView.ttm}m</Text>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export const GETPANELPRODUCTIONORDERSEXT2 = gql`


  query panelProduction(
    $filter: ProdOrdersViewFilterInput
    $sorting: [ProdOrdersViewSortInput!]
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
       code
        widthin
        widthout
        time
        count
        ttm
         panelSpeed{speed}
        pporderline{id
          pporderno
          pporders{id
          status}
        status}
        widthin
        widthout
        fintradeSync{id
        ftrdate
          cus{
            name
            id
            geo{descr}
            custfindata{comid}
          }
        salesman{name
                 cnt{code}
        code}}
        code
      
      }
      totalCount
    }
  }
`;
// ftrstatus 
// 0 ετοιμο προσ επεξεργασια
// 1 εχει remain quantity
// 2 exei oloklhrvuei h paraggelia 
// -1 ειναι ακυρωμένη

function getPriority(ftrdate: string | null | undefined): "early" | "normal" | "late" | "fresh" {
  if (!ftrdate) return "fresh"; // If no date is provided, consider it fresh
  
  const days = dayjs(ftrdate).diff(dayjs(), "day");
  const absoluteDays = Math.abs(days); // Using Math.abs() instead of abs()
  
  if (absoluteDays > 160) return "late";
  if (absoluteDays > 140) return "normal";
  if (absoluteDays > 120) return "early";
  if (absoluteDays >= 0) return "fresh"; // Changed from absoluteDays > 0 to days >= 0
  return "late"; // For any negative days (past dates)
}


export const PanelProductionList: React.FC = () => {
  const { tableProps, sorters, setSorters, filters, setFilters,pageCount,pageSize } = useTable<PanelProductionOrderExt2>({
    resource: "panelProduction",
    liveMode: "auto",
    pagination: {
      mode: "server",
      pageSize: 10,
    },
    meta: { gqlQuery: GETPANELPRODUCTIONORDERSEXT2 },
    initialSorter: [
      {
        field: "tradecode",
        order: "desc",
      },
    ],
    initialFilter: [
   
      //   {
      //   field: "prodOrder",
      //   operator: "contains",
      //   value: "ΑΡΠ",
      // },
     
          {
        field: "tradecode",
        operator: "contains",
        value: "ΑΡΠ",
      },
  
      // {
      //   field: "pporderno",
      //   operator: "contains",
      //   value: "POR",
      // },
      // {
      //   field: "ttm",
      //   operator: "gte",
      //   value: 1000,
      // },
    ],
  });

  // Filter handlers (for controlled filter inputs)
  const handleFilterChange = (key: string, value: string) => {
    setFilters([{ field: key, operator: "eq", value }]);
  };
const clearFilters = () => {
  setFilters([]); // This clears all filters by setting the filters state to an empty array
  console.log("Filters cleared");
   
};

  return (
    <div>
      <Button 
            type="primary" 
            onClick={clearFilters}
            icon={<ClearOutlined />} // Optional: Add an icon
          >
            Clear Filters
          </Button>
      <Table
        {...tableProps}
        rowKey="prodOrder"
        bordered
        title={() => (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Title level={4}>Εκκρεμείς Παραγγελίες</Title>
            <Badge count={pageCount*pageSize} showZero style={{ backgroundColor: "#108ee9" }} />
          </div>
        )}
        size="middle"
      >
        <Table.Column
          title={
            <Input
              placeholder="Αναζήτηση Πελάτης"
              allowClear
              onChange={e => handleFilterChange("salesmanName", e.target.value)}
              style={{ width: 150 }}
            />
          }
          key="salesmanName"
          dataIndex={["fintradeSync", "cus", "name"]}
          render={(_, record: PanelProductionOrderExt2) => record.fintradeSync?.cus?.name ?? "-"}
        />
        <Table.Column
          title="Κωδικός Υλικού"
          dataIndex="code"
          sorter
        />
        <Table.Column
          title="Χρόνος"
          dataIndex="time"
          sorter
          render={(time: number | null) => (
  time !== null 
    ? dayjs.duration(time, 'minutes').format('HH:mm')
    : "-"
)}
        />
        <Table.Column
          title="μέτρα"
          dataIndex="ttm"
          sorter
          render={(ttm: number | null) => (
            `${ttm !== null ? ttm  : "-"} m` // Format as HH:mm
          )}
        />
        <Table.Column
          title="Παραγγελία"
          dataIndex={["fintradeSync", "ftrdate"]}
          render={(_, record: PanelProductionOrderExt2) =>
            record.fintradeSync?.ftrdate
              ? dayjs(record.fintradeSync.ftrdate).format("DD/MM/YYYY")
              : "-"
          }
        />
        <Table.Column
          title="Προτεραιότητα"
          key="priority"
          render={(_, record: PanelProductionOrderExt2) => {
            const priority = getPriority(record.fintradeSync?.ftrdate);
            return (
              <Badge
                color={
                  priority === "fresh"
                    ? "green"
                    :
                  priority === "early"
                    ? "green"
                    : priority === "normal"
                    ? "blue"
                    : priority === "late"
                    ? "orange"
                    : "red"
                }
                text={priority}
              />
            );
          }}
        />
        <Table.Column
          title="Ενέργειες"
          key="actions"
          render={(_, record: PanelProductionOrderExt2) => (
            <Button
              size="small"
              onClick={() => alert(record.prodOrder)}
            >
             <EditOutlined />
            </Button>
          )}
        />
      </Table>
    </div>
  );
};

export default PpordersBoxList;




// export const SimpleCoilList: React.FC = () => {
//   const [current, setCurrent] = React.useState(1);
//   const [pageSize, setPageSize] = React.useState(10);
// const [filters, setFilters] = React.useState({});
// const [sorter, setSorter] = React.useState<CrudSort[]>([]);
// const { data, isLoading, error } = useList<PanelProductionOrderExt2>({
//   resource: "panelProduction",
//   liveMode: "auto",
//   pagination: {
//     mode: "server",
//     current,
//     pageSize,
//   },
//   filters: Object.entries(filters)
//     .filter(([_, v]) => !!v)
//     .map(([field, value]) => ({
//       field,
//       operator: "eq",
//       value,
//     })),
//   sorters: sorter.map(({ field, order }) => ({
//     field,
//     order,
//   })),
//   meta: {
//     gqlQuery: GETPANELPRODUCTIONORDERSEXT2,
//   },
// });

//   return (
//     <List title="Λίστα Παραγωγής Πάνελ (με σελιδοποίηση)">
// <Table
//   dataSource={data?.data}
//   loading={isLoading}
//   rowKey="prodOrder"
//   pagination={{
//     current,
//     pageSize,
//     total: data?.total || 0,
//     onChange: (page, size) => {
//       setCurrent(page);
//       setPageSize(size);
//     },
//   }}
//   onChange={(pagination, filters, sorter) => {
//     // Sorting
//     if (!Array.isArray(sorter) && sorter && sorter.field && sorter.order) {
//       setSorter([
//         {
//           field: sorter.field.toString(),
//           order: sorter.order === "ascend" ? "asc" : "desc",
//         },
//       ]);
//     } else {
//       setSorter([]);
//     }

//     // Filtering
//     setFilters({
//       prodOrder: filters.prodOrder?.[0] ?? undefined,
//       pporderno: filters.pporderno?.[0] ?? undefined,
//       tradecode: filters.tradecode?.[0] ?? undefined,
//       code: filters.code?.[0] ?? undefined,
//       productionNo: filters.productionNo?.[0] ?? undefined,
//       salesmanName: filters.salesmanName?.[0] ?? undefined,
//       // ...add others as needed
//     });
//   }}
// >
//   <Table.Column
//     title="Κωδικός Παραγγελίας"
//     dataIndex="prodOrder"
//     sorter={true}
//     filteredValue={filters.prodOrder ? [filters.prodOrder] : undefined}
//     filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => (
//       <div style={{ padding: 8 }}>
//         <input
//           placeholder="Αναζήτηση..."
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={confirm}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <button onClick={confirm} style={{ width: 90 }}>OK</button>
//       </div>
//     )}
//   />

//   <Table.Column
//     title="PPOrder No"
//     dataIndex={["pporderline", "pporderno"]}
//     sorter={false}
//     filteredValue={filters.pporderno ? [filters.pporderno] : undefined}
//     filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => (
//       <div style={{ padding: 8 }}>
//         <input
//           placeholder="PPOrder No..."
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={confirm}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <button onClick={confirm} style={{ width: 90 }}>OK</button>
//       </div>
//     )}
//   />

//   <Table.Column
//     title="Tradecode"
//     dataIndex="tradecode"
//     sorter={true}
//     filteredValue={filters.tradecode ? [filters.tradecode] : undefined}
//     filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => (
//       <div style={{ padding: 8 }}>
//         <input
//           placeholder="Tradecode..."
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={confirm}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <button onClick={confirm} style={{ width: 90 }}>OK</button>
//       </div>
//     )}
//   />

//   <Table.Column
//     title="Material Code"
//     dataIndex="code"
//     sorter={true}
//     filteredValue={filters.code ? [filters.code] : undefined}
//     filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => (
//       <div style={{ padding: 8 }}>
//         <input
//           placeholder="Code..."
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={confirm}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <button onClick={confirm} style={{ width: 90 }}>OK</button>
//       </div>
//     )}
//   />

//   <Table.Column
//     title="Κωδικός Παραγωγής"
//     dataIndex="productionNo"
//     sorter={true}
//     filteredValue={filters.productionNo ? [filters.productionNo] : undefined}
//     filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => (
//       <div style={{ padding: 8 }}>
//         <input
//           placeholder="Production No..."
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={confirm}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <button onClick={confirm} style={{ width: 90 }}>OK</button>
//       </div>
//     )}
//   />

//   <Table.Column
//     title="Πωλητής"
//     dataIndex={["fintradeSync", "salesman", "name"]}
//     sorter={false}
//     filteredValue={filters.salesmanName ? [filters.salesmanName] : undefined}
//     filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => (
//       <div style={{ padding: 8 }}>
//         <input
//           placeholder="Πωλητής..."
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={confirm}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <button onClick={confirm} style={{ width: 90 }}>OK</button>
//       </div>
//     )}
//   />

//   {/* Any additional columns you want (unchanged from before) */}
//   <Table.Column
//     title="Ταχύτητα Panel"
//     dataIndex={["panelSpeed", "speed"]}
//     sorter={false}
//   />
//   <Table.Column
//     title="Ημερομηνία FTR"
//     dataIndex={["fintradeSync", "ftrdate"]}
//     sorter={false}
//     render={date => date ? new Date(date).toLocaleDateString("el-GR") : "-"}
//   />
//   <Table.Column
//     title="Πελάτης"
//     dataIndex={["fintradeSync", "cus", "name"]}
//     sorter={false}
//   />
//   <Table.Column
//     title="Περιοχή Πελάτη"
//     dataIndex={["fintradeSync", "cus", "geo", "descr"]}
//     sorter={false}
//   />
// </Table>


//       {error && <p style={{ color: "red" }}>Σφάλμα: {error.message}</p>}
//     </List>
//   );
// };

// export default SimpleCoilList;
