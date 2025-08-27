import { PPOrderLine } from '@/pages/ProductionPlanning/productioncalendartypes';
import { StatusTag } from '@/utilities';
import { List, Skeleton } from 'antd';
import dayjs from 'dayjs';
import React from 'react'


interface OrderLinesListProps {
  orderLines: PPOrderLine[];
  orderLinesLoading: boolean;
}


export const OrderlinesList: React.FC<OrderLinesListProps> = ({orderLines,orderLinesLoading}) => (
 <div style={{ maxHeight: 390, overflowY: "scroll", paddingRight: 8 }}>
              {orderLinesLoading ? (
                <Skeleton active />
              ) : (
                <List
                  size="small"
                  dataSource={orderLines}
                  renderItem={(line) => (
                    <List.Item key={line.id}>
                     <span>{line.custporderno}-{line?.prodOrdersView?.time != null 
                     ? dayjs.duration(line.prodOrdersView.time, 'minutes').format("H[ω] m[λ]") : "0ω 0λ"}- {line.prodOrdersView?.ttm ?line.prodOrdersView?.ttm.toFixed(0):0}μ</span>
                      <StatusTag status={line.status} />
                    </List.Item>
                  )}
                />
              )}
            </div>
);
