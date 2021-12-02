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
        labels = [];
        testData = [];
        const popArray = () => {
            let nowMonth: any = moment().format('D')
            //console.log("CURRENT DAY", nowMonth)
            let newMonth = parseInt(nowMonth) + 3;
            let startMonth = newMonth - 31
            //console.log("starting day", startMonth, "ending day", nowMonth)
            for (let i = startMonth; i < newMonth; i++){
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
        }
        popData();
    }
    //TWO WEEKS
    if (timePeriod === '14d' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
            let nowWeek2: any = moment().format('D')
            //console.log("CURRENT DAY", nowWeek2)
            let newWeek2 = parseInt(nowWeek2) + 3;
            let startWeek2 = newWeek2 - 14
            //console.log("starting day", startWeek2, "ending day", nowWeek2)
            for (let i = startWeek2; i < newWeek2; i++){
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
        }
        popData();
    }
     //ONE WEEK
     if (timePeriod === '7d' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
            let nowWeek: any = moment().format('D')
            let newWeek = parseInt(nowWeek) + 3;
            let startWeek = newWeek - 8
            for (let i = startWeek; i < newWeek; i++){
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
        }
        popData();
    }
    //24 HOURS
    if (timePeriod === '24hr' && props.chartData){
        labels = [];
        testData = [];
        const popArray = () => {
            console.log('triggered pop')
            let testPM = moment().format('hA')
            console.log('testPM', testPM)
            if (testPM.includes("PM")){
                console.log('test PM triggered')
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
            console.log(labels)
        }
        popArray();
        const popData = () => {
            //FORMAT DATA FROM AWS
            console.log('popData trig')
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

            let startTest = moment();
            let remainder = 5 - (startTest.minute() % 5);
            
            //let dateTime = moment(startTest).add(remainder, "minutes").format("h:mmA");
            let dateTime = moment(startTest).add(remainder, "minutes").format("h:mmA");
        
            console.log(dateTime);
                        


            let nowHour: any = dateTime
            console.log(nowHour)
            let startHour = nowHour - 12
            for (let i = startHour; i < nowHour; i+5){
                labels.push(moment().minute(i).format('h:mmA'))
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