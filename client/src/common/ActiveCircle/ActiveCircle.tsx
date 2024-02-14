import { Icon } from '@mui/material';
import MDBox from 'ui/MDBox';

interface Props {
  active: boolean;
  // label:'';
  [key: string]: any;
}

export default function ActiveCircle({ active, ...rest }: Props) {
  return (
    <MDBox fontSize="0.6rem" {...rest}>
      <Icon color={active ? 'success' : 'error'}>circle</Icon>
    </MDBox>
  );
}
