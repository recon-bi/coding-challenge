import MDBox from 'ui/MDBox';
import { CircularProgress } from '@mui/material';
import MDTypography from 'ui/MDTypography';

interface Props {
  mt?: string | number;
  ml?: string | number;
  size?: string | number;
  noData?: boolean;
  center?: boolean;
}

function Loader({ mt, ml, size, noData, center }: Props) {
  return (
    <MDBox position="absolute" left={center ? '50%' : 0} mt={mt} ml={ml}>
      <MDBox position="relative" left={center ? '-50%' : 0}>
        {noData ? <MDTypography> No data found</MDTypography> : <CircularProgress size={size} />}
      </MDBox>
    </MDBox>
  );
}

Loader.defaultProps = {
  mt: 10,
  ml: 0,
  size: '5rem',
  noData: false,
  center: true,
};

export default Loader;
