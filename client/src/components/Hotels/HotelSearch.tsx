import DateRangePicker from 'common/DateRangePicker';
import dayjs from 'dayjs';
import MDBox from 'ui/MDBox';

interface Props {
  onChange: (props: any) => void;
}

function HotelSearch({ onChange }: Props) {
  const handleDatePickerChange = (props: any) => {
    onChange(props);
  };

  return (
    <MDBox>
      <DateRangePicker
        onChange={handleDatePickerChange}
        firstDate={dayjs().add(1, 'days').format('YYYY-MM-DD')}
        lastDate={dayjs().add(3, 'days').format('YYYY-MM-DD')}
      />
    </MDBox>
  );
}

export default HotelSearch;
