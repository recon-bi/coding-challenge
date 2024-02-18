import DateRangePicker from 'common/DateRangePicker';

interface Props {
  onChange: (props: any) => void;
}

function HotelSearch({ onChange }: Props) {
  const handleDatePickerChange = (props: any) => {
    onChange(props);
  };

  return <DateRangePicker id="HotelSearch" onChange={handleDatePickerChange} />;
}

export default HotelSearch;
