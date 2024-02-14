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

// Material Dashboard 2 PRO React TS Base Styles
import typography from "assets/theme/base/typography";
import { ScriptableScaleContext } from "chart.js";

function configs(labels: any, datasets: any) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#b2b9bf",
            font: {
              size: 11,
              family: typography.fontFamily,
              style: "normal" as "inherit" | "initial" | "normal" | "italic" | "oblique" | ((ctx: ScriptableScaleContext, options: any) => "inherit" | "initial" | "normal" | "italic" | "oblique" | undefined) | undefined,
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#b2b9bf",
            padding: 10,
            font: {
              size: 11,
              family: typography.fontFamily,
              style: "normal" as "inherit" | "initial" | "normal" | "italic" | "oblique" | ((ctx: ScriptableScaleContext, options: any) => "inherit" | "initial" | "normal" | "italic" | "oblique" | undefined) | undefined,
              lineHeight: 2,
            },
          },
        },
      },
    },
  };
}

export default configs;
