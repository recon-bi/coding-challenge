import { Box } from '@mui/material';
import { ReactNode } from 'react';
import MDBox from 'ui/MDBox';

interface Props {
  children: ReactNode;
  bgColor?: string;
  color?: string;
  padding?: number;
  borderRadius?: string;
  [key: string]: any;
}

function Pill({ children, color, bgColor, padding, borderRadius, ...rest }: Props) {
  return (
    <MDBox bgcolor={color} color={color} p={padding} borderRadius="5px" {...rest}>
      {children}
    </MDBox>
  );
}

Pill.defaultProps = {
  color: 'primary',
  bgcolor: 'primary',
  padding: 1,
  borderRadius: '5px',
};

export default Pill;
