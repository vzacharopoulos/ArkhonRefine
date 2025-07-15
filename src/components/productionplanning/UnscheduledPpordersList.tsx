import { useTotalTimeContext } from "@/contexts/TotalTimeContext";
import { calculateTotalTime, EventTooltip } from "@/pages/ProductionPlanning/event-utils";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";
import { STATUS_MAP, statusColorMap, StatusTag } from "@/utilities";
import { Menu, Typography } from "antd";
import dayjs, { Dayjs, duration } from "dayjs";
import { EventInput } from "fullcalendar";
import { useMemo } from "react";

const { Title, Text } = Typography;

interface OrderListProps {
  unscheduledorders: PPOrder[];
  selectedOrderId: number | null;
  onSelectOrder: (id: number) => void;
  totalTime: {
    hours: number;
    minutes: number;
    formatted: string;
  }
  totalMeter: number;
}

export const OrderList: React.FC<OrderListProps> = ({
  unscheduledorders,
  selectedOrderId,
  onSelectOrder,
  totalTime: propTotalTime, // Rename to avoid conflict
  totalMeter
}) => {
  const { totalTimeByOrderId } = useTotalTimeContext();
  console.log(totalTimeByOrderId);


  

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedOrderId !== null ? [String(selectedOrderId)] : []}
      onClick={({ key }) => onSelectOrder(Number(key))}
      style={{
        border: "none",
        fontSize: 13,
        overflowY: "auto",
      }}
    >
      {unscheduledorders.map((order) => {
        // Use context data for each order's total time
        const orderTotalTime = totalTimeByOrderId[order.id]?.formatted ?? "Άγνωστη";
        
        const tooltip = `${order.pporderno ?? ""} - ${order.panelcode ?? ""}\n` +
          `εκτ εναρξη: ${dayjs(order.estStartDate) || "Άγνωστη"}\n` +
          `εκτ λήξη: ${dayjs(order.estFinishDate) || "Άγνωστη"}\n` +
          `θεωρητικο μήκος: ${totalMeter.toFixed(0) || "Άγνωστη"}\n` +
          `θεωρητική διάρκεια: ${orderTotalTime}\n`;
        
        const color = statusColorMap[order.status || 0] || "blue";
        
        return (
          <Menu.Item key={order.id}>
            <EventTooltip tooltip={tooltip} status={order.status}>
              <div
                className="fc-event"
                style={{ whiteSpace: "normal", lineHeight: 1.4 }}
                data-event={JSON.stringify({
                  id: (order.id),
                  title: `${order.pporderno} - ${order.panelcode}`,
                  color,
                  start: order.estStartDate,
                  end: order.estFinishDate,
                  extendedProps: {
                    tooltip,
                    status: order.status,
                    duration: totalTimeByOrderId[order.id]?.totalMinutes ?? 0,
                    createDate: order.createDate,
                    panelcode: order.panelcode,
                  },
                })}
              >
                {order.panelcode}
                {order.id === selectedOrderId && (
                  <Text strong> - {orderTotalTime}</Text>
                )}
                <div>
                  <StatusTag status={order.status} />
                </div>
              </div>
            </EventTooltip>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};