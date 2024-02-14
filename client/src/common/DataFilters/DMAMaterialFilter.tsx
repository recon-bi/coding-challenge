import React from 'react';
import AutocompleteCheckbox from 'common/AutocompleteCheckbox';

interface Props {
  column: any;
}

function DataStreamFilter({ column: { setFilter } }: Props) {
  const items = React.useMemo(
    () => [
      {
        name: 'Concrete',
        color: '#756868',
      },
      {
        name: 'Iron',
        color: '#865300',
      },
      {
        name: 'Steel',
        color: '#1100fd',
      },
      {
        name: 'PVC',
        color: '#ffffff',
      },
      {
        name: 'PE',
        color: '#0e8a16',
      },
      {
        name: 'DI',
        color: '#8a0e44',
      },
      {
        name: 'Unknown',
        color: '#b9b9b9',
      },
    ],
    [],
  );

  // const handleChange = (value: any) => {
  //   console.log({ handleChange: value });
  // };

  const handleOptionClick = (value: any) => {
    const newValues = value.map((item: any) => ({
      id: `materialTypes.metricType`,
      value: item.name,
      type: 'keyValuePair',
    }));
    setFilter(newValues.length > 0 ? newValues : undefined);
  };

  return <AutocompleteCheckbox items={items} onClick={handleOptionClick} label="Available Data" />;
}

export default DataStreamFilter;
