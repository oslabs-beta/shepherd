import React, { useState, useEffect, Component} from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import { Credentials } from '@aws-sdk/client-sts';
import Settings from './components/Settings';
import Login from './components/Login'
import Register from './components/Register'
import Loading from './components/Loading';
import * as fetching from './functions';

const App = (props: any) => {
  // THIS WILL BE THE CURRENT USERS ARN
  const [arn, setArn] = useState(process.env.TEST_ARN);
  const [userData, setUserData] = useState({});
  const [timePeriod, setTimePeriod] = useState('30d');
  const [credentials, setCredentials] = useState(null);
  const [functionList, setFunctionList] = useState([]);
  const [totalInvocations, setTotalInvocations] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalThrottles, setTotalThrottles] = useState(0);
  const [mostActiveFunc, setMostActiveFunc] = useState(null);
  const [mostErrorFunc, setMostErrorFunc] = useState(null);
  const [allFuncLogs, setAllFuncLogs] = useState([]);
  const [infoPerFunction, setInfoPerFunction] = useState([]);

  // SETTING MENU & VIEWS

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

// fetching the secret keys
useEffect(() => {
  fetching.fetchCreds(arn, setCredentials);
}, []);

// fetching the list of functions
useEffect(() => {
  if (credentials) {
    fetching.fetchFuncList(credentials, setFunctionList);
  }
}, [credentials]);

// fetch all the metrics
useEffect(() => {
  if (credentials && functionList.length > 0) {
    fetching.fetchMetricAllFunctions(
      timePeriod, 
      credentials, 
      setTotalInvocations,
      setChartData, 
      setTotalThrottles, 
      setMostActiveFunc, 
      setMostErrorFunc, 
      setTotalErrors, 
      functionList,
      );
    fetching.getLogsAllFunctions(timePeriod, credentials, setAllFuncLogs, functionList);
  }
}, [credentials, functionList, timePeriod]);
console.log('FUNCTIONS INFO', infoPerFunction)


  return (
    <div className="container">

      {
        currentView === 'login' ? 
        <Login setCurrentView={setCurrentView} setUserData={setUserData}/> :
        <React.Fragment>
        
        { currentView === 'dashboard' && !allFuncLogs.length ? 
          <Loading /> : null 
        }

        <Header 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
          setCurrentView={setCurrentView}
        />
        <div className="body-wrapper">
          <Menu 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen} 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
          />
          { currentView === 'dashboard' ? 
            <Dashboard 
              setMenuOpen={setMenuOpen} 
              totalInvocations={totalInvocations}
              chartData={chartData} 
              totalErrors={totalErrors} 
              totalThrottles={totalThrottles}
              mostActiveFunc={mostActiveFunc} 
              allFuncLogs={allFuncLogs}
              mostErrorFunc={mostErrorFunc}
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod} /> 
            : null }
          { currentView === 'settings' ? <Settings setMenuOpen={setMenuOpen} userData={userData} /> : null }
        </div>
        </React.Fragment>
      }
    </div>
  );
}
export default App;