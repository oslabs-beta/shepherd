import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
  
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'testing chart',
      },
    },
    // layout: {
    //     padding: {
    //         top: 5,
    //         left: 15,
    //         right: 15,
    //         bottom: 450
    //     }
    // }
    scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
          title: {
            display: true
          }
        },
        y: {
            display: true,
            grid: {
                display: false,
              },
            title: {
              display: true
            }
          },
    }
  };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const datapoints = [90, 120, 125, 105, 110, 170, 250];

const data = {

    labels,
    datasets: [
      {
        label: 'test set 1',
        data: datapoints,
        borderColor: '#7c4dff',
        backgroundColor: '#7c4dff',
        fill: false,
        tension: 0.4,
      }
    ],
  };
  
const Chart = (props: any) => {
  
    return (
        <React.Fragment>
            <Line options={options} data={data} style={{minHeight: '100%', minWidth: '100%' }} />
        </React.Fragment>
    );
  };
  
  export default Chart; 