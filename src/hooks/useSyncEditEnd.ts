import { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { EventInput } from "@fullcalendar/core";

export const useSyncEditEnd = (
  selectedEvent: EventInput | null,
  editStart: Dayjs | null,
  setEditEnd: (date: Dayjs | null) => void
) => {
  useEffect(() => {
    if (!selectedEvent || !editStart || !selectedEvent.start || !selectedEvent.end) return;

    const originalStart = dayjs(selectedEvent.start as Date);
    const originalEnd = dayjs(selectedEvent.end as Date);
    const delta = editStart.diff(originalStart, "minute");

    setEditEnd(originalEnd.add(delta, "minute"));
  }, [selectedEvent, editStart, setEditEnd]);
};