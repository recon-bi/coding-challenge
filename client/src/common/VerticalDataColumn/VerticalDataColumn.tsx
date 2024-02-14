import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  label: string;
  value: string;
}

export default function VerticalDataColumn({ label, value }: Props) {
  return (
    <MDBox display="flex" flexDirection="column" lineHeight={0} mr={2} mb={1}>
      <MDTypography variant="button" fontWeight="regular" color="secondary">
        {label}
      </MDTypography>

      <MDTypography variant="button" fontWeight="regular">
        {value}
      </MDTypography>
    </MDBox>
  );
}
