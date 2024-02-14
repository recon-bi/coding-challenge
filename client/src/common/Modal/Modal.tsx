import React from 'react';
import { Modal, Fade } from '@mui/material';
import useDarkMode from 'hooks/useDarkMode';
import MDBox from 'ui/MDBox';

const defaultStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 1200,
  bgcolor: '#e6e6e6',
  borderRadius: 3,
  border: '1px solid #FFF',
  boxShadow: 24,
  p: 4,
};

interface Props {
  children: any;
  showModal: boolean;
  onModalClose?: () => void;
  width?: number;
  padding?: number;
  cssOverrides?: any;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}

export default function CommonModal({
  showModal,
  onModalClose,
  width,
  padding,
  cssOverrides,
  children,
  disableBackdropClick,
  disableEscapeKeyDown,
}: Props) {
  const [visible, setVisible] = React.useState(false);
  const darkMode = useDarkMode();
  const handleClose = (event: React.SyntheticEvent, reason: string) => {
    event.target;
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    setVisible(false);
    if (onModalClose) onModalClose();
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disableEscapeKeyDown && event.key === 'Escape') {
        event.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [disableEscapeKeyDown]);

  React.useEffect(() => {
    if (showModal !== visible) setVisible(showModal);
  }, [showModal]);

  const bgcolor: string = darkMode ? '#10111b' : '#e6e6e6';
  const style: any = { ...defaultStyle, ...{ bgcolor }, ...cssOverrides };

  return (
    <Modal
      open={visible || false}
      onClose={handleClose}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
      hideBackdrop={!visible}
    >
      <Fade in={showModal}>
        <MDBox padding={padding} sx={style} width={width}>
          {children}
        </MDBox>
      </Fade>
    </Modal>
  );
}

CommonModal.defaultProps = {
  width: undefined,
  padding: 3,
  cssOverrides: [],
  onModalClose: () => {
    //TODO Implement some functionality
  },
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
};
