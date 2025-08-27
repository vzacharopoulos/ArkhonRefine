import React, { useState } from "react";
import { Collapse, Spin, Typography, Row, Col, Card } from "antd";
import { usePpordersList } from "@/hooks/usePporders";
import { PPOrder } from "../ProductionPlanning/productioncalendartypes";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { StatusTag } from "@/utilities";
import { RefreshButton } from "@refinedev/antd";
import { PanelGroups } from "./PanelGroups";
import { OrderLines } from "./OrderLines";

const { Text, Title } = Typography;

export const PanelProductionList: React.FC = () => {
  const MyRefreshButton = ({ SelectedOrderId }: { SelectedOrderId: string | null }) => {
    return (
      <RefreshButton
        resource="pporders"
        recordItemId={SelectedOrderId ?? undefined}
        onClick={() => {}}
      />
    );
  };

  const { data, isLoading } = usePpordersList({ status: [14] });
  const orders = data?.data?.pporders ?? [];
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[16, 16]} wrap>
        {orders.map((order) => {
          const expanded = expandedOrderId === order.id;

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
              <MyRefreshButton SelectedOrderId={expanded ? order.id.toString() : null} />
              <Card
                hoverable
                size="small"
                style={{
                  minHeight: 110,
                  borderRadius: 10,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #e4e8fc",
                  background: "#fff",
                }}
                onClick={() => setExpandedOrderId(expanded ? null : order.id)}
                title={
                  <Row align="middle">
                    <Col flex="auto">
                      <Title level={5} style={{ margin: 0 }}>{order.panelcode}</Title>
                    </Col>
                    <Col>
                      <Text type="secondary"><StatusTag status={order.status} /></Text>
                      <span style={{ marginLeft: 8 }}>{expanded ? <DownOutlined /> : <RightOutlined />}</span>
                    </Col>
                  </Row>
                }
                bodyStyle={{ padding: 8 }}
              >
                {/* Collapsed summary (keep it light) */}
                <Text>Master: <b>{order.pporderno}</b></Text>

                {/* Show details only when expanded */}
                {expanded && (
                  <>
                    <div style={{ marginTop: 8 }}>
                      <PanelGroups
                        groups={order.groupIn ?? []}
                        isLoading={isLoading}
                      />
                    </div>

                    <div style={{ marginTop: 1 }}>
                      <OrderLines order={order} />
                    </div>
                  </>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </Spin>
  );
};

export default PanelProductionList;
