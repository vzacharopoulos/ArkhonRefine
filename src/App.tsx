import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import {
  dataProvider,
  liveProvider,
  authProvider,
} from "./providers";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";  // <-- FIXED import here

import { ColorModeContextProvider } from "./contexts/color-mode";
import CoilPage  from "./pages/coillist/CoilPage";
import { ForgotPassword } from "./pages/forgotPassword";
import { CustomLoginPage } from "./pages/login";
import { Register } from "./pages/register";
import { Layout } from "./components/layout";
import TestingList, { CoilList } from "./pages/coillist/CoilList";
import{ BarcodeOutlined, CalendarOutlined, DashboardOutlined, UnorderedListOutlined} from "@ant-design/icons"; 
import {CoilShow} from "./pages/coillist/Coilshow";

import { CoilEdit } from "./pages/coillist/CoilEdit";
import { Calendar } from "antd";
import { ProductionCalendar } from "./pages/ProductionPlanning/calendarpage";
import PanelMachineDashboard from "./pages/panelmachine/panelmachinedashboard";
import SimpleListPage from "./pages/simplelist/simplelist";
import { useState } from "react";
import { EventInput } from "fullcalendar";
import { CurrentEventsProvider } from "./contexts/currentEventsProvider";


function App() {
   const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
               <CurrentEventsProvider value={{ currentEvents, setCurrentEvents }}>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "PanelMachine",
                    list: "/PanelMachine",
                   
                   meta:{
                   label:'Μηχανή Πάνελ',
                   icon: <DashboardOutlined />,

                   }
                  },
                  {
                    name: "coil",
                    list: "/coil",
                    show: "/coil/show/:id",
                    create: "/coil/create/new",
                    edit: "/coil/edit/:id",
                    meta: {
                      label: "coil",
                      icon: <BarcodeOutlined />,
                    },
                  },
                           {
                    name: "panelProductionOrdersExt2s",
                    list: "/panelProductionOrdersExt2s",
                    
                    meta: {
                      label: "λιστες κτλ...",
                      icon: <UnorderedListOutlined />,
                      
                    },
                  },
                  {
                    name: "scheduling",
                    list:"/scheduling",
                     meta: {
                      label: "Προγραμματισμος",
                      icon: <CalendarOutlined />,
                    },




                        // icon:<CalendarMonthOutlined/>
                  }

                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "FOmbmp-3QrkoJ-vH2Yuq",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/* PUBLIC route → Coil_List */}
                  <Route element={<Layout />}>
                    <Route index element={<NavigateToResource resource="scheduling" />} />
                    <Route path="/coil" element={<CoilPage />} />
                   <Route path="/coil/show/:id" element={<CoilShow />} />
                      <Route path="/coil/edit/:id" element={< CoilEdit />} />         
                                           <Route path="/panelProductionOrdersExt2s" element={<SimpleListPage />} />

                     <Route path= '/scheduling' element ={<ProductionCalendar/>}/>

                     {/* <Route path="/simple-list" element={<SimpleListPage />} /> */}
                      
                      <Route index element={<NavigateToResource resource="PanelMachine" />} />
                      <Route path= '/PanelMachine' element ={<PanelMachineDashboard/>}/>
                    
                  </Route>

                  {/* PROTECTED routes */}
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        v3LegacyAuthProviderCompatible
                        fallback={<CatchAllNavigate to="/login" />}
                      />
                    }
                  >
                    <Route element={<Layout />}>
                      {/* You can add protected pages here */}
                    </Route>
                  </Route>

                  {/* PUBLIC routes */}
                  <Route path="/login" element={<CustomLoginPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              </CurrentEventsProvider>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
