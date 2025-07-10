// StatusTag.tsx
import React from "react";
import { Tag } from "antd";





 export const STATUS_MAP: Record<number, string> = {
  [-1]: "ΑΚΥΡΩΜΕΝΟ",
  0:"ΔΙΑΘΕΣΙΜΟ ΔΕΜΑ",
  1: "ΔΗΜΙΟΥΡΓΗΘΗΚΕ",
  2: "ΣΕ ΕΠΕΞΕΡΓΑΣΙΑ",
  3: "ΣΕ ΠΑΥΣΗ",
  4: "ΟΛΟΚΛΗΡΩΜΕΝΗ ΕΠΕΞΕΡΓΑΣΙΑ",
  14: "ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ",
  
};




interface StatusTagProps {
  status?: number;
}

export const statusColorMap: Record<number, string> = {
  1: "gold",
  2: "blue",
  3: "cyan",
  4: "green",
  14: "purple",
  [-1]: "red",
};

export const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  if (status === undefined) return null;

  const label = STATUS_MAP[status] || `Unknown (${status})`;
  const color = statusColorMap[status] || "default";

  return <Tag color={color}>{label}</Tag>;
};