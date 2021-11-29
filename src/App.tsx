import React, { useState, useEffect, Component} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import { Credentials } from '@aws-sdk/client-sts';
import Settings from './components/Settings';
import Login from './components/Login'
import Register from './components/Register'
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
  const [currentView, setCurrentView] = useState('dashboard');
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
// console.log('CREDENTIALS OUTSIDE USE EFFECT', credentials)
// fetching the list of functions
useEffect(() => {
  if (credentials) {
    fetching.fetchFuncList(credentials, setFunctionList);
  }
}, [credentials]);
// console.log('FUCNTIONS STATE OUTSIDE OF FUNCTION', functionList)
// fetch all the metrics
useEffect(() => {
  if (credentials && functionList.length > 0) {
    fetching.fetchMetricAllFunctions(timePeriod, credentials, setTotalInvocations, setTotalThrottles, setMostActiveFunc, setMostErrorFunc, setTotalErrors, functionList);
  }
}, [credentials,functionList, timePeriod]);
console.log('ALL METRICS', totalInvocations, totalThrottles, mostActiveFunc, mostErrorFunc, totalErrors)




  return (
    <div className="container">
      <Header 
        setMenuOpen={setMenuOpen} 
        menuOpen={menuOpen} 
        setCurrentView={setCurrentView}
      />
      <div className="body-wrapper">

        <Menu 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
      />
        { currentView === 'dashboard' ? <Dashboard setMenuOpen={setMenuOpen} /> : null }
        { currentView === 'settings' ? <Settings setMenuOpen={setMenuOpen} /> : null }
       </div>
    </div>
  );
}

export default App;
