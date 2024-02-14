import React from 'react';
import AutocompleteCheckbox from 'common/AutocompleteCheckbox';

interface Props {
  column: any;
}

function DataStreamFilter({ column: { setFilter } }: Props) {
  const items = React.useMemo(
    () => [
      {
        name: 'Flow',
        color: '#7057ff',
        description: 'View sensors that have Flow data',
      },
      {
        name: 'Pressure',
        color: '#008672',
        description: 'View sensors that have Pressure data',
      },
      {
        name: 'Battery',
        color: '#b60205',
        description: 'View sensors with battery level readings',
      },
      {
        name: 'Temperature',
        color: '#d93f0b',
        description: 'View sensors with Ambient or Internal temp',
      },
      {
        name: 'Valve',
        color: '#0e8a16',
        description: 'View sensors with valve ops',
      },
    ],
    [],
  );

  const handleOptionClick = (value: any) => {
    const newValues = value.map((item: any) => ({
      id: `dataStreams.metricType`,
      value: item.name,
      type: 'keyValuePair',
    }));
    setFilter(newValues.length > 0 ? newValues : undefined);
  };

  return <AutocompleteCheckbox items={items} onClick={handleOptionClick} label="Available Data" />;
}

export default DataStreamFilter;
