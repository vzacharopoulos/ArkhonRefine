// EditEventModal.tsx
import React from "react";
import { Modal, Button } from "antd";
import { Dayjs } from "dayjs";
import { EventInput } from "@fullcalendar/core";
import { TimeInput } from "./timepicker";

interface EditEventModalProps {
  open: boolean;
  event: EventInput | null;
  editStart: Dayjs | null;
  editEnd: Dayjs | null;
  onCancel: () => void;
  onDelete: () => void;
  onSave: () => void;
  onChangeStart: (time: Dayjs) => void;
  onChangeEnd: (time: Dayjs) => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  event,
  editStart,
  editEnd,
  onCancel,
  onDelete,
  onSave,
  onChangeStart,
  onChangeEnd,
}) => (
  <Modal
    open={open}
    title="αλλάξτε ώρα"
    onCancel={onCancel}
    footer={[
      <Button key="delete" danger onClick={onDelete}>Διαγραφή</Button>,
      <Button key="cancel" onClick={onCancel}>Άκυρο</Button>,
      <Button key="submit" type="primary" onClick={onSave}>Αποθήκευση</Button>,
    ]}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TimeInput label="Start Time:" time={editStart} onChange={onChangeStart} />
      <TimeInput label="End Time:" time={editEnd} onChange={onChangeEnd} />
    </div>
  </Modal>
);