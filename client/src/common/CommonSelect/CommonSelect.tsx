import { SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: '0.9rem',
    minWidth: 100,
    height: 42,
    // padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

interface Props {
  children: ReactNode;
  onChange: (event: SelectChangeEvent) => void;
  name: string;
  label: string;
}

function CommonSelect({ children, onChange, name, label }: Props) {
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event);
  };

  return (
    <FormControl>
      <InputLabel id="common-select-label">{label}</InputLabel>
      <Select
        labelId="common-select-label"
        id={name}
        value={selectedValue}
        label={label}
        onChange={handleChange}
        input={<BootstrapInput />}
        inputProps={{
          placeholder: 'Board Basis',
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
}

export default CommonSelect;
