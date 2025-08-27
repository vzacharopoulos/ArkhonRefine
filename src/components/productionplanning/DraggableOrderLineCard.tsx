// import React from 'react';
// import { Card, Col, Row, Typography } from 'antd';
// import { Draggable } from 'react-beautiful-dnd';
// import dayjs from 'dayjs';
// import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
// import { PPOrderLine } from '@/pages/ProductionPlanning/productioncalendartypes';

// const { Text } = Typography;

// interface DraggableOrderLineCardProps {
//   line: PPOrderLine;
//   index: number;
//   expandedLineId: number | null;
//   setExpandedLineId: (id: number | null) => void;
// }

// export const DraggableOrderLineCard: React.FC<DraggableOrderLineCardProps> = ({
//   line,
//   index,
//   expandedLineId,
//   setExpandedLineId,
// }) => {
//   return (
//     <Draggable draggableId={line.id.toString()} index={index}>
//       {(provided, snapshot) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           style={{
//             ...provided.draggableProps.style,
//             opacity: snapshot.isDragging ? 0.8 : 1,
//           }}
//         >
//           <Col span={24}>
//             <Card
//               size="small"
//               style={{
//                 borderRadius: 8,
//                 marginBottom: 6,
//                 background: snapshot.isDragging ? "#e6f7ff" : "#f7f9fa",
//                 boxShadow: snapshot.isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 6px #eee",
//                 cursor: snapshot.isDragging ? "grabbing" : "grab",
//                 border: snapshot.isDragging ? "2px solid #1890ff" : "1px solid #d9d9d9",
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setExpandedLineId(expandedLineId === line.id ? null : line.id);
//               }}
//               title={
//                 <span>
//                   <Text strong>{line.tradecodeCustomer?.name ?? `Piece #${line.id}`}</Text>
//                   <Text type="secondary" style={{ marginLeft: 8 }}>
//                     Priority: {line.priority ?? index + 1}
//                   </Text>
//                   <Text type="secondary" style={{ marginLeft: 8 }}>
//                     {dayjs(line.tradecodeCustomer?.ftrdate).format("DD/MM/YYYY")}
//                   </Text>
//                   <span style={{ marginLeft: 8 }}>
//                     {expandedLineId === line.id ? <DownOutlined /> : <RightOutlined />}
//                   </span>
//                   <span style={{ marginLeft: 8, fontSize: '12px', color: '#999' }}>
//                     ↕ Drag to reorder
//                   </span>
//                 </span>
//               }
//             >
//               {expandedLineId === line.id && (
//                 <Row gutter={8}>
//                   <Col span={12}><Text type="secondary">παχος <ArrowDownOutlined /></Text> <Text>{line.prodOrdersView?.thickin}</Text></Col>
//                   <Col span={12}><Text type="secondary">παχος <ArrowUpOutlined /></Text> <Text>{line.prodOrdersView?.thickout}</Text></Col>
//                   <Col span={12}><Text type="secondary">χρωμα <ArrowDownOutlined /> :</Text> <Text>{line.prodOrdersView?.cin}</Text></Col>
//                   <Col span={12}><Text type="secondary">χρωμα <ArrowUpOutlined /> :</Text> <Text>{line.prodOrdersView?.cout}</Text></Col>
//                   <Col span={12}><Text type="secondary"><ArrowDownOutlined /> </Text> <Text>{line.prodOrdersView?.moldin ? line.prodOrdersView?.moldin : "N/A"}</Text></Col>
//                   <Col span={12}><Text type="secondary"> <ArrowUpOutlined /> </Text> <Text>{line.prodOrdersView?.moldout ? line.prodOrdersView?.moldout : "N/A"}</Text></Col>
//                   <Col span={12}><Text type="secondary">χρονος:</Text> <Text>{line.prodOrdersView?.time ? dayjs.duration(line.prodOrdersView.time, 'minutes').format("H[ω] m[λ]") : "0ω 0λ"}</Text></Col>
//                   <Col span={12}><Text type="secondary">μετρα:</Text> <Text>{line.prodOrdersView?.ttm ? line.prodOrdersView?.ttm.toFixed(0) : 0}μ</Text></Col>
//                 </Row>
//               )}
//             </Card>
//           </Col>
//         </div>
//       )}
//     </Draggable>
//   );
// };
