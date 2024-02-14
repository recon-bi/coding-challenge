import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Props {
  onChange: (value: any) => void;
  options: { label: string; value: string }[];
  selectedIndex?: number;
}

export default function MUIToggleButton({ onChange, options, selectedIndex }: Props) {
  const [selected, setSelected] = React.useState<any>();
  const [buttonOptions, setButtonOptions] = React.useState<any>([]);

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    event.target;
    setSelected(value);
    if (onChange) onChange(value);
  };

  React.useEffect(() => {
    setButtonOptions(options);
    if (options && options.length > 0) setSelected(options[selectedIndex || 0].value);
  }, [options]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ backgroundColor: 'Background' }}
    >
      {buttonOptions.map((item: any, index: number) => (
        <ToggleButton key={index} value={item.value}>
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

MUIToggleButton.defaultProps = {
  selectedIndex: 0,
};
