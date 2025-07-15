  import React, { useEffect, useMemo } from "react";
import { Layout, Checkbox, Divider, Typography, List } from "antd";
import { Draggable } from "@fullcalendar/interaction";
import { EventInput, formatDate } from "@fullcalendar/core";
import { PPOrder, PPOrderLine } from "./productioncalendartypes";
import { OrderList } from "@/components/productionplanning/UnscheduledPpordersList";
import { OrderlinesList } from "@/components/productionplanning/OrderlinesList";


const { Sider } = Layout;
const { Title,Text  } = Typography;
  
  export interface SidebarProps {
    weekendsVisible: boolean;
    onToggleWeekends: () => void;
    currentEvents: EventInput[];
    onToggleCurrentEvents: () => void;
    unscheduledorders: PPOrder[];
    selectedOrderId: number | null;
    onSelectOrder: (id: number) => void;
    orderLines: PPOrderLine[];
    orderLinesLoading: boolean;
    totalTime: {
    hours: number;
    minutes: number;
    formatted: string;
  };
  totalMeter:number;
  }
  
  
  export const Sidebar: React.FC<SidebarProps> = ({
    weekendsVisible,
    onToggleWeekends,
    currentEvents,
    onToggleCurrentEvents,
    unscheduledorders,
    selectedOrderId,
    onSelectOrder,
    totalTime,
     totalMeter,
    orderLines,
    orderLinesLoading


  }) => {
    const renderSidebarEvent = (event: EventInput) => (
      <List.Item key={event.id}>
        <Text strong>
          {event.start &&
            formatDate(event.start as Date, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
        </Text>
        <Text> {event.title}</Text>
      </List.Item>
    );



    useEffect(() => {
      let containerEl = document.getElementById("external-events");
      if (containerEl) {
        new Draggable(containerEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            const data = eventEl.getAttribute("data-event");
            return data ? JSON.parse(data) : {};
            
          },
               minDistance: 10,
          longPressDelay: 200,
        });
      }
    }, []);


    return (
      <Sider width={300} style={{ background: "#fff", padding: 2 }}>
        <div className="demo-app-sidebar-section" id="external-events">
          <Title level={4}>Προγραμματισμός Master</Title>
          <OrderList unscheduledorders={unscheduledorders}
           selectedOrderId={selectedOrderId}
             onSelectOrder={onSelectOrder}
             totalTime={totalTime}
             totalMeter={totalMeter}
             />
             
        </div>

        <Divider />

        <div className="demo-app-sidebar-section">
          <Checkbox checked={weekendsVisible} onChange={onToggleWeekends}>
            Toggle weekends
          </Checkbox>
        </div>
        <div className="demo-app-sidebar-section">
          <Checkbox checked={weekendsVisible} onChange={onToggleCurrentEvents}>
            Toggle recent masters
          </Checkbox>
        </div>


        <Divider />

        {selectedOrderId && (
          <div className="demo-app-sidebar-section">
            <Title level={5}>Κομμάτια Εντολής</Title>
           <OrderlinesList orderLines={orderLines} orderLinesLoading={orderLinesLoading}/>
          </div>
        )}
      </Sider>
    );
  };
