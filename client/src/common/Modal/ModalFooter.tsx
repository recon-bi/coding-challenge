import MDBox from 'ui/MDBox';
import { useMaterialUIController } from 'context/index';

interface Props {
  children: any;
}

export default function ModalFooter({ children }: Props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <MDBox
      mt={1}
      mb={-1}
      ml={-1}
      mr={-1}
      borderRadius="0px 0px 10px 10px"
      padding="5px"
      paddingBottom={1}
      bgColor={darkMode ? 'dark' : 'grey'}
    >
      {children}
    </MDBox>
  );
}
