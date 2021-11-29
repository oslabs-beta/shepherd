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
export const fetchMetricAllFunctions = async (time: String, credentialsState: Object, setInvocations:Function, setThrottles: Function, setActive: Function, listOfFuncs: Array<string>) => {

  const fetchTotalInvocations = async (time: String, credentialsState: Object, setInvocations:Function) => {
    const response = await fetch('/aws/getMetricAllFunc/Invocations', {
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

   const fetchTotalThrottles = async (time: String, credentialsState: Object, setThrottles: Function) => {
    const response = await fetch('/aws/getMetricAllFunc/Throttles', {
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
    const response = await fetch('/aws/getMetricAllFunc/Invocations', {  
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
          console.log('ELEMENTS',element);
          if (element.y > max) {
            max = element.y;
            mostUsed = element.name;
          }
        });
  // TOTALS CALLS THIS TIME PERIOD
        return mostUsed;
      });
  };
  fetchTotalInvocations(time, credentialsState, setInvocations);
  fetchTotalThrottles(time, credentialsState, setThrottles);
  fetchMostActiveFunc(time, credentialsState, setActive, listOfFuncs);

}