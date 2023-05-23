import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://auziqni.com/mockdata.php");
      //   const { data } = response;

      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      <h2>Multiple Axis Chart</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        height={400}
      />
    </div>
  );
};

export default Chart;
