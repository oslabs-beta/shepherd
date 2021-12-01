import moment from 'moment';
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
  

  
const Chart = (props: any) => {

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
    let timePeriod = '30d';
    // get end and start date based on selected timePeriod
    let labels = ['placeholder']
    let testData = ['placeholder'];
    let testDatapoints = ['placeholder'];
    
    //MONTH
    if (timePeriod === '30d' && props.chartData){
        labels = [];
        testData = [];
        // let endDate = moment().format('MM/DD');
        // let startDate = moment().day(-30).format('MM/DD');
        // console.log('enddate + startdate', endDate, startDate)
    
        const popArray = () => {
            for (let i = -28; i < 4; i++){
                labels.push(moment().day(i).format('MM-DD'))
            }
        }
        popArray();
    
        const popData = () => {
            //FORMAT DATA FROM AWS
            for (let i = 0; i < props.chartData.length; i++){
                if (props.chartData[i - 1] && props.chartData[i - 1].x.slice(5, 10) === props.chartData[i].x.slice(5, 10)){
                    if (testData[testData.length - 1]){
                        testData[testData.length - 1].calls += props.chartData[i].y
                    } 

                } else {
                    testData.push({"date": props.chartData[i].x.slice(5, 10), "calls": props.chartData[i].y})
                    //count = 1;
                }
            }

            //CREATE DATAPOINTS ARRAY
            testDatapoints = [];
            for (let i = 0; i < labels.length; i++){
                if (labels[i] === testData[0].date){
                    testDatapoints.push(testData[0].calls)
                    testData.shift();
                } else {
                    testDatapoints.push(0)
                }
            }
            console.log('updated chartdata', testData)
            console.log('testDatapoints', testDatapoints)

        }
        popData();
        
    }
    //let labels = ['10'];
    //const datapoints = [0, 25, 0, 15, 25, 0, 20, 0,94 , 0, 15, 25, 0, 20, 0, 25, 0, 15, 25, 0, 20, 0, 0, 0, 15, 25, 0, 20];
    let datapoints = testDatapoints
    
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
    return (
        <React.Fragment>
            <Line options={options} data={data} style={{minHeight: '100%', minWidth: '100%', padding: '1%',}} />;
            {props.invocations}
        </React.Fragment>
    );
  };
  
  export default Chart; 