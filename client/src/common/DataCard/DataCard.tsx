import React from 'react';
import { Card } from '@mui/material';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  children: React.ReactNode;
  title: string;
  height?: number | string;
  bgColor?: string;
  marginTop?: number | string;
  [key: string]: any;
}

function DataCard({ children, title, height, bgColor, marginTop, ...rest }: Props) {
  return (
    <Card
      sx={{
        maxHeight: height,
        minHeight: height,
        paddingBottom: 3,
        backgroundColor: bgColor,
        marginTop,
      }}
    >
      <MDBox ml={2} mt={1.5}>
        <MDTypography fontSize="1.1rem" fontWeight="bold">
          {title}
        </MDTypography>
      </MDBox>

      <MDBox ml={2} mr={2} mt={1} {...rest}>
        {children}
      </MDBox>
    </Card>
  );
}

DataCard.defaultProps = {
  height: 'auto',
  bgColor: 'none',
};

export default DataCard;
