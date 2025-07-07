import { WorkingHoursConfig } from "@/pages/ProductionPlanning/calendarpage";
import { calculateTotalTime, EventTooltip } from "@/pages/ProductionPlanning/event-utils";
import { PPOrder } from "@/pages/ProductionPlanning/productioncalendartypes";
import { STATUS_MAP, StatusTag } from "@/utilities";
import { Menu, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
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
                  `κατάσταση: ${STATUS_MAP[order.status || 0] || "Άγνωστη"}`;
                return (
                  <Menu.Item key={order.id}>
                    <EventTooltip tooltip={tooltip} status={order.status}>
                      <div
                        className="fc-event"
                        style={{ whiteSpace: "normal", lineHeight: 1.4 }}
                        data-event={JSON.stringify({
                          id: (order.id),
                          title: `${order.pporderno} - ${order.panelcode}`,
                          
                          extendedProps: { tooltip, status: order.status },
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



// Helper function to get working hours for a specific date
// Helper function to get date range for background events
function getDateRange(days: number): Dayjs[] {
  const today = dayjs();
  const start = today.subtract(days / 2, "day");
  return Array.from({ length: days }, (_, i) => start.add(i, "day"));
}

// Helper function to generate non-working hour background events
export function generateNonWorkingHourBackgroundEvents(
  dailyWorkingHours: Record<string, WorkingHoursConfig>,
  defaultWorkingHours: Record<number, WorkingHoursConfig>
): EventInput[] {
  const allDays = getDateRange(60);
  const events: EventInput[] = [];

  for (const day of allDays) {
    const dateStr = day.format("YYYY-MM-DD");
    const dayOfWeek = day.day();
    
    // Get configuration for this specific day
    const specificConfig = dailyWorkingHours[dateStr];
    const config = specificConfig || defaultWorkingHours[dayOfWeek];
    
    if (!config) continue;

    // If it's not a working day, block the full day
    if (!config.workingDays.includes(dayOfWeek)) {
      events.push({
        start: `${dateStr}T00:00:00`,
        end: `${dateStr}T23:59:59`,
        display: 'background',
        color: 'rgb(158, 128, 128)',
        title: 'αργία',
      });
      continue;
    }

    // Format time strings with proper padding
    const startTimeStr = `${String(config.startHour).padStart(2, '0')}:${String(config.startMinute).padStart(2, '0')}:00`;
    const endTimeStr = `${String(config.endHour).padStart(2, '0')}:${String(config.endMinute).padStart(2, '0')}:00`;

    // Before working hours - only if start time is after 00:00
    if (config.startHour > 0 || config.startMinute > 0) {
      events.push({
        start: `${dateStr}T00:00:00`,
        end: `${dateStr}T${startTimeStr}`,
        display: 'background',
        color: 'rgba(188, 99, 99, 0.51)',
        title: 'πριν την έναρξη',
      });
    }

    // After working hours - only if end time is before 24:00 (midnight)
    if (config.endHour < 24) {
      events.push({
        start: `${dateStr}T${endTimeStr}`,
        end: `${dateStr}T23:59:59`,
        display: 'background',
        color: 'rgba(188, 99, 99, 0.51)',
        title: 'λήξη εργασίας',
      });
    } else if (config.endHour === 24 && config.endMinute > 0) {
      // Handle cases where endHour is 24 but endMinute is not 0
      // This shouldn't normally happen, but if it does, we treat it as ending at midnight
      // No background event needed as it goes to the end of the day
    }
    // If endHour is 24 and endMinute is 0, working hours go to midnight, so no "after hours" event needed
  }

  return events;
}
