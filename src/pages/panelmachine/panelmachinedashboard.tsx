import { useCustom } from "@refinedev/core";
import { Select, Form, Spin, Alert, Button, message } from "antd";
import gql from "graphql-tag";
import React, { useState, useEffect, useRef } from "react";
import { client } from "@/providers";
import { UPDATE_PPORDERS } from "@/graphql/queries";
import { useStartPporder } from "@/hooks/useStartPporder";
import { useFinishedPporders } from "@/hooks/useFinishedPporders";
import { useFinishPporder } from "@/hooks/useFinishPporders";
import { Dayjs } from "dayjs";
import { EventInput } from "fullcalendar";
import { useCurrentEvents } from "@/contexts/currentEventsProvider";

const GET_PPORDERS = gql`
  query GetPpOrders($filter: PpordersFilterInput) {
    pporders(filter: $filter) {
      id
      pporderno
      panelcode
      status
      startDateDatetime
      finishDateDatetime
      
      createDate
      
    }
  }
`;




type PPOrder = {
  id: number;
  pporderno: string;
  panelcode: string;
  status: number;
  startDateDatetime?: Date;
  finishDateDatetime?: Date;
};


const PanelMachineDashboard: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "διάλεξε Εντολή" }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPporderno, setSelectedPporderno] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useCustom<{
    pporders: 
     PPOrder[]
  }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS,
      variables: {
        filter: {
          status: [1, 2, 3, 4,14],
          lastDays: 120,
        },
      },
    },
   });
// 1  created     ΔΗΜΙΟΥΡΓΗΘΗΚΕ  
// 2  processing  ΣΕ ΕΠΕΞΕΡΓΑΣΙΑ
// 3  onhold      ΣΕ ΠΑΥΣΗ
// 4  finished    ΟΛΟΚΛΗΡΩΜΕΝΗ ΕΠΕΞΕΡΓΑΣΙΑ 
// 14             προγραμματισμος παραγωγης                                                                                                                                         
  // Create a map of pporderno to order ID
  const ordersMap = React.useMemo(() => {
    console.log(data?.data?.pporders)
    const map = new Map<string, number>();
    data?.data?.pporders?.forEach(order => {
      map.set(order.pporderno, order.id);
    });
    return map;
  }, [data]);

  // Create a map of order ID to full order object
  const ordersById = React.useMemo(() => {
    const map = new Map<number, PPOrder>();
    data?.data?.pporders?.forEach(order => {
      map.set(order.id, order);
    });
    return map;
  }, [data]);

  // States required for start/finish hooks but not shown in this view
  const { currentEvents, setCurrentEvents } = useCurrentEvents(); 
   const [editStart, setEditStart] = useState<Dayjs | null>(null);
  const [editEnd, setEditEnd] = useState<Dayjs | null>(null);
  const manualSyncRef = useRef(false);
  const defaultWorkingHours: Record<number, any> = {
    1: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
    2: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
    3: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
    4: { startHour: 6, startMinute: 0, endHour: 22, endMinute: 0, isWorkingDay: true },
    5: { startHour: 6, startMinute: 0, endHour: 23, endMinute: 59, isWorkingDay: true },
    6: { startHour: 0, startMinute: 0, endHour: 15, endMinute: 0, isWorkingDay: true },
    0: { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, isWorkingDay: false },
  };
  const dailyWorkingHours = {} as Record<string, any>;

  // Fetch finished orders for offtime calculation
  const { data: finishedData, refetch: refetchFinished } = useFinishedPporders();
  const finishedOrders = finishedData?.data?.masterlengths ?? [];

  const { handleStart } = useStartPporder({
    finishedOrders,
    dailyWorkingHours,
    defaultWorkingHours,
    currentEvents,
    setCurrentEvents,
    handleUpdateAllEvents: async () => {},
  });

  const { handleFinish } = useFinishPporder({
    currentEvents,
    setCurrentEvents,
    setEditStart,
    setEditEnd,
    dailyWorkingHours,
    defaultWorkingHours,
    handleUpdateAllEvents: async () => {},
    refetchFinished,
    refetchPporders: () => { refetch(); },
    manualSyncRef,
  });

  const handleStartOrder = async () => {
    if (!selectedId) {
      messageApi.warning("Παρακαλώ επιλέξτε μια εντολή πρώτα");
      return;
    }

    try {
      const order = ordersById.get(selectedId);
      if (!order) return;
      await handleStart(order);
      messageApi.success("Η εντολή ξεκίνησε!");
      refetch();
    } catch (error) {
      console.error("Start order error", error);
      messageApi.error("Σφάλμα εκκίνησης εντολής");
    }
  };

  const handleFinishOrder = async () => {
    if (!selectedId) {
      messageApi.warning("Παρακαλώ επιλέξτε μια εντολή πρώτα");
      return;
    }

    const order = ordersById.get(selectedId);
    if (!order) {
      messageApi.error("Δεν βρέθηκε η εντολή");
      return;
    }

    if (order.status != 2) {
      messageApi.warning("Η εντολή πρέπει να έχει ξεκινήσει πρώτα");
      return;
    }

    try {
      await handleFinish(order);

          messageApi.success("Η εντολή ολοκληρώθηκε!");
      refetch();
    } catch (error) {
      console.error("Finish order error", error);
      messageApi.error("Σφάλμα ολοκλήρωσης εντολής");
    }
  };
  const options = React.useMemo(
    () =>
      data?.data?.pporders?.map((order) => ({
        label: `${order.pporderno} - ${order.panelcode}`,
        value: order.pporderno,
        status: order.status,
        started: Number(order.status)==2,
        finished: Number(order.status)==4,
      })) ?? [],
    [data?.data?.pporders]
  );

  const handleSelectChange = (pporderno: string) => {
    // Update parent component
    if (onChange) {
      onChange(pporderno);
    }

    // Update local state
    setSelectedPporderno(pporderno);

    // Find and set the corresponding ID
    const id = ordersMap.get(pporderno);
    if (id) {
      setSelectedId(id);
    } else {
      setSelectedId(null);
    }
  };

  // Sync with parent value
  useEffect(() => {
    if (value && value !== selectedPporderno) {
      setSelectedPporderno(value);
      const id = ordersMap.get(value);
      setSelectedId(id || null);
    }
  }, [value, ordersMap]);

  // Get the current order status
  const currentOrder = selectedId ? ordersById.get(selectedId) : null;
  const isStarted = currentOrder?.status===2;
  const isFinished = currentOrder?.status===4;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <Spin tip="Φόρτωση εντολών..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Σφάλμα φόρτωσης"
        description="Αδυναμία φόρτωσης των εντολών παραγωγής"
        type="error"
        showIcon
        style={{ margin: '16px' }}
      />
    );
  }

  return (
    <>
      {contextHolder}
      <Form.Item
        label="Εντολή Παραγωγής"
        style={{ marginBottom: 16, width: '100%' }}
      >
        <Select
          value={value ?? selectedPporderno}
          onChange={handleSelectChange}
          placeholder={placeholder}
          showSearch
          optionFilterProp="children"
          style={{ width: '60%' }}
          loading={isLoading}
          size="large"
          onOpenChange={(open) => setDropdownOpen(open)} // Track dropdown open state
          popupRender ={(menu) => (
            <div>
              {menu}
              {/* You can add additional elements here that will appear at the bottom of the dropdown */}
            </div>
          )}
        >
          {options.map((option) => (
          <Select.Option
  key={option.value}
  value={option.value}
  label={option.label}
  disabled={option.finished}
>
  <div>
    <div>{option.label}</div>
    <div
      style={{
        fontSize: 12,
        color: '#666',
        height: 16,
        opacity: dropdownOpen ? 1 : 0, // 👈 instead of conditionally rendering
        transition: "opacity 0.2s",
      }}
    >
      {option.finished
        ? '✅ Ολοκληρωμένη'
        : option.started
          ? '🚧 Σε επεξεργασια'
          : '⏱️ Προγραμματισμένη'}
    </div>
  </div>
</Select.Option>
          ))}
        </Select>

        {/* Rest of your code remains the same */}
        <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
          Βρέθηκαν {options.length} εντολές παραγωγής
          {currentOrder && (
            <div style={{ marginTop: 4 }}>
              Κατάσταση: {isFinished ? 'Ολοκληρωμένη' : isStarted ? 'Σε εξέλιξη' : 'Σε αναμονή'}
            </div>
          )}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button
            type="primary"
            onClick={handleStartOrder}
            style={{ flex: 1 }}
            disabled={!selectedId || !!isStarted || !!isFinished}
          >
            {isStarted ? 'Έχει Ξεκινήσει' : 'Έναρξη Εντολής'}
          </Button>
          <Button
            type="primary"
            onClick={handleFinishOrder}
            style={{ flex: 1 }}
            disabled={!selectedId || !isStarted || !!isFinished}
          >
            {isFinished ? 'Έχει Ολοκληρωθεί' : 'Ολοκλήρωση Εντολής'}
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default PanelMachineDashboard;