import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  value: number | string;
  limit: number;
  mt?: number;
}

function HighLowIcon({ value, limit, mt }: Props) {
  return (
    <MDBox display="flex">
      <MDBox mt={mt}>
        <MDTypography variant="button">{value}</MDTypography>
      </MDBox>
      <MDBox>
        {limit < Number(value) || value === 'High' ? (
          <ArrowDropUpIcon color="error" fontSize="large" />
        ) : (
          <ArrowDropDownIcon color="success" fontSize="large" />
        )}
      </MDBox>
    </MDBox>
  );
}

HighLowIcon.defaultProps = {
  mt: 1,
};

export default HighLowIcon;
