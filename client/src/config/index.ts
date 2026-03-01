import type { ApexOptions } from "apexcharts";

export const chartOptions: ApexOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
  },
  stroke: { curve: "smooth" },
  grid: { show: false },
  yaxis: { show: false },
  tooltip: {
    enabled: true,
  },
  dataLabels: {
    enabled: false,
  },
};
