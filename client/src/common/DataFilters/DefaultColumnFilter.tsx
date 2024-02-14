import MDInput from 'ui/MDInput';

interface Props {
  column: any;
}

function DefaultColumnFilter({
  column,
  column: { filterValue, setFilter },
}: // ...rest
Props) {
  const handleChange = (e: any) => {
    e.stopPropagation();
    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
  };
  return (
    <MDInput
      value={filterValue || ''}
      size="small"
      margin="dense"
      onChange={handleChange}
      placeholder={column.Header}
    />
  );
}

export default DefaultColumnFilter;
