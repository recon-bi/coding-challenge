import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  options?: any;
  column: any;
}

function SelectFilter({ options, column, column: { setFilter, filterValue } }: Props) {
  const handleChange = (e: any) => {
    // console.log(e);
    setFilter(e.target.value || undefined);
  };
  return (
    <MDBox bgColor="default" p={1}>
      <MDTypography variant="caption"> {column.Header}</MDTypography>

      <FormControl fullWidth>
        <InputLabel id="select-filter-label">{column.Header}</InputLabel>
        <Select
          labelId="select-filter-label"
          id="select-filter-id"
          value={filterValue}
          label={column.Header}
          onChange={handleChange}
        >
          {options.map((option: any, index: number) => (
            <MenuItem value={option.value} key={`menuItem_${option.label}_idx_${index}`}>
              {option.label}
            </MenuItem>
          ))}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  );
}

SelectFilter.defaultProps = {
  options: [],
};

export default SelectFilter;
