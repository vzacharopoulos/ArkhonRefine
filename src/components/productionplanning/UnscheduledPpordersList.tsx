
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
               {unscheduledorders.map((order) => {
                const tooltip = `${order.pporderno ?? ""} - ${order.panelcode ?? ""}\n` +
                  `κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}\n` +
                  `εκτ εναρξη: ${order.estStartDate || "Άγνωστη"}\n`+
                  `εκτ λήξη: ${order.estFinishDate || "Άγνωστη"}\n`;
                   const color = statusColorMap[order.status || 0] || "blue";
                const theoreticalTime = totalTime.formatted;
              
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
                           start:order.estStartDate,
                           end:order.estFinishDate,
                          extendedProps:
                           { tooltip,
                             status: order.status,
                             duration:totalTime.hours*60+totalTime.minutes,
                             createDate:order.createDate,
                            panelcode:order.panelcode
                             },
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
                );
              })}
            </Menu>
);

