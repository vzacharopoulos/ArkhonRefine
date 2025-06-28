import { useCustom } from "@refinedev/core";
import { Select, Form, Spin, Alert, Button, message } from "antd";
import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { client } from "@/providers";

const GET_PPORDERS = gql`
  query GetPpOrders($filter: PpordersFilterInput) {
    pporders(filter: $filter) {
      id
      pporderno
      panelcode
      status
      startDateDatetime
      finishDateDatetime
      estDateOfProd
      createDate
      quantity
      timeSum
    }
  }
`;

const UPDATE_PPORDER = gql`
  mutation UpdatePporder($id: Int!, $input: UpdatePpordersInput!) {
    updatePporder(id: $id, input: $input) {
      id
      pporderno
      startDateDatetime
      finishDateDatetime
      status
    }
  }
`;


type PPOrder = {
  id: number;
  pporderno: string;
  panelcode: string;
  status: string;
  startDateDatetime?: string;
  finishDateDatetime?: string;
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
          status: [1, 2, 3, 4],
          lastDays: 100,
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

  const handleStartOrder = async () => {
    if (!selectedId) {
      messageApi.warning("Παρακαλώ επιλέξτε μια εντολή πρώτα");
      return;
    }

    try {
      const currentDate = new Date().toISOString();
      const result = await client.request(UPDATE_PPORDER, {
        id: selectedId,
        input: {
          startDateDatetime: currentDate,
          status: 2, // Set status to "In Progress"
        },
      });

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

    // Check if order has already been started
    if (!order.startDateDatetime) {
      messageApi.warning("Η εντολή πρέπει να έχει ξεκινήσει πρώτα");
      return;
    }

    try {
      const currentDate = new Date().toISOString();
      const result = await client.request(UPDATE_PPORDER, {
        id: selectedId,
        input: {
          finishDateDatetime: currentDate,
          status: 4, // Set status to "Completed"
        },
      });

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
        started: !!order.startDateDatetime,
        finished: !!order.finishDateDatetime,
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
  const isStarted = currentOrder?.startDateDatetime;
  const isFinished = currentOrder?.finishDateDatetime;

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
          value={selectedPporderno || value}
          onChange={handleSelectChange}
          placeholder={placeholder}
          showSearch
          optionFilterProp="children"
          style={{ width: '60%' }}
          loading={isLoading}
          size="large"
          onDropdownVisibleChange={(open) => setDropdownOpen(open)} // Track dropdown open state
          dropdownRender={(menu) => (
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
                {dropdownOpen && ( // Only show status when dropdown is open
                  <div style={{ fontSize: 12, color: '#666' }}>
                    {option.finished
                      ? '✅ Ολοκληρωμένη'
                      : option.started
                        ? '🚧 Σε επεξεργασια'
                        : '⏱️ Προγραμματισμένη'}
                  </div>
                )}
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