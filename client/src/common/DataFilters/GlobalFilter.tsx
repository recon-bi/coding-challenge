import React from 'react';
import { useAsyncDebounce } from 'react-table';

interface Props {
  preGlobalFilteredRows: object[];
  globalFilter: string;
  setGlobalFilter: Function;
}

export default function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: Props) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}
