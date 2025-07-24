// WorkingHoursModal.tsx
import React from "react";
import { Modal, TimePicker, Typography, Checkbox } from "antd";
import { Dayjs } from "dayjs";
import { WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";
import { dayToGreekName } from "@/pages/ProductionPlanning/helpers/daymaptonumber";



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
    title={`ώρισε ώρες εργασίας ${date?.format("YYYY-MM-DD")} (${dayToGreekName(date?.day()??0)}){$date.hour()}`}
    open={open}
    onCancel={onCancel}
    onOk={onOk}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <Text>έναρξη εργασίας:</Text>
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
          <Text>λήξη εργασίας:</Text>
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
        <Checkbox
          checked={config.isWorkingDay}
          onChange={(e) =>
            onChange({ ...config, isWorkingDay: e.target.checked })
          }
        >
          εργασιμη μέρα 
        </Checkbox>
      </div>
    </div>
  </Modal>
);