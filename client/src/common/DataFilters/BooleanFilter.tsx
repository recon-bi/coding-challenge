import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  column: any;
}

export default function BooleanFilter({ column, column: { setFilter, filterValue } }: Props) {
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const filterValue = e.target.checked ? { id: column.id, value: true, type: 'boolean' } : undefined;
    setFilter(filterValue); // Set undefined to remove the filter entirely
  };
  return (
    <MDBox bgColor="default" p={1}>
      <MDTypography variant="caption"> {column.Header}</MDTypography>

      <Checkbox value={filterValue} onChange={handleClick} />
    </MDBox>
  );
}
