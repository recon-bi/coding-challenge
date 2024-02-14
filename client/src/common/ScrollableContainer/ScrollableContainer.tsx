import { ClickAwayListener } from '@mui/material';
import MDBox from 'ui/MDBox';

interface Props {
  height?: number | string;
  width?: number | string;
  children: React.ReactNode;
  onClickAway?: () => void;
  [key: string]: any;
}

function ScrollableContainer({ height, width, children, onClickAway, ...rest }: Props) {
  const renderContainer = () => {
    return (
      <MDBox
        mt={1}
        maxWidth={width}
        bgColor="#fff"
        maxHeight={height}
        overflow="auto"
        borderRadius="10px"
        {...rest}
        p={3}
        zIndex={3000}
        border="0.5px inset"
      >
        {children}
      </MDBox>
    );
  };
  return onClickAway ? (
    <ClickAwayListener onClickAway={onClickAway}>{renderContainer()}</ClickAwayListener>
  ) : (
    renderContainer()
  );
}

ScrollableContainer.defaultProps = {
  height: 400,
  width: 500,
};

export default ScrollableContainer;
