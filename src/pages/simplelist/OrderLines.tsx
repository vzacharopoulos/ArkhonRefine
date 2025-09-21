import { usePporderLines } from "@/hooks/usePporderLines";
import { PPOrder, PPOrderLine } from "../ProductionPlanning/productioncalendartypes";
import { useState } from "react";
import { Card, Col, Row, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
    

const { Text, Title } = Typography;

    
interface OrderLinesProps {
  order: PPOrder;
  expandedLineId?: number | null;
  onLineExpand?: (lineId: number | null) => void;
  groupOrders?: PPOrderLine[]; // Optional: orders from a specific group
}

export const OrderLines: React.FC<OrderLinesProps> = ({
  order,
  expandedLineId: externalExpandedLineId,
  onLineExpand,
  groupOrders
}) => {
  const { data, isLoading } = usePporderLines(order.pporderno ?? null);
  const allLines = data?.data ?? [];

  // Use group orders if provided, otherwise use all lines
  const lines = groupOrders ?? allLines;

  // Use internal state if no external control is provided
  const [internalExpandedLineId, setInternalExpandedLineId] = useState<number | null>(null);
  const expandedLineId = externalExpandedLineId !== undefined ? externalExpandedLineId : internalExpandedLineId;
  const handleLineExpand = onLineExpand || setInternalExpandedLineId;

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[8, 8]}>

        {lines.map((line: PPOrderLine) => (
          <Col span={24} key={line.id}>
            <Card
              size="small"
              style={{
                borderRadius: 8,
                marginBottom: 6,
                background: "#f7f9fa",
                boxShadow: "0 1px 6px #eee",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleLineExpand(expandedLineId === line.id ? null : line.id);
              }}
              title={
                <span>
                  <Text strong>{line.tradecodeCustomer?.name ?? `Piece #${line.id}`}</Text>

                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    {dayjs(line.tradecodeCustomer?.ftrdate).format("DD/MM/YYYY")}
                  </Text>
                  <span style={{ marginLeft: 8 }}>
                    {expandedLineId === line.id ? <DownOutlined /> : <RightOutlined />}
                  </span>
                </span>
              }
            >
              {expandedLineId === line.id && (
                <Row gutter={8}>

                  <Col span={12}><Text type="secondary">παχος <ArrowDownOutlined /></Text> <Text>{line.prodOrdersView?.thickin}</Text></Col>
                  <Col span={12}><Text type="secondary">παχος <ArrowUpOutlined /></Text> <Text>{line.prodOrdersView?.thickout}</Text></Col>
                  <Col span={12}><Text type="secondary">χρωμα <ArrowDownOutlined /> :</Text> <Text>{line.prodOrdersView?.cin}</Text></Col>
                  <Col span={12}><Text type="secondary">χρωμα <ArrowUpOutlined /> :</Text> <Text>{line.prodOrdersView?.cout}</Text></Col>
                  <Col span={12}><Text type="secondary"><ArrowDownOutlined /> </Text> <Text>{line.prodOrdersView?.moldin ? line.prodOrdersView?.moldin : "N/A"}</Text></Col>
                  <Col span={12}><Text type="secondary"> <ArrowUpOutlined /> </Text> <Text>{line.prodOrdersView?.moldout ? line.prodOrdersView?.moldout : "N/A"}</Text></Col>
                  <Col span={12}><Text type="secondary">χρονος:</Text> <Text>{line.prodOrdersView?.time ? dayjs.duration(line.prodOrdersView.time, 'minutes').format("H[ω] m[λ]") : "0ω 0λ"}</Text></Col>
                  <Col span={12}><Text type="secondary">μετρα:</Text> <Text>{line.prodOrdersView?.ttm ? line.prodOrdersView?.ttm.toFixed(0) : 0}μ</Text></Col>
                </Row>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};