import React from "react";
import { Button, Popover, Space, Tooltip } from "antd";
import { SettingOutlined, ClockCircleOutlined, CompressOutlined, ExpandOutlined } from "@ant-design/icons";

interface SlotSettingsPopoverProps {
  slotDurationLabel: string;
  toggleSlotDuration: () => void;
  slotModeLabel: string;
  toggleSlotMinMax: () => void;
}

export const SlotSettingsPopover: React.FC<SlotSettingsPopoverProps> = ({
  slotDurationLabel,
  toggleSlotDuration,
  slotModeLabel,
  toggleSlotMinMax,
}) => {
const popoverContent = (
  <Space direction="vertical" style={{ textAlign: "center" }}>
    <Tooltip title="Προβολή όλων των ωρών ή μόνο εργάσιμων">
      <Button
        icon={slotModeLabel === "Όλες οι ώρες" ? <ExpandOutlined /> : <CompressOutlined />}
        onClick={toggleSlotMinMax}
        block
        type="default"
      >
        {slotModeLabel}
      </Button>
    </Tooltip>

    <Tooltip title="Εναλλαγή μεταξύ 30 και 60 λεπτών ανά slot">
      <Button
        icon={<ClockCircleOutlined />}
        onClick={toggleSlotDuration}
        block
        type="default"
      >
        {slotDurationLabel}
      </Button>
    </Tooltip>
  </Space>
);


  return (
    <div style={{ textAlign: "right", marginBottom: 8 }}>
      <Popover content={popoverContent} trigger="click" placement="bottomRight">
        <Tooltip title="Slot Settings">
          <Button icon={<SettingOutlined />} />
        </Tooltip>
      </Popover>
    </div>
  );
};




// import React from "react";
// import { Button, Popover, Space, Tooltip } from "antd";
// import { SettingOutlined, ClockCircleOutlined, CompressOutlined, ExpandOutlined } from "@ant-design/icons";

// interface SlotSettingsPopoverProps {
//   slotDurationLabel: string;
//   toggleSlotDuration: () => void;
//   slotModeLabel: string;
//   toggleSlotMinMax: () => void;
// }

// export const SlotSettingsPopover: React.FC<SlotSettingsPopoverProps> = ({
//   slotDurationLabel,
//   toggleSlotDuration,
//   slotModeLabel,
//   toggleSlotMinMax,
// }) => {
//   const popoverContent = (
//     <Space direction="vertical" style={{ textAlign: "center" }}>
//       <Tooltip title="αλλαξε το ευρος των ωρων που εμφανιονται στο ημερολογιο">
//         <Button
//           icon={<ClockCircleOutlined />}
//           type="default"
//           onClick={toggleSlotMinMax}
//           block
//         >
//           {slotModeLabel}
//         </Button>
//       </Tooltip>
//       <Tooltip title="σμικρυνση/επεκταση του ημερολογιου">
//         <Button
//           icon={slotDurationLabel === "Ολόκληρο" ? <ExpandOutlined /> : <CompressOutlined />}
//           onClick={toggleSlotDuration}
//           block
//           type="default"
//         >
//           {slotDurationLabel}
//         </Button>
//       </Tooltip>
//     </Space>
//   );