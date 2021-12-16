import React, { useState, useEffect, Component} from 'react';
import { HashRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Functions from './components/Functions';
import { Credentials } from '@aws-sdk/client-sts';
import Settings from './components/Settings';
import Login from './components/Login'
import Register from './components/Register'
import Loading from './components/Loading';
import * as fetching from './functions';


const App = () => {
  // THIS WILL BE THE CURRENT USERS ARN
  const [arn, setArn] = useState('');
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
  const [funcViewData, setFuncViewData] = useState([]);

  console.log('ALL FUNC LOGS', allFuncLogs)

  // SETTING MENU & VIEWS
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  interface userData {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  arn: string;
}
        
// setting arn data from database

useEffect(() => {
  if(userData.arn){
    setArn(userData.arn);
  }
}, [userData]);

// fetching the secret keys
useEffect(() => {
  fetching.fetchCreds(arn, setCredentials);
}, [arn]);

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
      setFuncViewData,
      functionList,
      );
    fetching.getLogsAllFunctions(timePeriod, credentials, setAllFuncLogs, functionList);
  }
}, [credentials, functionList, timePeriod]);

  return (
    <HashRouter>
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
              <Switch>
                <Route exact path="/home" render={(props) => 
                  <Dashboard 
                  {...props}
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
                  } />
                <Route exact path="/functions" render={(props) =>
                  <Functions
                    setMenuOpen={setMenuOpen}
                    funcViewData={funcViewData}
                    allFuncLogs={allFuncLogs}
                    />}
                />
                <Route exact path="/settings" render={(props) => 
                  <Settings 
                  {...props} 
                  setMenuOpen={setMenuOpen} 
                  userData={userData} 
                  />} 
                />
              </Switch>
            </div>
          </React.Fragment>
        }
      </div>
    </HashRouter>
  );
}

export default App;