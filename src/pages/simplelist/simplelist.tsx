import React, { useState, useMemo } from "react";
import { Collapse, Spin, Typography, Row, Col, Card, message, Button } from "antd";
import { usePpordersList } from "@/hooks/usePporders";
import { PPOrder } from "../ProductionPlanning/productioncalendartypes";
import { DownOutlined, RightOutlined, ReloadOutlined, UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { StatusTag } from "@/utilities";
import { PanelGroups } from "./PanelGroups";
import { OrderLines } from "./OrderLines";
import dayjs from "dayjs";
import { calculateWorkingMinutesBetween } from "../ProductionPlanning/dateschedule-utils";
import { useDailyWorkingHoursQuery } from "@/hooks/useWorkingHours";
import { DEFAULT_WORKING_HOURS } from "@/hooks/useWorkingHours";
import type { WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";

const { Text, Title } = Typography;

// Helper function to format minutes to HH:MM
const formatMinutesToHHMM = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const PanelProductionList: React.FC = () => {
  // Load daily working hours once for this list
  const { data: workingHoursData, isLoading: workingHoursLoading, error: workingHoursError } = useDailyWorkingHoursQuery();

  // Transform the working hours data to the expected format
  const dailyWorkingHours = useMemo(() => {
    if (workingHoursData?.data?.workingHoursAll) {
      return workingHoursData.data.workingHoursAll.reduce(
        (acc, cur) => {
          acc[cur.date] = {
            startHour: cur.startHour,
            startMinute: cur.startMinute,
            endHour: cur.endHour,
            endMinute: cur.endMinute,
            isWorkingDay: cur.isWorkingDay,
          };
          return acc;
        },
        {} as Record<string, WorkingHoursConfig>
      );
    }
    return {};
  }, [workingHoursData?.data?.workingHoursAll]);

  const MyRefreshButton = ({ 
    orderId, 
    onRefresh 
  }: { 
    orderId: number; 
    onRefresh: () => Promise<void>; 
  }) => {
    const refetchState = getRefetchState(orderId);

    const handleRefresh = async () => {
      try {
        await onRefresh();
        message.success('επιτυχία ενημέρωσης παραγγελίας');
      } catch (error) {
        message.error('Αποτυχία ενημέρωσης παραγγελίας');
        console.error('Refresh error:', error);
      }
    };

    return (
      <Button
        type="text"
        size="small"
        icon={<ReloadOutlined />}
        loading={refetchState.isLoading}
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          handleRefresh();
        }}
        style={{ 
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          opacity: refetchState.error ? 0.6 : 1,
          color: refetchState.error ? '#ff4d4f' : undefined
        }}
        title={refetchState.error ? `Error: ${refetchState.error.message}` : 'Refresh order'}
      />
    );
  };

  const { data, isLoading, refetchById, getRefetchState } = usePpordersList({ status: [2,14] });
  const orders = data?.data?.pporders ?? [];
  
  const orderDurations = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc[order.id] = calculateWorkingMinutesBetween(
        dayjs(order.estStartDate),
        dayjs(order.estFinishDate),
        dailyWorkingHours,
        DEFAULT_WORKING_HOURS,
      );
      return acc;
    }, {} as Record<number, number>);
  }, [orders, dailyWorkingHours]);

  // Centralized hierarchical state management
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [expandedLineId, setExpandedLineId] = useState<number | null>(null);

  // Helper function to clear child expansions when parent changes
  const handleOrderExpand = (orderId: number | null) => {
    setExpandedOrderId(orderId);
    setExpandedGroupId(null);
    setExpandedLineId(null);
  };

  const handleGroupExpand = (groupId: string | null) => {
    setExpandedGroupId(groupId);
    setExpandedLineId(null);
  };

  return (
    <Spin spinning={isLoading || workingHoursLoading}>
      {/* View mode toggle buttons */}
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Button.Group>
          <Button
            type={viewMode === 'cards' ? 'primary' : 'default'}
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode('cards')}
          >
            καρτέλες
          </Button>
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode('list')}
          >
            Λίστα  Masters
          </Button>
        </Button.Group>
      </Row>

      {viewMode === 'list' ? (
        // Simple list view - all orders in a flat expandable list
        <Collapse>
          {orders.map((order) => {
            const orderDuration = orderDurations[order.id] || 0;
            const formattedDuration = formatMinutesToHHMM(orderDuration);

            return (
              <Collapse.Panel
                key={order.id}
                header={
                  <Row align="middle">
                    <Col flex="auto">
                      <Text strong>{order.panelcode}</Text>
                      <Text type="secondary" style={{ marginLeft: 8 }}>
                        απο: <b>{dayjs(order.estStartDate).format('YYYY-MM-DD HH:mm')}</b>
                        εως: <b>{dayjs(order.estFinishDate).format('YYYY-MM-DD HH:mm')}</b>
                        Μέτρα: <b>{order.totalTtm?.toFixed(0)}m</b>
                      </Text>
                    </Col>
                    <Col>
                      <StatusTag status={order.status} />
                    </Col>
                  </Row>
                }
              >
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text>Start: <strong>{dayjs(order.estStartDate).format('YYYY-MM-DD HH:mm')}</strong></Text>
                  </Col>
                  <Col span={12}>
                    <Text>End: <strong>{dayjs(order.estFinishDate).format('YYYY-MM-DD HH:mm')}</strong></Text>
                  </Col>
                  <Col span={12}>
                    <Text>Duration: <strong>{formattedDuration}</strong></Text>
                  </Col>
                  <Col span={12}>
                    <Text>Meters: <strong>{order.totalTtm?.toFixed(0)}m</strong></Text>
                  </Col>
                </Row>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      ) : (
        // Card view with hierarchical expansion
        <Row gutter={[16, 16]} wrap>
        {orders.map((order) => {
          const expanded = expandedOrderId === order.id;
          const orderDuration = orderDurations[order.id] || 0;
          const formattedDuration = formatMinutesToHHMM(orderDuration);
          const refetchState = getRefetchState(order.id);

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
              <Card
                  hoverable
                  size="small"
                  style={{
                  minHeight: 110,
                  borderRadius: 10,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #e4e8fc",
                  background: "#fff",
                  position: 'relative',
                  // Visual feedback for refetch states
                  opacity: refetchState.isLoading ? 0.7 : 1,
                  border: refetchState.error ? '1px solid #ff4d4f' : undefined,
                }}
                onClick={() => handleOrderExpand(expanded ? null : order.id)}
                title={
                  <Row align="middle">
                    <Col flex="auto">
                      <Title level={5} style={{ margin: 0, paddingRight: 32 }}>
                        {order.panelcode}
                        {refetchState.lastSuccess && (
                          <Text type="success" style={{ fontSize: '10px', marginLeft: 4 }}>
                            ✓
                          </Text>
                        )}
                      </Title>
                    </Col>
                    <Col>
                      <Text type="secondary"><StatusTag status={order.status} /></Text>
                      <span style={{ marginLeft: 8 }}>
                        {expanded ? <DownOutlined /> : <RightOutlined />}
                      </span>
                    </Col>
                  </Row>
                }
                bodyStyle={{ padding: 8 }}
              >
                {/* Refresh button */}
                <MyRefreshButton
                  orderId={order.id}
                  onRefresh={async () => {
                    await refetchById(order.id);
                  }}
                />

                {/* Collapsed summary */}
                <Text>Master: <b>{order.pporderno}</b></Text>
                <br />
                <Text>ωρα έναρξης: <b>{dayjs(order.estStartDate).format('YYYY-MM-DD HH:mm')}</b></Text>
                <br />
                <Text>ωρα λήξης: <b>{dayjs(order.estFinishDate).format('YYYY-MM-DD HH:mm')}</b></Text>
                <br />
                <Text>Διάρκεια: <b>{formattedDuration}</b></Text>
                <br />
                <Text>Μέτρα: <b>{order.totalTtm?.toFixed(0)}m</b></Text>

                {/* Error display */}
                {refetchState.error && (
                  <div style={{ marginTop: 4 }}>
                    <Text type="danger" style={{ fontSize: '11px' }}>
                      αποτυχια ενημέρωσης: {refetchState.error.message}
                    </Text>
                  </div>
                )}

                {/* Show details only when expanded - hierarchical display */}
                {expanded && (
                  <div style={{ marginTop: 8 }} 
                     onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()} // optional extra safety
      onMouseUp={(e) => e.stopPropagation()}   // optional extra safety
                  >
                    
                    <PanelGroups
                      groups={order.groupIn ?? []}
                      isLoading={isLoading}
                      expandedGroupId={expandedGroupId}
                      onGroupExpand={handleGroupExpand}
                      expandedLineId={expandedLineId}
                      onLineExpand={setExpandedLineId}
                      order={order}
                    />
                  </div>
                )}
              </Card>
            </Col>
          );
        })}
        </Row>
      )}
    </Spin>
  );
};

export default PanelProductionList;