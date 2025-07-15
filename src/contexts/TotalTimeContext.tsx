// src/context/TotalTimeContext.tsx
import React, { createContext, useContext } from "react";

interface TotalTimeEntry {
  hours: number;
  minutes: number;
  formatted: string;
  totalMinutes: number;
}

interface TotalTimeContextType {
  totalTimeByOrderId: Record<number, TotalTimeEntry>;
}

const TotalTimeContext = createContext<TotalTimeContextType | undefined>(undefined);

export const useTotalTimeContext = () => {
  const context = useContext(TotalTimeContext);
  if (!context) {
    throw new Error("useTotalTimeContext must be used within a TotalTimeProvider");
  }
  return context;
};

export const TotalTimeProvider: React.FC<{
  value: TotalTimeContextType;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <TotalTimeContext.Provider value={value}>
    {children}
  </TotalTimeContext.Provider>
);
