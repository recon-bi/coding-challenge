import DateRangePicker from 'common/DateRangePicker';

interface Props {
  onChange: (props: any) => void;
}

function DateRangeSearch({ onChange }: Props) {
  const handleDatePickerChange = (props: any) => {
    onChange(props);
  };

  return <DateRangePicker id="DateRangeSearch" onChange={handleDatePickerChange} />;
}

export default DateRangeSearch;
