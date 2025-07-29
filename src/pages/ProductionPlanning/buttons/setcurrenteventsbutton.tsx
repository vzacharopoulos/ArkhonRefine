import React from "react";
import { Button } from "antd";
import { EventInput } from "@fullcalendar/core";
import { useCurrentEvents } from "@/contexts/currentEventsProvider";
import dayjs from "dayjs";
interface SetCurrentEventsButtonProps {
  events: EventInput[];
}

export const SetCurrentEventsButton: React.FC<SetCurrentEventsButtonProps> = ({
  events,
}) => {
  const { setCurrentEvents } = useCurrentEvents();
  const handleClick = () => {
    setCurrentEvents(prev => {
      const ids = new Set(events.map(ev => String(ev.id).split("-part-")[0]));
      const filtered = prev.filter(
        ev => !ids.has(String(ev.id).split("-part-")[0])
      );
      return [...filtered, ...events,...dummyEvents];
    });
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      style={{ position: "fixed", bottom: 64, right: 24, zIndex: 1000 }}
    >
      set current events
    </Button>
  );
};





export const dummyEvents: EventInput[] = [
  {
    id: "101",
    title: "Demo Event 101",
    start: dayjs().add(1, "day").hour(8).minute(0).toDate(),
    end: dayjs().add(1, "day").hour(10).minute(0).toDate(),
    color: "blue",
    extendedProps: { status: 14, panelcode: "P-001" },
  },
  {
    id: "102",
    title: "Demo Event 102",
    start: dayjs().add(1, "day").hour(11).minute(0).toDate(),
    end: dayjs().add(1, "day").hour(13).minute(0).toDate(),
    color: "green",
    extendedProps: { status: 14, panelcode: "P-002" },
  },
];