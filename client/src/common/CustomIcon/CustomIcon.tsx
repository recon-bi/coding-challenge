import React from 'react';
import { useTheme } from '@mui/material';
import { SvgIconProps } from 'assets/icons/types';
import useDarkMode from 'hooks/useDarkMode';

interface Props {
  Component: React.FC<SvgIconProps>;
}

export default function CustomIcon({ Component }: Props) {
  const darkMode = useDarkMode();
  const theme: any = useTheme();
  const fill = darkMode ? theme.palette.white.main : theme.palette.dark.main;

  return <Component width={32} height={32} fill={fill} />;
}
