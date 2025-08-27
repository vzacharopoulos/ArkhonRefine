// import React, { useState } from 'react';
// import { Card, Typography, Space } from 'antd';
// import { DraggableOrderLinesList } from './DraggableOrderLinesList';
// import { PPOrderLine } from '@/pages/ProductionPlanning/productioncalendartypes';

// const { Title } = Typography;

// // Mock data for testing
// const mockOrderLines: PPOrderLine[] = [
//   {
//     id: 1,
//     pporderno: "PP001",
//     custporderno: "CUST001",
//     status: 1,
//     priority: 1,
//     tradecodeCustomer: {
//       name: "Order Line 1",
//       ftrdate: new Date("2024-01-15"),
//       tradecode: "TC001"
//     },
//     prodOrdersView: {
//       isCanceled: 0,
//       speed: 100,
//       ttm: 50,
//       time: 120,
//       cin: "Red",
//       cout: "Blue",
//       moldin: "M1",
//       moldout: "M2",
//       thickin: "2mm",
//       thickout: "3mm",
//       count: 1
//     },
//     pporders: {
//       id: 1,
//       pporderno: "PP001",
//       status: 1
//     }
//   },
//   {
//     id: 2,
//     pporderno: "PP001",
//     custporderno: "CUST002",
//     status: 1,
//     priority: 2,
//     tradecodeCustomer: {
//       name: "Order Line 2",
//       ftrdate: new Date("2024-01-16"),
//       tradecode: "TC002"
//     },
//     prodOrdersView: {
//       isCanceled: 0,
//       speed: 120,
//       ttm: 60,
//       time: 180,
//       cin: "Green",
//       cout: "Yellow",
//       moldin: "M3",
//       moldout: "M4",
//       thickin: "4mm",
//       thickout: "5mm",
//       count: 1
//     },
//     pporders: {
//       id: 1,
//       pporderno: "PP001",
//       status: 1
//     }
//   },
//   {
//     id: 3,
//     pporderno: "PP001",
//     custporderno: "CUST003",
//     status: 1,
//     priority: 3,
//     tradecodeCustomer: {
//       name: "Order Line 3",
//       ftrdate: new Date("2024-01-17"),
//       tradecode: "TC003"
//     },
//     prodOrdersView: {
//       isCanceled: 0,
//       speed: 90,
//       ttm: 40,
//       time: 90,
//       cin: "Purple",
//       cout: "Orange",
//       moldin: "M5",
//       moldout: "M6",
//       thickin: "1mm",
//       thickout: "2mm",
//       count: 1
//     },
//     pporders: {
//       id: 1,
//       pporderno: "PP001",
//       status: 1
//     }
//   }
// ];

// export const DragDropDemo: React.FC = () => {
//   const [orderLines, setOrderLines] = useState<PPOrderLine[]>(mockOrderLines);

//   const handleOrderLinesChange = (newOrderLines: PPOrderLine[]) => {
//     setOrderLines(newOrderLines);
//     console.log('Order lines updated:', newOrderLines.map(line => ({ id: line.id, priority: line.priority })));
//   };

//   return (
//     <Card style={{ margin: 16 }}>
//       <Space direction="vertical" style={{ width: '100%' }}>
//         <Title level={3}>Drag and Drop Order Lines Demo</Title>
//         <p>Drag the order line cards to reorder them. The priority will be updated automatically.</p>
        
//         <DraggableOrderLinesList
//           orderLines={orderLines}
//           orderLinesLoading={false}
//           onOrderLinesChange={handleOrderLinesChange}
//         />
        
//         <div style={{ marginTop: 16 }}>
//           <Title level={4}>Current Order:</Title>
//           <ul>
//             {orderLines.map((line, index) => (
//               <li key={line.id}>
//                 {index + 1}. {line.tradecodeCustomer?.name} (Priority: {line.priority})
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Space>
//     </Card>
//   );
// };

