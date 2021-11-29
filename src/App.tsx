import React, { useState, useEffect, Component} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import { Credentials } from '@aws-sdk/client-sts';
import * as fetching from './functions';
const App = (props: any) => {
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
  const [timePeriod, setTimePeriod] = useState('30d');
  const [credentials, setCredentials] = useState(null);
  const [functionList, setFunctionList] = useState([]);
  const [totalInvocations, setTotalInvocations] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalThrottles, setTotalThrottles] = useState(0);
  const [mostActiveFunc, setMostActiveFunc] = useState(null);
  const [mostErrorFunc, setMostErrorFunc] = useState(null);

// fetching the secret keys
useEffect(() => {
  fetching.fetchCreds(arn, setCredentials);
}, []);
console.log('CREDENTIALS OUTSIDE USE EFFECT', credentials)

useEffect(() => {
  if (credentials) {
    fetching.fetchFuncList(credentials, setFunctionList);
  }
}, [credentials]);
console.log('FUCNTIONS STATE OUTSIDE OF FUNCTION', functionList)

useEffect(() => {
  if (credentials && functionList.length > 0) {
    fetching.fetchMetricAllFunctions(timePeriod, credentials, setTotalInvocations, setTotalThrottles, setMostActiveFunc, setMostErrorFunc, setTotalErrors, functionList);
  }
}, [credentials,functionList, timePeriod]);
console.log('ALL METRICS', totalInvocations, totalThrottles, mostActiveFunc, mostErrorFunc, totalErrors)

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
  
  //   fetchMostActiveFunc();
  // }, [timePeriod, functionList, credentials]);


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