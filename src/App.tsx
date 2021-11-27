import React, { useState, useEffect, Component} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import { Credentials } from '@aws-sdk/client-sts';

const App = (props: any) => {
// ( 1 )
// make fetch to /aws/getCreds POST request
// the request body should look like
// {
//   arn: ARN ID ---> we will get this from the user (testing ARN - arn:aws:iam::853618065421:role/TestDelegationRole )
// };
//! save the response to the state, the response will look like this 

// {
// credentials :{
//    accessKeyId = assumedRole.Credentials.AccessKeyId;
//    secretAccessKey = assumedRole.Credentials.SecretAccessKey;
//    sessionToken = assumedRole.Credentials.SessionToken;
//  }
// }

// ( 2 )
// make a request to get a list of all the lambda functions /aws/getLambdaFunctions POST request
// the request should look like this 
// {
//   region: 'us-east-2',
//   credentials: {{ THE CREDENTIALS THAT YOU SAVED INTO STATE GET SAVED HERE}}
// }
// the response will look like this
// {functions : [AN ARRAY OF ALL THE LAMBDA FUNCTIONS]}
//! save the array to state

// ( 3)
// this is for the component that is total invocations in "this time period"
// end point /aws/getMetricsAllFunc/Invocations'
// the request should look like this
// {
//   timePeriod: {{THE STATE OF THE TIME PERIOD HERE EXAMPLE: 1hr, 24hr, 7d, 30, etc}},
//   region: 'us-east-2',
//   credentials: {{ THE CREDENTIALS THAT YOU SAVED INTO STATE GET SAVED HERE}}
// }
// the response will look like this 
//{
//   "title": "Lambda Invocations All Functions",
//   "data": [
//       {
//           "x": "2021-11-16T20:00:00.000Z",
//           "y": 2
//       },
//       {
//           "x": "2021-11-16T21:00:00.000Z",
//           "y": 22
//       },
//   ],
//   "options": {
//       "startTime": "2021-10-27T21:00:00.000Z",
//       "endTime": "2021-11-26T21:00:00.000Z",
//       "graphPeriod": 30,
//       "graphUnits": "days",
//!       "metricMaxValue": 22   <----- THIS IS WHAT YOU WANT TO BE POSTING AS TOTAL INVOCATIONS IN X TIME PERIOD 
//! SAVE THAT INTO STATE
//   }
// }

// ( 4 )
// EXACT SAME THING ABOVE FOR ERRORS WITH THE END POINT /aws/getMetricsAllFunc/Errors

// ( 5 )
// EXACT SAME THING ABOVE FOR THROTTLES WITH THE END POINT /aws/getMetricsAllFunc/Throttles

// ( 6 )
// getting most active function
// send a post request with fetch to aws/getMetricByFunc/Invocations
//in the request body..
//{timePeriod: "30d", funcNames = state.functionList, region: "us-east-2", credentials: state.credentials}
//the response...
//
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
//       "startTime": "2021-10-27T21:00:00.000Z",
//       "endTime": "2021-11-26T21:00:00.000Z",
//       "graphPeriod": 30,
//       "graphUnits": "days",
//       "metricMaxValueAllFunc": 5,
//       "funcNames": [
//           "andrews_func",
//           "test2"
//       ]
//   }
// }
// the series property contains an array with each function
//    we iterate over each element in the series array and save the max value and its name in state

//time period values
// '1hr'  
// '24hr'
// '7d'
// '14d'
// '30d'
// arn:aws:iam::568675648424:role/TestDelegationRole     <--this is Andrews
// arn:aws:iam::853618065421:role/TestDelegationRole     <--this is barons
  // THIS WILL BE THE CURRENT USERS ARN
  const [arn, setArn] = useState('arn:aws:iam::853618065421:role/TestDelegationRole');
  const [menuOpen, setMenuOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState('24hr');
  const [credentials, setCredentials] = useState(null);
  const [functionList, setFunctionList] = useState([]);
  const [totalInvocations, setTotalInvocations] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalThrottles, setTotalThrottles] = useState(0);
  const [mostActiveFunc, setMostActiveFunc] = useState(null);
  const [mostErrorFunc, setMostErrorFunc] = useState(null);

useEffect(() => {
  fetchCreds();
}, []);

const fetchCreds = async () => {
    const response = await fetch('/aws/getCreds', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        arn: arn,
      }),
    });
    const data = await response.json();
    await setCredentials(data);
  }
console.log('CREDENTIALS OUTSIDE USE EFFECT', credentials)

useEffect(() => {
  if (credentials) {
    fetchFuncList();
  }
}, [credentials]);

const fetchFuncList = async () => {
  const response = await fetch('/aws/getLambdaFunctions', {
    method: 'POST',
    body: JSON.stringify({
      region: 'us-east-2',
      credentials: credentials
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  setFunctionList(data);
}
console.log('FUCNTIONS STATE OUTSIDE OF FUNCTION', functionList)




//! THIS SUCKS AND DIDNT WORK
  // useEffect(() => {
  //   if (arn){
  //     const fetchCreds = fetch('/aws/getCreds', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         arn: arn,
  //       }),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('THIS IS THE CREDENTIALS DATA', data)
  //         setCredentials(data);
  //       }
  //       )
        
  //       .then(() => {
  //         const fetchFunctions = fetch('/aws/getLambdaFunctions', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             region: "us-east-2",
  //             credentials: credentials,
  //           }),
  //         })
  //           .then(response => response.json())
  //           .then(data => {
  //             console.log('THIS IS THE FUNCIONS LIST', data)
  //             setFunctionList(data);
  //           })
  //       }
  //       )
  //   }
  // }, [arn, functionList]);










  
  // use effect to get the list of functions

  // useEffect(() => { 
  //   const fetchFunctions = async () => {
  //     const response = await fetch('/aws/getLambdaFunctions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         region: 'us-east-2',
  //         credentials: credentials,
  //       }),
  //     });
  //     const data = await response.json();
  //     setFunctionList(data);
  //   };
  //   fetchFunctions();
  // }, [credentials]);

  // // use effect to get the total invocations for the time period
  // useEffect(() => {
  //   const fetchTotalInvocations = async () => {
  //     const response = await fetch('/aws/getMetricAllFunc/Invocations', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         timePeriod: timePeriod,
  //         region: 'us-east-2',
  //         credentials: credentials,
  //       }),
  //     });
  //     const res = await response.json();
  //     setTotalInvocations(() => {
  //         let acc = 0;
  //         res.data.forEach((element: any) => {
  //           acc += element.y;
  //         });
  //   // TOTALS CALLS THIS TIME PERIOD
  //         return acc;
  //       });
  //   };
  //   fetchTotalInvocations();
  // }, [timePeriod, functionList, credentials]);

  // // use effect to get the total errors for the time period
  // // useEffect(() => {
  // //   const fetchTotalErrors = async () => {
  // //     const response = await fetch('/aws/getMetricAllFunc/Errors', {
  // //       method: 'POST',
  // //       headers: {
  // //         'Content-Type': 'application/json',
  // //       },
  // //       body: JSON.stringify({
  // //         timePeriod: timePeriod,
  // //         region: 'us-east-2',
  // //         credentials: credentials,
  // //       }),
  // //     });
  // //     const res = await response.json();
  // //     setTotalErrors(() => {
  // //         let acc = 0;
  // //         res.data.forEach((element: any) => {
  // //           acc += element.y;
  // //         });
  // //   // TOTALS CALLS THIS TIME PERIOD
  // //         return acc;
  // //       });
  // //   };
  // //   fetchTotalErrors();
  // // }, [timePeriod, functionList, credentials]);

  // // use effect to get the total throttles for the time period
  // useEffect(() => {
  //   const fetchTotalThrottles = async () => {
  //     const response = await fetch('/aws/getMetricAllFunc/Throttles', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         timePeriod: timePeriod,
  //         region: 'us-east-2',
  //         credentials: credentials,
  //       }),
  //     });
  //     const res = await response.json();
  //     setTotalThrottles(() => {
  //         let acc = 0;
  //         res.data.forEach((element: any) => {
  //           acc += element.y;
  //         });
  //   // TOTALS CALLS THIS TIME PERIOD
  //         return acc;
  //       });
  //   };
  //   fetchTotalThrottles();
  // }, [timePeriod, functionList, credentials]);
 
  // use effect to get the most active function for the time period
  // useEffect(() => {
  //   const fetchMostActiveFunc = async () => {
  //     const response = await fetch('/aws/getMetricByFunc/Invocations', {  
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         timePeriod: timePeriod,
  //         region: 'us-east-2',
  //         credentials: credentials,
  //         functionList: functionList,
  //       }),
  //     });
  //     const res = await response.json();
  //     setMostActiveFunc((): Number => {
  //         let mostUsed = null;
  //         let max = 0;
  //         res.series.forEach((element: any) => {
  //           if (element.y > max) {
  //             max = element.y;
  //             mostUsed = element.name;
  //           }
  //         });
  //   // TOTALS CALLS THIS TIME PERIOD
  //         return mostUsed;
  //       });
  //   };
  //   fetchMostActiveFunc();
  // }, [timePeriod, functionList, credentials]);

  // use effect to get the most error function for the time period
  // useEffect(() => {
  //   const fetchMostErrorFunc = async () => {
  //     const response = await fetch('/aws/getMetricByFunc/Errors', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         timePeriod: timePeriod,
  //         region: 'us-east-2',
  //         credentials: credentials,
  //         functionList: functionList,
  //       }),
  //     });
  //     const res = await response.json();
  //     setMostErrorFunc(() => {
    //       let mostErrors = null;
    //       let max = 0;
    //       res.series.forEach((element) => {
    //         if (element.y > max) {
    //           max = element.y;
    //           mostErrors = element.name;
    //         }
    //       });
    // // TOTALS CALLS THIS TIME PERIOD
    //       return mostErrors;
    //     });
  //   };
  //   fetchMostErrorFunc();
  // }, [timePeriod, functionList, credentials]);

  // log all state items
  // console.log(functionList);
  // console.log(timePeriod);
  // console.log(totalInvocations);
  // console.log(totalErrors);
  // console.log(totalThrottles);
  // console.log(mostActiveFunc);
  // console.log(mostErrorFunc);
  return (
    <div className="container">
      <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className="body-wrapper">
        <Menu menuOpen={menuOpen} />
      
        <Dashboard />
      </div>
    </div>
  );
}
export default App;