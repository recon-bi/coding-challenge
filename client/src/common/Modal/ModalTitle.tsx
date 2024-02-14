import MDBox from 'ui/MDBox';
import { useMaterialUIController } from 'context/index';

interface Props {
  children: any;
}

export default function ModalTitle({ children }: Props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <MDBox
      mt={-1}
      ml={-1}
      mr={-1}
      borderRadius="10px 10px 0px 0px"
      padding="3px"
      pt="10px"
      pl="10px"
      borderBottom={0}
      bgColor={darkMode ? 'dark' : 'light'}
    >
      {children}
    </MDBox>
  );
}
