import { useCustom } from "@refinedev/core";
import { Select, Form, Spin, Alert, Button, message, DatePicker, Space, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { GET_PPORDERS } from "@/graphql/queries";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useFinishOrder } from "./hooks/usefinishppordermutation";
import { useStartOrder } from "./hooks/usestartoordermutation";

dayjs.extend(utc);
dayjs.extend(timezone);

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
  
  // Time selection states
  const [useCustomStartTime, setUseCustomStartTime] = useState(false);
  const [useCustomFinishTime, setUseCustomFinishTime] = useState(false);
  const [customStartTime, setCustomStartTime] = useState<Dayjs | null>(null);
  const [customFinishTime, setCustomFinishTime] = useState<Dayjs | null>(null);

  // Custom hooks for mutations
  const { startOrder } = useStartOrder();
  const { finishOrder } = useFinishOrder();

  const { data, isLoading, isError, refetch } = useCustom<{
    pporders: PPOrder[]
  }>({
    url: "",
    method: "get",
    meta: {
      gqlQuery: GET_PPORDERS,
      variables: {
        filter: {
          status: [1, 2, 3, 4, 14],
          lastDays: 120,
        },
      },
    },
  });

  // Status mapping:
  // 1  created     ΔΗΜΙΟΥΡΓΗΘΗΚΕ  
  // 2  processing  ΣΕ ΕΠΕΞΕΡΓΑΣΙΑ
  // 3  onhold      ΣΕ ΠΑΥΣΗ
  // 4  finished    ΟΛΟΚΛΗΡΩΜΕΝΗ ΕΠΕΞΕΡΓΑΣΙΑ 
  // 14             προγραμματισμος παραγωγης

  // Create a map of pporderno to order ID
  const ordersMap = React.useMemo(() => {
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

  const handleStartOrder = async () => {
    if (!selectedPporderno) {
      messageApi.warning("Παρακαλώ επιλέξτε μια εντολή πρώτα");
      return;
    }

    try {
      const startTime = useCustomStartTime && customStartTime 
        ? customStartTime.tz('Europe/Athens').toDate()
        : undefined; // Will use current time in hook

      await startOrder(selectedPporderno, startTime);
      messageApi.success("Η εντολή ξεκίνησε!");
      
      // Reset custom time states
      setUseCustomStartTime(false);
      setCustomStartTime(null);
      
      refetch();
    } catch (error) {
      console.error("Start order error", error);
      messageApi.error("Σφάλμα εκκίνησης εντολής");
    }
  };

  const handleFinishOrder = async () => {
    if (!selectedPporderno) {
      messageApi.warning("Παρακαλώ επιλέξτε μια εντολή πρώτα");
      return;
    }

    const order = ordersById.get(selectedId!);
    if (!order) {
      messageApi.error("Δεν βρέθηκε η εντολή");
      return;
    }

    if (order.status !== 2) {
      messageApi.warning("Η εντολή πρέπει να έχει ξεκινήσει πρώτα");
      return;
    }

    try {
      const finishTime = useCustomFinishTime && customFinishTime 
        ? customFinishTime.tz('Europe/Athens').toDate()
        : undefined; // Will use current time in hook

      await finishOrder(selectedPporderno, finishTime);
      messageApi.success("Η εντολή ολοκληρώθηκε!");
      
      // Reset custom time states
      setUseCustomFinishTime(false);
      setCustomFinishTime(null);
      
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
        started: Number(order.status) === 2,
        finished: Number(order.status) === 4,
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
  }, [value, ordersMap, selectedPporderno]);

  // Get the current order status
  const currentOrder = selectedId ? ordersById.get(selectedId) : null;
  const isStarted = currentOrder?.status === 2;
  const isFinished = currentOrder?.status === 4;

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
          onOpenChange={(open) => setDropdownOpen(open)}
          popupRender={(menu) => (
            <div>
              {menu}
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
                    opacity: dropdownOpen ? 1 : 0,
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

        <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
          Βρέθηκαν {options.length} εντολές παραγωγής
          {currentOrder && (
            <div style={{ marginTop: 4 }}>
              Κατάσταση: {isFinished ? 'Ολοκληρωμένη' : isStarted ? 'Σε εξέλιξη' : 'Σε αναμονή'}
            </div>
          )}
        </div>

        {/* Start Time Controls */}
        {!isStarted && !isFinished && selectedId && (
          <div style={{ marginTop: 16, padding: 12, border: '1px solid #d9d9d9', borderRadius: 6 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Checkbox
                checked={useCustomStartTime}
                onChange={(e) => {
                  setUseCustomStartTime(e.target.checked);
                  if (!e.target.checked) {
                    setCustomStartTime(null);
                  }
                }}
              >
                Επιλογή χρόνου έναρξης
              </Checkbox>
              
              {useCustomStartTime && (
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Επιλέξτε χρόνο έναρξης"
                  value={customStartTime}
                  onChange={setCustomStartTime}
                  style={{ width: '100%' }}
                  defaultValue={dayjs().tz('Europe/Athens')}
                />
              )}
            </Space>
          </div>
        )}

        {/* Finish Time Controls */}
        {isStarted && selectedId && (
          <div style={{ marginTop: 16, padding: 12, border: '1px solid #d9d9d9', borderRadius: 6 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Checkbox
                checked={useCustomFinishTime}
                onChange={(e) => {
                  setUseCustomFinishTime(e.target.checked);
                  if (!e.target.checked) {
                    setCustomFinishTime(null);
                  }
                }}
              >
                Επιλογή χρόνου ολοκλήρωσης
              </Checkbox>
              
              {useCustomFinishTime && (
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format="DD/MM/YYYY HH:mm"
                  placeholder="Επιλέξτε χρόνο ολοκλήρωσης"
                  value={customFinishTime}
                  onChange={setCustomFinishTime}
                  style={{ width: '100%' }}
                  defaultValue={dayjs().tz('Europe/Athens')}
                />
              )}
            </Space>
          </div>
        )}

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button
            type="primary"
            onClick={handleStartOrder}
            style={{ flex: 1 }}
            disabled={!selectedId || !!isStarted || !!isFinished}
          >
            {isStarted ? 'Έχει Ξεκινήσει' : useCustomStartTime ? 'Έναρξη με Επιλεγμένο Χρόνο' : 'Έναρξη Τώρα'}
          </Button>
          <Button
            type="primary"
            onClick={handleFinishOrder}
            style={{ flex: 1 }}
            disabled={!selectedId || !isStarted || !!isFinished}
          >
            {isFinished ? 'Έχει Ολοκληρωθεί' : useCustomFinishTime ? 'Ολοκλήρωση με Επιλεγμένο Χρόνο' : 'Ολοκλήρωση Τώρα'}
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default PanelMachineDashboard;