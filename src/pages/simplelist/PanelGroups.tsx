import { usePporderLines } from '@/hooks/usePporderLines';
import { usePporders } from '@/hooks/usePporders';
import { List, Card, Typography, Row, Col, Spin, Collapse } from 'antd';
import { groupIn, PPOrderLine, PPOrder } from '../ProductionPlanning/productioncalendartypes';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { useCoilColors } from '../coillist/hooks/useCoilColors';
import { OrderLines } from './OrderLines';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Removed OrderLineCard component as it's replaced by OrderLines component



interface PanelGroupsProps {
  groups: groupIn[];
  isLoading: boolean;
  expandedGroupId: string | null;
  onGroupExpand: (groupId: string | null) => void;
  expandedLineId: number | null;
  onLineExpand: (lineId: number | null) => void;
  order: PPOrder;
}

export const PanelGroups = ({
  groups,
  isLoading,
  expandedGroupId,
  onGroupExpand,
  expandedLineId,
  onLineExpand,
  order
}: PanelGroupsProps) => {

  if (isLoading) {
    return <Spin />;
  }

  const { getHexcodeByName } = useCoilColors();

  return (
    <List
      dataSource={groups}
      renderItem={(group: groupIn) => {
        const groupKey = `group-${group.totalTtm}-${group.cin}`;
        const isGroupExpanded = expandedGroupId === groupKey;

        return (
          <Card
            hoverable
            size="small"
            style={{
              marginBottom: 8,
              cursor: 'pointer',
              borderRadius: 8,
              background: isGroupExpanded ? '#f0f8ff' : '#fff',
            }}
            onClick={() => onGroupExpand(isGroupExpanded ? null : groupKey)}
            title={
              <Row align="middle">
                <Col flex="auto">
                  <Text strong>
                    {group?.totalTtm?.toFixed(2)}m · {dayjs(group?.tTime).format("mm")}min ·
                    {group?.orders?.length} orders
                  </Text>
                </Col>
                <Col>
                  {isGroupExpanded ? <DownOutlined /> : <RightOutlined />}
                </Col>
              </Row>
            }
            styles={{
              header: { padding: '8px 16px', minHeight: 'auto' },
              body: { padding: 12 }
            }}
          >
            {/* Group Summary */}
            <Row gutter={[8, 4]} style={{ width: '100%' }}>
              <Col span={24}>
                <Row align="middle" gutter={8}>
                  <Col><ArrowUpwardOutlined /></Col>
                  <Col span={6}>
                    <div
                      style={{
                        backgroundColor: getHexcodeByName(group.cin ?? ""),
                        padding: '2px 8px',
                        borderRadius: 4,
                        color: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      <Text style={{ color: '#fff' }}>{group.cin}</Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Text type="secondary">Thick:</Text> <Text>{group.thickin}</Text>
                  </Col>
                  <Col span={6}>
                    <Text type="secondary">Mold:</Text> <Text>{group.moldin}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[8, 4]} style={{ width: '100%', marginTop: 4 }}>
              <Col span={24}>
                <Row align="middle" gutter={8}>
                  <Col><ArrowDownwardOutlined /></Col>
                  <Col span={6}>
                    <div
                      style={{
                        backgroundColor: getHexcodeByName(group.cout ?? ""),
                        padding: '2px 8px',
                        borderRadius: 4,
                        color: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      <Text style={{ color: '#fff' }}>{group.cout}</Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Text type="secondary">Thick:</Text> <Text>{group.thickout}</Text>
                  </Col>
                  <Col span={6}>
                    <Text type="secondary">Mold:</Text> <Text>{group.moldout}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Show OrderLines when group is expanded */}
            {isGroupExpanded && (
              <div style={{ marginTop: 12 }}>
                <OrderLines
                  order={order}
                  expandedLineId={expandedLineId}
                  onLineExpand={onLineExpand}
                  groupOrders={group.orders}
                />
              </div>
            )}
          </Card>
        );
      }}
    />
  );
};


// // Group your data (example: by cin)
// const groupedData = data?.reduce((acc, item) => {
//   const groupKey = `Group ${item.cin}`; // You can change the grouping logic
//   if (!acc[groupKey]) {
//     acc[groupKey] = [];
//   }
//   acc[groupKey].push(item);
//   return acc;
// }, {});


