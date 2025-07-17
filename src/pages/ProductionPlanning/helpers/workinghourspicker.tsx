import React from "react";
import { DatePicker, Typography } from "antd";
import { Dayjs } from "dayjs";

const { Title } = Typography;

interface WorkingHoursPickerProps {
  onSelectDate: (date: Dayjs) => void;
}

export const WorkingHoursPicker: React.FC<WorkingHoursPickerProps> = ({
  onSelectDate,
}) => (
  <div style={{ marginBottom: 16 }}>
    <Title level={5}>αλλαγή ωρών λειτουργίας</Title>
    <DatePicker
      placeholder="διάλεξε ημερα"
      onChange={(date) => {
        if (date) {
          onSelectDate(date);
        }
      }}
      style={{ width: "100%" }}
    />
  </div>
);