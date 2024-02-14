import React from 'react';
import MDBox from 'ui/MDBox';
import { SelectOptionsType } from 'types/common';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MDInput from 'ui/MDInput';
import MDButton from 'ui/MDButton';

interface Props {
  column: any;
}

const operatorOptions: SelectOptionsType[] = [
  { label: '>', value: '$gt' },
  { label: '<', value: '$lt' },
  { label: '=', value: '$eq' },
];

export default function NumericFilter({ column, column: { setFilter } }: Props) {
  const [selectedOperator, setSelectedOperator] = React.useState<SelectOptionsType>(operatorOptions[0]);

  const [selectedValue, setSelectedValue] = React.useState<any>(1);

  const handleSelectChange = (e: any, value: any) => {
    e.target;
    setSelectedOperator(value);
  };

  const handleInputChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleClick = () => {
    const filterValue =
      selectedOperator && selectedValue
        ? {
            id: column.id,
            value: `{"${selectedOperator.value}":${selectedValue}}`,
            type: 'expression',
          }
        : undefined;
    setFilter(filterValue); // Set undefined to remove the filter entirely
  };

  return (
    <MDBox bgColor="default" p={1}>
      <MDBox>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={operatorOptions}
          value={selectedOperator}
          clearIcon={null}
          sx={{ width: 30 }}
          onChange={handleSelectChange}
          renderInput={(params) => <TextField {...params} size="small" />}
          renderOption={(props, option) => <li {...props}>{option.label} </li>}
          getOptionLabel={(option: any) => option.label}
        />
      </MDBox>
      <MDBox>
        <MDInput
          type="number"
          size="small"
          sx={{ width: 75 }}
          value={selectedValue}
          onChange={handleInputChange}
        ></MDInput>
      </MDBox>
      <MDBox>
        <MDButton onClick={handleClick} color="success" size="small">
          Go
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
