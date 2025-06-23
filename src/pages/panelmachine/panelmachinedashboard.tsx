import { useSelect } from '@refinedev/core';
import { Button } from 'antd'
import gql from 'graphql-tag';
import React from 'react'


const GET_PPORDERS = gql`
query GetPpOrders($filter: PpordersFilterInput) {
  pporders(filter: $filter) {
    id
    pporderno
    panelcode
    status
    startDate
    finishDate
    estDateOfProd
    createDate
    quantity
    timeSum
    
    
  }
}`;

const PanelMachineDashboard: React.FC<{ 
  value?: string; 
  onChange?: (value: string) => void;
  placeholder?: string;
}> = ({value,onChange,placeholder="διάλεξε Εντολή"}) => {
    const { options, query} = useSelect({
resource: "pporders",
optionLabel:"PPORDERNO",
optionValue:"PPORDERNO",

filters: [
      {
        field: "status", // Filter column
        operator: "in",
        value: 4,
    }],
metaData:{
    pagination:"off",
fields:["PPORDERNO","status"],

gqlQuery: GET_PPORDERS
}
    
  })
console.log(query?.data?.nodes)
console.log(query?.data)


console.log(query?.nodes)
console.log(query)
 if (query.isLoading) return <div>Loading users...</div>;
  if (query.isError) return <div>Error loading users</div>;
return (
    <div className="select-container">
      <label>Select User from  Department:</label>
      <select 
        value={value || ""} 
        onChange={(e) => onChange?.(e.target.value)}
        className="form-select"
      >
        <option value="">-- Select User --</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <small>Found {options?.length || 0} users in </small>
    </div>
  );
};
export default  PanelMachineDashboard