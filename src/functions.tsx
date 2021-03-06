//fetch secret credentials
export const fetchCreds =  async (ARN:string, set:Function) => {
  const response = await fetch('/aws/getCreds', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      arn: ARN,
    }),
  });
  const data = await response.json();
  await set(data);
}

// fetch list of all functions
export const fetchFuncList = async (credentialsState: Object, setFunctions: Function ) => {
  const response = await fetch('/aws/getLambdaFunctions', {
    method: 'POST',
    body: JSON.stringify({
      region: 'us-east-2',
      credentials: credentialsState
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  setFunctions(data);
}

// fetch total invocations of all functions in a time period 
export const fetchMetricAllFunctions = async (
  time: String, 
  credentialsState: Object, 
  setInvocations:Function,
  setChartData: Function, 
  setThrottles: Function, 
  setActive: Function, 
  setErrors: Function,
  setTotalErrors: Function,
  setFuncViewData: Function,
  listOfFuncs: Array<string>
  ) => {

  const fetchTotalInvocations = async (time: String, credentialsState: Object, setInvocations:Function, setChartData:Function) => {
    const response = await fetch('/aws/getMetricsAllFunc/Invocations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
      }),
    });
    const res = await response.json();
    setInvocations(() => {
        let acc = 0;
        res.data.forEach((element: any) => {
          acc += element.y;
        });
  // TOTALS CALLS THIS TIME PERIOD
        return acc;
      });
  //RETURN WHOLE OBJECT AS CHART DATA
    setChartData(() => {
      console.log("chart data", res.data)
      return res.data;
    })
  };

  const fetchTotalErrors = async (time: String, credentialsState: Object, setTotalErrors:Function) => {
    const response = await fetch('/aws/getMetricsAllFunc/Errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
      }),
    });
    const res = await response.json();
    setTotalErrors(() => {
        let acc = 0;
        res.data.forEach((element: any) => {
          acc += element.y;
        });
  // TOTALS CALLS THIS TIME PERIOD
        return acc;
      });
  };

   const fetchTotalThrottles = async (time: String, credentialsState: Object, setThrottles: Function) => {
    const response = await fetch('/aws/getMetricsAllFunc/Throttles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
      }),
    });
    const res = await response.json();
    setThrottles(() => {
        let acc = 0;
        res.data.forEach((element: any) => {
          
          acc += element.y;
        });
  // TOTALS CALLS THIS TIME PERIOD
        return acc;
      });
  };
  const fetchMostActiveFunc = async (time: String, credentialsState: Object, setActive: Function, listOfFuncs: Array<string>) => {
    const response = await fetch('/aws/getMetricsByFunc/Invocations', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
        funcNames: listOfFuncs,
      }),
    });
    const res = await response.json();
    setActive((): Number => {
        let mostUsed = null;
        let max = 0;
        res.series.forEach((element: any) => {
          if (element.total > max) {
            max = element.total;
            mostUsed = element.name.slice(19);
          }
        });
  // TOTALS CALLS THIS TIME PERIOD
        return mostUsed;
      });
  };
  const fetchMostErrorFunc = async (time: String, credentialsState: Object, setError: Function, listOfFuncs: Array<string>) => {
    const response = await fetch('/aws/getMetricsByFunc/Errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
        funcNames: listOfFuncs,
      }),
    });
    const res = await response.json();
    setError((): Number => {
        let mostErrors = null;
        let max = 0;
        res.series.forEach((element: any) => {
          if (element.total > max) {
            max = element.total;
            mostErrors = element.name.slice(14);
          }
        });
  // TOTALS CALLS THIS TIME PERIOD
        return mostErrors;
      });
  };

  //ADDING SHIT HERE
  const fetchFuncViewData = async (time: String, credentialsState: Object, setFuncViewData:Function, listOfFuncs: Array<string>) => {
    //fetch request for invocations
    const responseInvoke = await fetch('/aws/getMetricsByFunc/Invocations', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
        funcNames: listOfFuncs,
      }),
    });
    const resInvocations = await responseInvoke.json();
    //fetch request for errors
    const responseError = await fetch('/aws/getMetricsByFunc/Errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: time,
        region: 'us-east-2',
        credentials: credentialsState,
        funcNames: listOfFuncs,
      }),
    });
    const resErrors = await responseError.json();
    //end request for errors
    setFuncViewData((): Object => {
        let funcViewArr: Array<Object> = [];
        for (let i = 0; i < resInvocations.series.length; i++){
          let elInvoke: any = resInvocations.series[i];
          let elError: any = resErrors.series[i];
          //slice name
          let nameInvoke: any = elInvoke.name.slice(19,elInvoke.name.length)
          elInvoke.name = nameInvoke
          //change object key name on error obj
          let errorKey: any = "errors"
          elInvoke[errorKey] = elError.total;
          funcViewArr.push(elInvoke)
        }
  // TOTALS CALLS THIS TIME PERIOD
        return funcViewArr;
      });
  };

  //EVERYTHING ABOVE ADDED
  fetchTotalInvocations(time, credentialsState, setInvocations, setChartData);
  fetchTotalErrors(time, credentialsState, setTotalErrors);
  fetchTotalThrottles(time, credentialsState, setThrottles);
  fetchMostActiveFunc(time, credentialsState, setActive, listOfFuncs);
  fetchMostErrorFunc(time, credentialsState, setErrors, listOfFuncs);
  fetchFuncViewData(time, credentialsState, setFuncViewData, listOfFuncs);
}


export const getLogsAllFunctions = async (timePeriod: String, creds: Object, setLogs: Function, listOfFuncs: Array<string>) => {
  const logs: Array<Object> = [];
  for (const func of listOfFuncs) {
    const response = await fetch('/aws/getLogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timePeriod: timePeriod,
        region: 'us-east-2',
        credentials: creds,
        function: func,
      }),
    });
    const res = await response.json();
    logs.push(res);
  }
  setLogs(logs);
}

// {
//   "title": "Lambda Invocations",
//   "series": [
//       {
//           "name": "Lambda Invocations andrews_func",
//           "data": [
//               {
//                   "x": "2021-11-25T21:00:00.000Z",
//                   "y": 1
//               },
//               {
//                   "x": "2021-11-26T16:00:00.000Z",
//                   "y": 1
//               }
//           ],
//           "maxVaue": 1,
//           "total": 2
//       },
//       {
//           "name": "Lambda Invocations test2",
//           "data": [
//               {
//                   "x": "2021-11-16T21:00:00.000Z",
//                   "y": 4
//               },
//               {
//                   "x": "2021-11-26T16:00:00.000Z",
//                   "y": 5
//               }
//           ],
//           "maxVaue": 5,
//           "total": 9
//       }
//   ],
//   "options": {
//       "startTime": "2021-10-30T20:00:00.000Z",
//       "endTime": "2021-11-29T20:00:00.000Z",
//       "graphPeriod": 30,
//       "graphUnits": "days",
//       "metricMaxValueAllFunc": 5,
//       "funcNames": [
//           "andrews_func",
//           "test2"
//       ]
//   }
// }