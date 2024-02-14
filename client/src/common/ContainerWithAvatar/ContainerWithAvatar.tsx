import { Icon } from '@mui/material';
import { ReactNode } from 'react';
import MDAvatar from 'ui/MDAvatar';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  icon: string;
  iconColor?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | undefined;
  title: string;
  headersFontSize?: any;
  titleControls?: ReactNode;
  children: ReactNode;
}

function ContainerWithAvatar({ icon, iconColor, title, titleControls, headersFontSize, children }: Props) {
  return (
    <>
      <MDBox mt={1} display="flex" alignItems="center">
        <MDAvatar
          alt="title"
          size="lg"
          variant="rounded"
          bgColor={iconColor}
          sx={{ p: 1, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
        >
          <Icon sx={{ mt: '3px' }} fontSize="large">
            {icon}
          </Icon>
        </MDAvatar>
        <MDBox ml={2} lineHeight={0}>
          <MDTypography variant="h6" textTransform="capitalize" fontSize={headersFontSize}>
            {title}
          </MDTypography>
        </MDBox>
        {titleControls && (
          <MDBox display="flex" ml="auto" mr={3}>
            {titleControls}
          </MDBox>
        )}
      </MDBox>

      <MDBox mt={1.5}>{children}</MDBox>
    </>
  );
}

ContainerWithAvatar.defaultProps = {
  iconColor: 'info',
  headersFontSize: '1rem',
  titleControls: null,
};

export default ContainerWithAvatar;
