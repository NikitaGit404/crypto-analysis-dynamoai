import React, { useRef } from "react";
import { useCurrenciesStore } from "../store/currencyStore";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import InfoModal from "./InfoModal";
ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC = () => {
  const { selectedCurrenciesId, storedHistoricalData, colorMap, isLoading } =
    useCurrenciesStore((state) => state);
  const [clickedDatasetIndex, setClickedDatasetIndex] =
    React.useState<number>(-1);
  const [clickedDataIndex, setClickedDataIndex] = React.useState<number>(-1);

  const chartRef = useRef<any>(null); //to handle click events on the chart

  const keys = Object.keys(storedHistoricalData);
  const data = {
    datasets: keys.map((key, index) => ({
      label: key,
      data: storedHistoricalData[key].prices,
      fill: false,
      borderColor: colorMap[key],
    })),
  };
  const options = {
    onClick: (e: any) => {
      const points = chartRef.current.getElementsAtEventForMode(e, "nearest", {
        intersect: true,
      });
      if (points.length) {
        setClickedDatasetIndex(points[0].datasetIndex);
        setClickedDataIndex(points[0].index);
      }
    },
    onHover: (event: any, chartElement: Array<any>) => {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
    },
    scales: {
      xAxis: {
        type: "time" as const,
        time: {
          unit: "day" as const,
        },
      },
      y: {
        title: {
          display: true,
          text: "Price in USD",
        },
        ticks: {
          callback: function (value: string | number) {
            return "$" + value;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };
  return (
    <>
      {selectedCurrenciesId.length !== 0 && (
        <div className="w-full">
          <div className="w-full md:w-3/4 mx-auto ">
            {isLoading ? (
              <Loader />
            ) : (
              <Line data={data} options={options} ref={chartRef} />
            )}
            {clickedDatasetIndex !== -1 && clickedDataIndex !== -1 && (
              <InfoModal
                clickedDatasetIndex={clickedDatasetIndex}
                setClickedDatasetIndex={setClickedDatasetIndex}
                clickedDataIndex={clickedDataIndex}
                setClickedDataIndex={setClickedDataIndex}
              />
            )}
          </div>

          <div className="mx-auto w-full absolute bottom-2">
            For more details, click the points on the chart.
          </div>
        </div>
      )}
    </>
  );
};

export default Chart;
