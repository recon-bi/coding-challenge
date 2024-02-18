import CommonDatePicker from 'common/DatePicker';
import { Box } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

interface Props {
  id?: string;
  onChange: (newValues: any) => void;
  firstDate?: string;
  lastDate?: string;
}

function DateRangePicker({ onChange, firstDate, lastDate, id }: Props) {
  const [values, setValues] = React.useState({});

  // const [sliderValue, setSliderValue] = React.useState<number[]>([0, 100]);

  const validate = (values: any) => {
    if (Object.keys(values).some((v: string) => values[v] === null)) return true;
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
          <CommonDatePicker
            testid={`${id}_dateRangePickerStart`}
            label="Start Date"
            initialValue={firstDate}
            onChange={(newValue: any) => handleChange(newValue, 'startDate')}
          />
        </Box>
        <Box ml={1} minWidth={150}>
          <CommonDatePicker
            testid={`${id}_dateRangePickerEnd`}
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
  firstDate: null,
  lastDate: null,
};

export default DateRangePicker;
