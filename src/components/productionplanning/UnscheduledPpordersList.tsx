import { calculateTotalTime, EventTooltip } from "@/pages/ProductionPlanning/event-utils";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";
import { StatusTag } from "@/utilities";
import { Menu, Typography } from "antd";
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
}


export const OrderList: React.FC<OrderListProps> = ({
  unscheduledorders,
  selectedOrderId,
  onSelectOrder,
  totalTime,
}) => (
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
            {unscheduledorders.map((order) => (
              <Menu.Item key={order.id}>
            <EventTooltip event={args.event}>
                  <div
                    className="fc-event"
                    style={{ whiteSpace: "normal", lineHeight: 1.4 }}
                    data-event={JSON.stringify({
                      id: String(order.id),
                      title: `${order.pporderno} - ${order.panelcode}`,
                    })}
                  >
                    {order.panelcode} {order.id === selectedOrderId && (
                      <Text strong> - {totalTime.formatted}</Text>
                    )}
                    <div>
                      <StatusTag status={order.status} />
                    </div>
                  </div>
                </EventTooltip>
              </Menu.Item>
            ))}
          </Menu>
);