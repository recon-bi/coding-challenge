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

function configs(labels: any, datasets: any) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: 'index' as 'x' | 'y' | 'index' | 'point' | 'dataset' | 'nearest' | undefined,
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: '#c1c4ce5c',
          },
          ticks: {
            display: true,
            padding: 10,
            color: '#9ca2b7',
            font: {
              size: 14,
              weight: 300,
              family: 'Roboto',
              style: 'normal' as 'inherit' | 'initial' | 'normal' | 'italic' | 'oblique',
              lineHeight: 2,
            },
          },
        },
        x: {
          min: 1503129600000,
          max: 1503155700000,
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
            borderDash: [5, 5],
            color: '#c1c4ce5c',
          },
          ticks: {
            display: true,
            color: '#9ca2b7',
            padding: 10,
            max: 8,
            font: {
              size: 14,
              weight: 300,
              family: 'Roboto',
              style: 'normal' as 'inherit' | 'initial' | 'normal' | 'italic' | 'oblique',
              lineHeight: 2,
            },
          },
        },
      },
      pan: {
        enabled: true,
        mode: 'x',
        speed: 10,
        threshold: 10,
        rangeMin: {
          x: null,
          y: null,
        },
        rangeMax: {
          x: null,
          y: null,
        },
      },
      zoom: {
        enabled: true,
        mode: '',
      },
    },
  };
}

export default configs;
