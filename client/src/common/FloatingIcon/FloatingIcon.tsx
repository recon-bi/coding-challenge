import { Icon } from '@mui/material';
import MDBox from 'ui/MDBox';

interface Props {
  iconName?: string;
  color?: string;
}

export default function FloatingIcon({ iconName, color }: Props) {
  return (
    <MDBox
      width="4rem"
      height="4rem"
      bgColor={color || 'info'}
      variant="gradient"
      coloredShadow={color || 'info'}
      borderRadius="xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white"
      mt={-5}
      mr={2}
    >
      <Icon fontSize="medium">{iconName}</Icon>
    </MDBox>
  );
}

FloatingIcon.defaultProps = {
  iconName: 'check',
  color: 'info',
};
