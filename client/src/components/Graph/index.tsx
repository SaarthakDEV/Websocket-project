import { chartOptions } from "../../config";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../config/socket";
import { addData, addTimestamp } from "../../redux/chartSlice";

const Graph = () => {
  const { series, label } = useSelector((state: any) => state.chart);
  const dispatch = useDispatch();
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  useEffect(() => {
    const handleNewStockValue = (value: { value: number, timestamp: number }) => {
      dispatch(addData(value.value));
      dispatch(addTimestamp(value.timestamp));
    };

    socket.on("new-stock-value", handleNewStockValue);

    return () => {
      socket.off("new-stock-value", handleNewStockValue);
    };
  }, [dispatch]);

  const options = useMemo(() => {
    return {
      ...chartOptions,
      xaxis: {
        categories: label,
      },
    };
  }, [label]);

  if (!Chart) return null;
  return (
    <div className="flex-1">
      <Chart
        options={options}
        series={[{ name: "XYZ Stocks", data: series }]}
        type="area"
        height={300}
        width="100%"
        
      />
    </div>
  );
};

export default Graph;
