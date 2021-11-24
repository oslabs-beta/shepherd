import React from 'react';

const Dashboard = (props: any) => {
  return (
      <React.Fragment>
          <div className="main-interface-wrapper">
            <div className="chart-wrapper">
              CHART 
            </div>
            <div className="overview-wrapper">
              <div className="metrics-wrapper">
                METRICS
              </div>
              <div className="functions-wrapper">
                FUNCTIONS
              </div>
              <div className="stream-wrapper">
                STREAM
              </div>
            </div>
          </div>
      </React.Fragment>
  );
};

export default Dashboard; 