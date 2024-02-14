import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { formatPercentage } from 'lib/utils/numbers';
import useDarkMode from 'hooks/useDarkMode';

interface Props {
  color?: 'primary' | 'inherit' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  value: number;
  size?: number;
  fontVariant?:
    | 'inherit'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';
}

function CircularProgressStatic({ value, color, size, fontVariant, ...props }: Props) {
  const bgCircleColor = useDarkMode() ? 'dark' : 'light';
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === bgCircleColor ? 200 : 800],
        }}
        size={size}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        color={color}
        value={value * 100}
        size={size}
        thickness={4}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant={fontVariant} component="div" color="dark">
          {formatPercentage(value)}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressStatic.defaultProps = {
  color: 'success',
  size: 40,
  fontVariant: 'caption',
};

export default CircularProgressStatic;
