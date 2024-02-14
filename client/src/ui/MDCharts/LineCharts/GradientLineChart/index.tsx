/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useRef, useEffect, useState, useMemo, ReactNode } from 'react';

// react-chartjs-2 components
import { Chart } from 'react-chartjs-2';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

// Material Dashboard 2 PRO React TS Helper Functions
import gradientChartLine from 'assets/theme/functions/gradientChartLine';

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'assets/theme/base/colors';

// GradientLineChart configurations
import configs from './configs';

// Declaring props types for GradientLineChart
interface Props {
  icon?: {
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark' | null;
    component: ReactNode | null;
  };
  title?: string;
  description?: string | ReactNode;
  filters?: string | ReactNode;
  height?: string | number;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
      data: number[];
    }[];
  };
  noHeader?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  [key: string]: any;
}

function GradientLineChart({
  icon,
  title,
  description,
  filters,
  height,
  chart,
  noHeader,
  showLabels,
  showLegend,
}: Props): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<any>({
    options: {},
    data: { labels: [], datasets: [] },
  });
  const { data, options }: any = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0,
        pointRadius: 0,
        borderWidth: 4,
        borderColor: colors[dataset.color] ? colors[dataset.color || 'dark'].main : colors.dark.main,
        fill: true,
        maxBarThickness: 6,
        backgroundColor: gradientChartLine(
          chartRef?.current?.children[0],
          colors[dataset.color] ? colors[dataset.color || 'dark'].main : colors.dark.main,
        ),
      }))
      : [];

    setChartData(configs(chart.labels || [], chartDatasets, showLabels, showLegend));
  }, [chart]);

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon?.component ? 1 : 2}>
      {!noHeader && (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon?.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || 'info'}
              variant="gradient"
              coloredShadow={icon.color || 'info'}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          {title || description ? (
            <MDBox mt={icon?.component ? -2 : 0}>
              {title && <MDTypography variant="h6">{title}</MDTypography>}
              <MDBox mb={2}>
                <MDTypography component="div" variant="button" color="text">
                  {description}
                </MDTypography>
              </MDBox>
            </MDBox>
          ) : null}
          <MDBox ml="auto" mt={-2}>
            {filters}
          </MDBox>
        </MDBox>
      )}
      {useMemo(
        () => (
          <MDBox ref={chartRef} sx={{ height }}>
            <Chart type="line" data={data} options={options} />
          </MDBox>
        ),
        [chartData, height],
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Declaring default props for GradientLineChart
GradientLineChart.defaultProps = {
  icon: { color: 'info', component: '' },
  title: '',
  description: '',
  filters: '',
  height: '18.125rem',
  noHeader: false,
  showLabels: true,
  showLegend: false,
};

export default GradientLineChart;
