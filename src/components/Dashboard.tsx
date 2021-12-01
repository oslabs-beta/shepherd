import React from 'react';
import SmallCard from './SmallCard';
import MediumCard from './MediumCard';
import Stream from './Stream';
import Chart from './Chart';
import { useState, useEffect } from 'react';

const Dashboard = (props: any) => {
  // handles time interval
  const handleDropdownChange = (e: any) => {
    props.setTimePeriod(e.target.value);
  };
  return (
      <React.Fragment>
          <div className="main-interface-wrapper" onClick={() => {props.setMenuOpen(false)}}>
            <div className="chart-wrapper">
              <select 
                name="select-time" 
                className="select-time" 
                value={props.timePeriod} 
                onChange={handleDropdownChange}>
                <option value='value' selected> Select Time Period </option>
                <option value="1hr" > 1 hour </option>
                <option value="24hr"> 24 hours </option>
                <option value="7d"> Last week </option>
                <option value="14d"> Last two weeks </option>
                <option value="30d"> Last month </option>
              </select>
              <div className="chart-visual">
                <Chart chartData={props.chartData}/>
              </div>
            </div>
            <div className="overview-wrapper">
              <div className="metrics-wrapper">
                <SmallCard cardText="Total calls:" metric={props.totalInvocations} icon={<i className="fas fa-phone-volume call-icon"></i>}/>
                <SmallCard cardText="Total errors:" metric={props.totalErrors} icon={<i className="fas fa-bug bug-icon"></i>} />
                <SmallCard cardText="Total cost:" icon={<i className="fas fa-dollar-sign dollar-icon"></i>}/>
                <SmallCard cardText="Total throttles:" metric={props.totalThrottles} icon={<i className="fas fa-random throttle-icon"></i>}/>
              </div>
              <div className="functions-wrapper">
                <MediumCard cardText=" active" displayFunc={props.mostActiveFunc} color={"#7c4dff"} icon={<i className="fas fa-file-medical-alt function-icon"></i>}/>
                <MediumCard cardText=" errors" displayFunc={props.mostErrorFunc} color={"#2ab6f6"} icon={<i className="fas fa-exclamation-triangle exclamation-icon"></i>}/>
              </div>
              <div className="stream-wrapper">
                <Stream allFuncLogs={props.allFuncLogs} />
              </div>
            </div>
          </div>
      </React.Fragment>
  );
};

export default Dashboard; 