import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

const APP_NAME = import.meta.env.VITE_APP_NAME

export default function Error403() {
  return (
    <MDBox padding={5}>
      <MDTypography variant="h2">403 Forbidden</MDTypography>
      <MDBox mt={5}>
        Your user does not have access to this area. Please contact IT support if you feel this is an error
      </MDBox>
      <MDBox>
        <a href="/">Click here to return to {APP_NAME}</a>
      </MDBox>
    </MDBox>
  );
}
