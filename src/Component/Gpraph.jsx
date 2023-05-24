import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import TelegramMessage from "./TelegramSend";

function Graph(params) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const getuser = async () => {
    setIsLoading(true);

    try {
      let response = await axios.post(
        "https://auziqni.com/ReadOne.php",
        {
          child: params.child,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
      setChartData(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (counter < 2) {
      getuser();
      const timer = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [counter]);

  const formatChartData = () => {
    const categories = chartData.map((item) => item.Date);
    const beratData = chartData.map((item) => item.SensWeight);
    const panjangData = chartData.map((item) => item.SensLenght);
    const suhuData = chartData.map((item) => item.SensTemp);

    return {
      options: {
        chart: {
          stacked: false,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            export: {
              csv: {
                filename: undefined,
                columnDelimiter: ",",
                headerCategory: "category",
                headerValue: "value",
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString();
                },
              },
              svg: {
                filename: undefined,
              },
              png: {
                filename: undefined,
              },
            },
            autoSelected: "zoom",
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              position: "top",
              hideOverflowingLabels: false,
              total: {
                enabled: false,
                formatter: undefined,
              },
            },
          },
        },
        xaxis: {
          categories: categories,
          type: "datetime",
        },
        yaxis: [
          {
            seriesName: "Berat",
            min: 2000,
            max: 15000,
            title: {
              text: "Berat",
            },
          },
          {
            seriesName: "Panjang",
            opposite: true,
            min: 30,
            max: 100,
            title: {
              text: "Panjang",
            },
          },
          {
            seriesName: "Suhu",
            opposite: true,
            min: 25,
            max: 40,
            title: {
              text: "Suhu",
            },
          },
        ],
      },

      series: [
        {
          name: "Berat",
          data: beratData,
          type: "bar",
        },
        {
          name: "Panjang",
          data: panjangData,
          type: "bar",
        },
        {
          name: "Suhu",
          data: suhuData,
          type: "line",
        },
      ],
    };
  };

  const chartOptions = formatChartData().options;
  const chartSeries = formatChartData().series;

  return (
    <div>
      <button onClick={getuser} disabled={isLoading}>
        {isLoading ? "Memuat..." : "Refresh"}
      </button>

      {/* {/* <p1>TABLE BULANAN</p1> */}
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        height={400}
      />
      <TelegramMessage data={chartData} />
      {/* <TelegramMessage data={chartData}}/> */}
    </div>
  );
}

export default Graph;
