import { Outlet } from "react-router-dom";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";
import { Header } from "./header";

export const Layout = () => {
  return (
    <ThemedLayoutV2
      Header={Header}
      
      Title={(titleProps) => (
        <ThemedTitleV2 {...titleProps} text="Προγραμματισμός Παραγωγής" />
      )}
    >
      <Outlet />
    </ThemedLayoutV2>
  );
};