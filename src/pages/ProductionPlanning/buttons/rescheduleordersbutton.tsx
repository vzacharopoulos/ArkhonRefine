import React from "react";
import { Button, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useCustom, useCustomMutation } from "@refinedev/core";
import { RESCHEDULE_ALL_ORDERS_MUTATION } from "@/graphql/queries";

interface RescheduleOrdersButtonProps {
  refetchPporders: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const RescheduleOrdersButton: React.FC<RescheduleOrdersButtonProps> = ({
  refetchPporders,
  disabled = false,
  style,
}) => {
  const { mutate: rescheduleAllOrders, isLoading } = useCustomMutation<any[]>();
  console.log('Rendering RescheduleOrdersButton', isLoading);
  const handleReschedule = () => {
    message.loading({ content: 'Αναπρογραμματισμός παραγγελιών...', key: 'reschedule' });

    rescheduleAllOrders({
      url: "",
      method: "post",
      values: {},
      meta: {
        gqlMutation: RESCHEDULE_ALL_ORDERS_MUTATION,
        variables: {},
      },
    }, {
      onSuccess: (data) => {
        refetchPporders();
        message.success({ content: '✅ Οι παραγγελίες αναπρογραμματίστηκαν με επιτυχία!', key: 'reschedule', duration: 2 });
      },
      onError: (error) => {
        console.error('Failed to reschedule orders:', error);
        message.error({ content: 'Αποτυχία αναπρογραμματισμού παραγγελιών. Δοκιμάστε ξανά.', key: 'reschedule' });
      },
    });
  };

  return (
    <Button
      type="primary"
      icon={<ReloadOutlined />}
      onClick={handleReschedule}
      loading={isLoading}
      disabled={disabled}
      size="small"
      style={style}
    >
      Αναπρογραμματισμός
    </Button>
  );
};