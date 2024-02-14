import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DateRangePicker from 'common/DateRangePicker';
// import { defaultEndDate, defaultStartDate } from 'components/LeakageReporting/ReportingFilters/constants';
import dayjs from 'dayjs';
import React from 'react';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface Props {
  onChange: (newValues: any) => void;
  column: {
    id: string;
    Header: string;
    setFilter: (value: any) => void;
    filterValue: any;
  };
}

const defaultStartDate = dayjs().format('YYYY-MM-DD');
const defaultEndDate = dayjs().add(1, 'week').format('YYYY-MM-DD');

function DateRangeFilter({ onChange, column: { id, Header, setFilter, filterValue } }: Props) {
  const [lastDate, setLastDate] = React.useState<string>(defaultEndDate);
  const [firstDate, setFirstDate] = React.useState<string>(defaultStartDate);

  const handleChange = (params: any) => {
    const startDate = dayjs(params.startDate).utc().format('YYYY-MM-DD');
    const endDate = dayjs(params.endDate).utc().format('YYYY-MM-DD');

    setLastDate(endDate);
    setFirstDate(startDate);

    const dateFilter = {
      id,
      type: 'dateRange',
      value: [startDate, endDate],
    };
    setFilter(dateFilter);
    if (onChange) onChange(dateFilter);
  };

  React.useEffect(() => {
    const startDate = filterValue ? filterValue.value[0] : dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const endDate = filterValue ? filterValue.value[1] : dayjs().format('YYYY-MM-DD');

    setLastDate(endDate);
    setFirstDate(startDate);
  }, []);

  return (
    <Box>
      <Typography variant="h6">{Header}</Typography>
      <Box mt={1}>
        <DateRangePicker onChange={handleChange} firstDate={firstDate} lastDate={lastDate} />
      </Box>
    </Box>
  );
}

DateRangeFilter.defaultProps = {
  onChange: () => null,
};

export default DateRangeFilter;
