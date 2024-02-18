import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import 'dayjs/locale/en-gb';

interface Props {
  testid?: string;
  label: string;
  initialValue?: string;
  onChange: (value: string) => void;
  [key: string]: any;
}

function CommonDatePicker({ testid, label, onChange, initialValue, ...rest }: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (value: any) => {
    const newValue: any = dayjs(`${value.format('YYYY-MM-DD')}T00:00:00`);
    setValue(newValue);
    if (onChange && !isNaN(Date.parse(newValue))) onChange(newValue.toISOString());
  };

  React.useEffect(() => {
    if (initialValue) {
      const dateVal = dayjs(initialValue);
      setValue(dateVal);
    }
  }, [initialValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        {...rest}
        label={label || 'Date'}
        views={['year', 'month', 'day']}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, 'data-testid': testid }} />}
      />
    </LocalizationProvider>
  );
}

CommonDatePicker.defaultProps = {
  initialValue: null,
  testid: 'muiDatePicker',
};

export default CommonDatePicker;
