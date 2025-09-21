import React from "react";
import { Checkbox } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { RescheduleOrdersButton } from "../buttons/rescheduleordersbutton";
import { SlotSettingsPopover } from "../buttons/slotsettingspopover";

interface CalendarControlsProps {
  weekendsVisible: boolean;
  onToggleWeekends: () => void;
  onToggleCurrentEvents: () => Promise<any>;
  refetchPporders: () => void;
  slotDurationLabel: string;
  toggleSlotDuration: () => void;
  slotModeLabel: string;
  toggleSlotMinMax: () => void;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
  weekendsVisible,
  onToggleWeekends,
  onToggleCurrentEvents,
  refetchPporders,
  slotDurationLabel,
  toggleSlotDuration,
  slotModeLabel,
  toggleSlotMinMax,
}) => {
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginBottom: 16,
        padding: "8px 16px",
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 100,
      }}
    >
      <RescheduleOrdersButton
        refetchPporders={refetchPporders}
        style={{
          position: "relative",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      />

      <Checkbox checked={weekendsVisible} onChange={onToggleWeekends}>
        με/χωρίς σ/κ
      </Checkbox>

      <Checkbox checked={weekendsVisible} onChange={onToggleCurrentEvents}>
        βάλτες ξανά σε σειρά
        <ExclamationCircleOutlined style={{ color: "#ff4d4f", marginLeft: 5 }} />
      </Checkbox>

      <SlotSettingsPopover
        slotDurationLabel={slotDurationLabel}
        toggleSlotDuration={toggleSlotDuration}
        slotModeLabel={slotModeLabel}
        toggleSlotMinMax={toggleSlotMinMax}
      />
    </div>
  );
};