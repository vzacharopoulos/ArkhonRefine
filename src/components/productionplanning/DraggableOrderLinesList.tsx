// import React, { useState, useCallback } from 'react';
// import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
// import { Row, Spin, message } from 'antd';
// import { PPOrderLine } from '@/pages/ProductionPlanning/productioncalendartypes';
// import { DraggableOrderLineCard } from './DraggableOrderLineCard';
// import { useUpdatePporderlinePriority } from '@/hooks/useUpdatePporderlinePriority';

// interface DraggableOrderLinesListProps {
//   orderLines: PPOrderLine[];
//   orderLinesLoading: boolean;
//   onOrderLinesChange?: (newOrderLines: PPOrderLine[]) => void;
// }

// export const DraggableOrderLinesList: React.FC<DraggableOrderLinesListProps> = ({
//   orderLines,
//   orderLinesLoading,
//   onOrderLinesChange,
// }) => {
//   const [expandedLineId, setExpandedLineId] = useState<number | null>(null);
//   const [localOrderLines, setLocalOrderLines] = useState<PPOrderLine[]>(orderLines);
//   const { updatePporderlinePriority } = useUpdatePporderlinePriority();

//   // Update local state when props change
//   React.useEffect(() => {
//     setLocalOrderLines(orderLines);
//   }, [orderLines]);

//   const handleDragEnd = useCallback(async (result: DropResult) => {
//     if (!result.destination) {
//       return;
//     }

//     const { source, destination } = result;

//     if (source.index === destination.index) {
//       return;
//     }

//     // Create new array with reordered items
//     const newOrderLines = Array.from(localOrderLines);
//     const [removed] = newOrderLines.splice(source.index, 1);
//     newOrderLines.splice(destination.index, 0, removed);

//     // Update local state immediately for responsive UI
//     setLocalOrderLines(newOrderLines);
//     onOrderLinesChange?.(newOrderLines);

//     // Update priorities in the database
//     try {
//       const updates = newOrderLines.map((line, index) => ({
//         id: line.id,
//         priority: index + 1,
//       }));

//       // Update all priorities in sequence
//       for (const update of updates) {
//         await updatePporderlinePriority(update.id, update.priority);
//       }

//       message.success('Order line priorities updated successfully');
//     } catch (error) {
//       console.error('Error updating priorities:', error);
//       message.error('Failed to update order line priorities');
      
//       // Revert to original order on error
//       setLocalOrderLines(orderLines);
//       onOrderLinesChange?.(orderLines);
//     }
//   }, [localOrderLines, updatePporderlinePriority, onOrderLinesChange, orderLines]);

//   if (orderLinesLoading) {
//     return <Spin spinning={true} />;
//   }

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="order-lines">
//         {(provided, snapshot) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             style={{
//               minHeight: 100,
//               background: snapshot.isDraggingOver ? '#f0f8ff' : 'transparent',
//               borderRadius: 8,
//               padding: snapshot.isDraggingOver ? 8 : 0,
//             }}
//           >
//             <Row gutter={[8, 8]}>
//               {localOrderLines.map((line, index) => (
//                 <DraggableOrderLineCard
//                   key={line.id}
//                   line={line}
//                   index={index}
//                   expandedLineId={expandedLineId}
//                   setExpandedLineId={setExpandedLineId}
//                 />
//               ))}
//               {provided.placeholder}
//             </Row>
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

