import MDBadge from 'ui/MDBadge';
import { statusColors } from 'lib/utils/colors';
import MDBox from 'ui/MDBox';
import ErrorIcon from '@mui/icons-material/Error';

interface Props {
  status: string;
  statusType: string;
}

export default function StatusBadge({ status, statusType }: Props) {
  const filteredStatus = statusColors.filter((x: any) => x.statusType === statusType);
  const selectedStatus = filteredStatus.find((x: any) => x.status === status);

  if (!selectedStatus)
    return (
      <MDBox title="STATUS NOT FOUND: Please have someone from IT look at this data">
        {status}
        <ErrorIcon />
      </MDBox>
    );
  return <MDBadge variant="contained" color={selectedStatus.color} container badgeContent={status} />;
}
