import styled from '@emotion/styled';
import Popper from '@mui/material/Popper';

const StyledPopper = styled(Popper)(({ theme }: any) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'}`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

export default StyledPopper;
