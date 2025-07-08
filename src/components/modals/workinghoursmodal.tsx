// WorkingHoursModal.tsx
import React from "react";
import { Modal, TimePicker, Typography, Checkbox } from "antd";
import { Dayjs } from "dayjs";
import { WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";



const { Text } = Typography;

interface WorkingHoursModalProps {
  open: boolean;
  date: Dayjs | null;
  config: WorkingHoursConfig;
  onChange: (config: WorkingHoursConfig) => void;
  onCancel: () => void;
  onOk: () => void;
}

export const WorkingHoursModal: React.FC<WorkingHoursModalProps> = ({
  open,
  date,
  config,
  onChange,
  onCancel,
  onOk,
}) => (
  <Modal
    title={`Set Working Hours for ${date?.format("YYYY-MM-DD")}`}
    open={open}
    onCancel={onCancel}
    onOk={onOk}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <Text>Start Time:</Text>
          <TimePicker
            value={date?.hour(config.startHour).minute(config.startMinute)}
            format="HH:mm"
            onChange={(time) => {
              if (time) {
                onChange({
                  ...config,
                  startHour: time.hour(),
                  startMinute: time.minute(),
                });
              }
            }}
          />
        </div>
        <div>
          <Text>End Time:</Text>
          <TimePicker
            value={date?.hour(config.endHour).minute(config.endMinute)}
            format="HH:mm"
            onChange={(time) => {
              if (time) {
                onChange({
                  ...config,
                  endHour: time.hour(),
                  endMinute: time.minute(),
                });
              }
            }}
          />
        </div>
      </div>

      <div>
        <Text>Working Days:</Text>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <Checkbox
              key={index}
              checked={config.workingDays.includes(index)}
              onChange={(e) => {
                const newDays = e.target.checked
                  ? [...config.workingDays, index]
                  : config.workingDays.filter((d) => d !== index);
                onChange({ ...config, workingDays: newDays });
              }}
            >
              {day}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  </Modal>
);
