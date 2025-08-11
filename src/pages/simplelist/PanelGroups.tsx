import { usePporderLines } from '@/hooks/usePporderLines';
import { usePporders } from '@/hooks/usePporders';
import { List, Card, Typography, Row, Col, Spin } from 'antd';
import { groupIn } from '../ProductionPlanning/productioncalendartypes';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { useCoilColors } from '../coillist/hooks/useCoilColors';
import { get } from 'http';

const { Title, Text } = Typography;

export const PanelGroups = ({ groups, isLoading }: { groups: groupIn[]; isLoading: boolean }) => {
  if (isLoading) {
    return <Spin />;

  }
    const { getHexcodeByName } = useCoilColors();
  const colorName = "1001"; // Example color name

  // Get hexcode
  const hexcode = getHexcodeByName(colorName);
  console.log("Trimmed lookup:", hexcode);
  return (
    <List
      dataSource={groups}
      renderItem={(group: groupIn) => (
        <Card 
          title={<Text strong>μετρα: {group?.totalTtm?.toFixed(2)} </Text>} 
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


