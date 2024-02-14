import * as React from 'react';
import { IconButton, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import FilterAltRounded from '@mui/icons-material/FilterAltRounded';
import MDBox from 'ui/MDBox';
import { CheckboxMenuItemType } from 'types/common';
import MDTypography from 'ui/MDTypography';

interface Props {
  onChange?: (options: any[], index: number) => void;
  items?: CheckboxMenuItemType[];
  title?: string;
  autoOpen?: boolean;
}

export default function CheckboxMenu({ onChange, items, title, autoOpen }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [options, setOptions] = React.useState<CheckboxMenuItemType[]>([]);

  const open = Boolean(anchorEl);

  const anchorRef = React.useRef(null);

  const handleChange = (e: any) => {
    const { checked, name: label } = e.target;
    const newOptions = options.concat([]);
    const index = options.findIndex((x) => x.label === label);
    newOptions.splice(index, 1, { label, checked });
    setOptions(newOptions);
    if (onChange) onChange(newOptions, index);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (items && items.length > 0) setOptions(items);
  }, [items]);

  React.useEffect(() => {
    if (autoOpen) setAnchorEl(anchorRef.current);
  }, [autoOpen]);

  return (
    <MDBox>
      {autoOpen ? (
        <MDBox ref={anchorRef} />
      ) : (
        <IconButton
          color="primary"
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FilterAltRounded />
        </IconButton>
      )}
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {title && <MDTypography variant="h6">{title}</MDTypography>}
        {options.map(({ value, label, checked, disabled }) => (
          <MenuItem key={label}>
            <FormControlLabel
              value="metric"
              control={
                <Checkbox
                  name={label}
                  value={value || label}
                  onChange={handleChange}
                  checked={checked}
                  disabled={disabled}
                />
              }
              label={label}
              labelPlacement="end"
            />
          </MenuItem>
        ))}
      </Menu>
    </MDBox>
  );
}

CheckboxMenu.defaultProps = {
  onChange: () => {
    //TODO
  },
  items: [],
  title: undefined,
  autoOpen: false,
};
