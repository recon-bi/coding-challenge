import DatePicker from 'common/DatePicker';
import { Box } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

interface Props {
  onChange: (newValues: any) => void;
  firstDate?: string;
  lastDate?: string;
}

function DateRangePicker({ onChange, firstDate, lastDate }: Props) {
  const [values, setValues] = React.useState({});

  // const [sliderValue, setSliderValue] = React.useState<number[]>([0, 100]);

  const validate = (values: any) => {
    const isValid = dayjs(values.startDate).isBefore(values.endDate);
    if (!isValid) {
      Swal.fire(
        'Date Error',
        'You must select a start date that is before the end date or and end date that is after the start date',
        'error',
      );
    }
    return isValid;
  };

  const handleChange = (newValue: any, name: string) => {
    const newValues = { ...values, ...{ [name]: newValue } };
    if (!validate(newValues)) return;
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  React.useEffect(() => {
    const newValues = { startDate: firstDate, endDate: lastDate };
    if (!validate(newValues)) return;
    setValues(newValues);
  }, [firstDate, lastDate]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box minWidth={150}>
          <DatePicker
            label="Start Date"
            initialValue={firstDate}
            onChange={(newValue: any) => handleChange(newValue, 'startDate')}
          />
        </Box>
        <Box ml={1} minWidth={150}>
          <DatePicker
            label="End Date"
            initialValue={lastDate}
            onChange={(newValue: any) => handleChange(newValue, 'endDate')}
          />
        </Box>
      </Box>
    </Box>
  );
}

DateRangePicker.defaultProps = {
  firstDate: dayjs().add(-1, 'weeks').format('DD/MM/YYYY'),
  lastDate: dayjs().format('DD/MM/YYYY'),
};

export default DateRangePicker;
