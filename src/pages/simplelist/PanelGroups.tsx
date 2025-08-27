import { usePporderLines } from '@/hooks/usePporderLines';
import { usePporders } from '@/hooks/usePporders';
import { List, Card, Typography, Row, Col, Spin, Collapse } from 'antd';
import { groupIn, PPOrderLine } from '../ProductionPlanning/productioncalendartypes';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { useCoilColors } from '../coillist/hooks/useCoilColors';
import dayjs from 'dayjs';
import { useState } from 'react';
import SizeContext from 'antd/es/config-provider/SizeContext';
const { Panel } = Collapse;

const { Title, Text } = Typography;

const OrderLineCard: React.FC<{ line: PPOrderLine }> = ({ line }) => (
  <Collapse defaultActiveKey={['1']} expandIconPosition="start" size='small'  >
    <Panel 
      header={
        <span>
          <Text strong>{line.tradecodeCustomer?.name ?? `Piece #${line.id}`}</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            {dayjs(line.tradecodeCustomer?.ftrdate).format("DD/MM/YYYY")}
          </Text>
        </span>
      }
      key={line.id}
      style={{ borderRadius: 8, margin: "6px 0" }}
    >
      <Row gutter={8}>
        <Col span={8}><Text type="secondary">ραβδωση μεσα:</Text> <Text>{line.prodOrdersView?.moldin}</Text></Col>
        <Col span={8}><Text type="secondary">Width:</Text> <Text>{line.prodOrdersView?.cout}</Text></Col>
        <Col span={8}><Text type="secondary">Meters:</Text> <Text>{line.prodOrdersView?.cin}</Text></Col>
      </Row>
      {/* Add more details here */}
    </Panel>
  </Collapse>
);



export const PanelGroups = ({ groups, isLoading }: { groups: groupIn[]; isLoading: boolean }) => {
    const [expandedGroupLineId, setExpandedGroupLineId] = useState<string | null>(null);

  if (isLoading) {
    return <Spin />;

  }
    const { getHexcodeByName } = useCoilColors();
  const colorName = "1001"; // Example color name

  // Get hexcode
  const hexcode = getHexcodeByName(colorName);
  return (
    <List
      dataSource={groups}
      renderItem={(group: groupIn) => (
        <Card
          title={<Text strong> {group?.totalTtm?.toFixed(2)}m  {dayjs(group?.tTime).format("mm")}min Συνολο  {group?.orders?.length} </Text>}
          size="small"

          styles={{
            header: { padding: '0 8px', minHeight: 'auto' },
            body: { padding: 8 }

          }}
  
        >
          <Row gutter={[8, 4]} style={{ width: '100%' }}>
            <ArrowUpwardOutlined />
            <Col span={6}>
              <div style={{ backgroundColor: getHexcodeByName(group.cin ?? "") }}>
                <Text type="secondary"></Text> {group.cin} 
              </div>
            </Col>
            <Col span={6}>
              <Text type="secondary"></Text> {group.thickin}
            </Col>
            <Col span={6}>
              <Text type="secondary"></Text> {group.moldin}
            </Col>
            </Row>
            <Row gutter={[8, 4]} style={{ width: '100%' }}>
              <ArrowDownwardOutlined />

              <Col span={6}>
                <div style={{ backgroundColor: getHexcodeByName(group.cout ?? "") }}>
                  <Text type="secondary"></Text> {group.cout}
                </div>
              </Col>
              <Col span={6}>
                <Text type="secondary"></Text> {group.thickout}
              </Col>
              <Col span={6}>
                <Text type="secondary"></Text> {group.moldout}
              </Col>
              <Collapse ghost>
                <Card  style={{ 
    cursor: 's-resize',
    borderRadius: 8, 
    marginTop: 2,
    marginLeft: '18px',
    background: `linear-gradient(180deg, 
      ${getHexcodeByName(group.cin ?? "")} 0%, 
      ${getHexcodeByName(group.cin ?? "")} 45%, 
      white 48%, 
      white 52%, 
      ${getHexcodeByName(group.cout ?? "")} 55%, 
      ${getHexcodeByName(group.cout ?? "")} 100%)`,
    overflow: 'hidden',
    width: '100%'
  }}
                  title={<Text strong>Παραγγελιες</Text>} key={`orders-${group.totalTtm}-${group.cin}`}
                  onClick={(e) => { e.stopPropagation(); setExpandedGroupLineId(expandedGroupLineId === `orders-${group.totalTtm}-${group.cin}` ? null : `orders-${group.totalTtm}-${group.cin}`) }}
                >
                {expandedGroupLineId === `orders-${group.totalTtm}-${group.cin}` && (
                  <>
                    {group.orders?.map((line) => (
                      <OrderLineCard line={line} key={line.id} />
                    ))}
                  </>
                )}
              </Card>
            </Collapse>
            </Row>
        </Card>
      )}
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


