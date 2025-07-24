import React, { createContext, useContext } from "react";
import { EventInput } from "@fullcalendar/core";

interface CurrentEventsContextType {
  currentEvents: EventInput[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

const CurrentEventsContext = createContext<CurrentEventsContextType | undefined>(
  undefined
);

export const useCurrentEvents = () => {
  const context = useContext(CurrentEventsContext);
  if (!context) {
    throw new Error(
      "useCurrentEvents must be used within a CurrentEventsProvider"
    );
  }
  return context;
};

export const CurrentEventsProvider: React.FC<{
  value: CurrentEventsContextType;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <CurrentEventsContext.Provider value={value}>
    {children}
  </CurrentEventsContext.Provider>
);