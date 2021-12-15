import React, { ChangeEvent } from 'react';
import SmallCard from './SmallCard';
import MediumCard from './MediumCard';
import Stream from './Stream';
import Chart from './Chart';

type Props = {
  setTimePeriod: Function,
  timePeriod: string,
  setMenuOpen: Function,
  chartData: {x: string, y: string}[],
  totalInvocations: number,
  totalErrors: number,
  totalThrottles: number, 
  mostActiveFunc: string,
  mostErrorFunc: string,
  allFuncLogs: {}[],
};

const Dashboard = ({ setTimePeriod, timePeriod, setMenuOpen, chartData, totalInvocations, totalErrors, totalThrottles, mostActiveFunc, mostErrorFunc, allFuncLogs }: Props) => {
  // handles time interval
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimePeriod(e.target.value);
  };
  return (
      <React.Fragment>
          <div className="main-interface-wrapper" onClick={() => {setMenuOpen(false)}}>
            <div className="chart-wrapper">
              <div className="chart-visual">
                <select 
                  name="select-time" 
                  className="select-time" 
                  value={timePeriod} 
                  onChange={handleDropdownChange}>
                  <option value='value' selected> Select Time Period </option>
                  <option value="1hr" > 1 hour </option>
                  <option value="24hr"> 24 hours </option>
                  <option value="7d"> Last week </option>
                  <option value="14d"> Last two weeks </option>
                  <option value="30d"> Last month </option>
                </select>
                <Chart chartData={chartData} timePeriod={timePeriod}/>
              </div>
            </div>
            <div className="overview-wrapper">
              <div className="metrics-wrapper">
                <SmallCard 
                  cardText="Total calls:" 
                  metric={totalInvocations} 
                  icon={<i className="fas fa-phone-volume call-icon"></i>}
                />
                <SmallCard 
                  cardText="Total errors:" 
                  metric={totalErrors} 
                  icon={<i className="fas fa-bug bug-icon"></i>} 
                />
                <SmallCard 
                  cardText="Total cost:" 
                  metric={0}
                  icon={<i className="fas fa-dollar-sign dollar-icon"></i>}
                />
                <SmallCard 
                  cardText="Total throttles:" 
                  metric={totalThrottles} 
                  icon={<i className="fas fa-random throttle-icon"></i>}
                />
              </div>
              <div className="functions-wrapper">
                <MediumCard 
                  cardText=" active" 
                  displayFunc={mostActiveFunc} 
                  color={"#7c4dff"} 
                  icon={<i className="fas fa-file-medical-alt function-icon"></i>}
                />
                <MediumCard 
                  cardText=" errors" 
                  displayFunc={mostErrorFunc} 
                  color={"#2ab6f6"} 
                  icon={<i className="fas fa-exclamation-triangle exclamation-icon"></i>}
                />
              </div>
              <div className="stream-wrapper">
                <Stream allFuncLogs={allFuncLogs} bothLogs streamsOnly={false} errorsOnly={false} noToggle={false} />
              </div>
            </div>
          </div>
      </React.Fragment>
  );
};

export default Dashboard; 