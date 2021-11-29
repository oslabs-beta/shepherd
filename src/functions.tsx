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
  setThrottles: Function, 
  setActive: Function, 
  setErrors: Function,
  setTotalErrors: Function,
  listOfFuncs: Array<string>
  ) => {

  const fetchTotalInvocations = async (time: String, credentialsState: Object, setInvocations:Function) => {
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

  fetchTotalInvocations(time, credentialsState, setInvocations);
  fetchTotalErrors(time, credentialsState, setTotalErrors);
  fetchTotalThrottles(time, credentialsState, setThrottles);
  fetchMostActiveFunc(time, credentialsState, setActive, listOfFuncs);
  fetchMostErrorFunc(time, credentialsState, setErrors, listOfFuncs);
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