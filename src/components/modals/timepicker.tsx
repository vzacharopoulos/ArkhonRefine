// TimeRangePicker.tsx
import React from "react";
import { TimePicker, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { Text } = Typography;

interface TimeRangePickerProps {
  label: string;
  time: Dayjs | null;
  onChange: (time: Dayjs) => void;
}

export const TimeInput: React.FC<TimeRangePickerProps> = ({ label, time, onChange }) => (
  <div>
    <Text>{label}</Text>
    <TimePicker
      value={time}
      format="HH:mm"
      onChange={(val) => {
        if (val && time) onChange(time.hour(val.hour()).minute(val.minute()));
      }}
    />
  </div>
);