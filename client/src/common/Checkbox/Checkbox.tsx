import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent } from 'react';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  name: string;
  label: string;
  onChange: (newValue: { [key: string]: boolean }) => void;
  labelMarginTop: number;
  color?: string;
}

function CommonCheckbox({ name, label, onChange, labelMarginTop, color }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newValue = { [name]: checked };
    onChange(newValue);
  };
  return (
    <MDBox display="flex">
      <MDBox>
        <Checkbox name={name} onChange={handleChange} />
      </MDBox>
      <MDBox mt={labelMarginTop}>
        <MDTypography fontSize="0.9rem" color={color}>
          {label}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

CommonCheckbox.defaultProps = {
  labelMarginTop: 1,
  color: 'primary',
};

export default CommonCheckbox;
