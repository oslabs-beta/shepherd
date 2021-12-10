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

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: top,
            title: "Lambda Invocations",
          },
          title: {
            display: true,
            text: 'Lambda Activity',
            align: 'center',
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
    let timePeriod = props.timePeriod;
    let labels: any = []
    let testData: any = [];
    let testDatapoints: any = [];
    
    //MONTH
    if (timePeriod === '30d' && props.chartData){
        testData = [];
        labels = [];
        const popArray = () => {
            for (let i = 0; i < 31; i++){
                let date = moment();
                labels.push(date.subtract(i, 'day').format('MM-DD'))
            }
            labels.reverse()
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
                }
            }
            //CREATE DATAPOINTS ARRAY
            testDatapoints = [];
            for (let i = 0; i < labels.length; i++){
                if (testData[0] && labels[i] === testData[0].date){
                    testDatapoints.push(testData[0].calls)
                    testData.shift();
                } else {
                  testDatapoints.push(0)
                }
            }
        }
        popData();
    }
    //TWO WEEKS
    if (timePeriod === '14d' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
          for (let i = 0; i < 15; i++){
              let date = moment();
              labels.push(date.subtract(i, 'day').format('MM-DD'))
          }
          labels.reverse()
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
                }
            }
            //CREATE DATAPOINTS ARRAY
            testDatapoints = [];
            for (let i = 0; i < labels.length; i++){
                if (testData[0] && labels[i] === testData[0].date){
                    testDatapoints.push(testData[0].calls)
                    testData.shift();
                } else {
                    testDatapoints.push(0)
                }
            }
        }
        popData();
    }
     //ONE WEEK
     if (timePeriod === '7d' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
          for (let i = 0; i < 8; i++){
            let date = moment();
            labels.push(date.subtract(i, 'day').format('MM-DD'))
        }
        labels.reverse()
            
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
                }
            }
            //CREATE DATAPOINTS ARRAY
            testDatapoints = [];
            for (let i = 0; i < labels.length; i++){
                if (testData[0] && labels[i] === testData[0].date){
                    testDatapoints.push(testData[0].calls)
                    testData.shift();
                } else {
                    testDatapoints.push(0)
                }
            }
        }
        popData();
    }

    //24 HOURS
    if (timePeriod === '24hr' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
            let testPM = moment().format('hA')
            if (testPM.includes("PM")){
                let now: any = moment().format('h')
                let start = now - 12
                let parsedNow = parseInt(now) + 12
                for (let i = start; i < parsedNow; i++){
                    labels.push(moment().hour(i).format('hA'))
                    }
            } else {
                let now: any = moment().format('h')
                let start = now - 23
                for (let i = start; i < now; i++){
                    labels.push(moment().hour(i).format('hA'))
                    }
            }
        }
        popArray();
        const popData = () => {
            //FORMAT DATA FROM AWS
            for (let i = 0; i < props.chartData.length; i++){
                if (props.chartData[i - 1] && props.chartData[i - 1].x.slice(11, 13) === props.chartData[i].x.slice(11, 13)){
                    if (testData[testData.length - 1]){
                        testData[testData.length - 1].calls += props.chartData[i].y
                    } 
                } else {
                    testData.push({"date": props.chartData[i].x.slice(11, 13), "calls": props.chartData[i].y})
                }
            }
            //FORMAT RESPONSE FOR h:A FROM MOMENT
            for (let i = 0; i < testData.length; i++){
                testData[i].date = parseInt(testData[i].date)
                testData[i].date -= 5;
                if (testData[i].date > 12){
                    testData[i].date -= 12
                    JSON.stringify(testData[i].date);
                    testData[i].date += "PM"
                } else{
                    JSON.stringify(testData[i].date);
                    testData[i].date += "AM"
                }
            }
            //CREATE DATAPOINTS ARRAY
            testDatapoints = [];
            for (let i = 0; i < labels.length; i++){
                if (testData[0] && labels[i] === testData[0].date){
                    testDatapoints.push(testData[0].calls)
                    testData.shift();
                } else {
                    testDatapoints.push(0)
                }
            }
        }
        popData();
    }
    //1 HOUR
    if (timePeriod === '1hr' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
            for (let i = 0; i < 60; i = i + 5){
                let date = moment();
                labels.push(date.subtract(i, 'minutes').format('h:mmA'))
                //labels.push(moment().minute(i).format('h:mmA'))
            }
            labels.reverse();
        }
        popArray();
        const popData = () => {
            //FORMAT DATA FROM AWS
            testData = [];
            for (let i = 0; i < props.chartData.length; i++){
                testData.push({"date": props.chartData[i].x.slice(14, 16), "calls": props.chartData[i].y})
            }
            //FORMAT RESPONSE FOR h:A FROM MOMENT
            //CREATE DATAPOINTS ARRAY
            testDatapoints = [];
            for (let i = 0; i < labels.length; i++){
                let min;
                let max;
                if (labels[i].length > 6 && labels[i+1]) {
                    min = labels[i].slice(3,5)
                    max = labels[i + 1].slice(3,5)
                }
                if (labels[i].length < 6 && labels[i+1]) {
                    min = labels[i].slice(2, 4)
                    if (labels[i + 1].length && labels[i + 1].length > 6){
                        max = labels[i + 1].slice(3, 5) 
                    }
                    else max = labels[i + 1].slice(2, 4)
                }
                if (!labels[i + 1]){
                    max = labels[i];
                    min = labels[i - 1];
                }
                if (testData[0] && parseInt(max) > testData[0].date && parseInt(min) <= testData[0].date){
                    testDatapoints.push(testData[0].calls)
                    testData.shift();
                } else {
                    testDatapoints.push(0)
                }
            }

        }
        popData();
    }

    //INITIALIZE GRAPH GRAPH
    let datapoints = testDatapoints
    const data = {
        labels,
        datasets: [
          {
            label: 'Lambda Invocations',
            data: datapoints,
            borderColor: '#7c4dff',
            backgroundColor: '#7c4dff',
            fontColor: '#FFFFFF',
            fill: false,
            tension: 0.4,
          }
        ],
      };
    return (
        <React.Fragment>
                <Line options={options} data={data} style={{minHeight: '100%', minWidth: '100%', padding: '1%',}} />
        </React.Fragment>
    );
  };
  
  export default Chart; 