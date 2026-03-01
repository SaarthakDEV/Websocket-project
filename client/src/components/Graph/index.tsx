import { chartOptions } from "../../config";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const Graph = () => {
  const series = useSelector((state: any) => state.chart.series)
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  if (!Chart) return null;
  return (
    <div className="flex-1">
      <Chart
        options={chartOptions}
        series={[{ name: "XYZ Stocks",data: series }]}
        type="area"
        height={300}
        width="100%"
      />
    </div>
  );
};

export default Graph;
