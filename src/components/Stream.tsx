import React, { useState } from 'react';

const Stream = (props: any) => {

  const [streamView, setStreamView] = useState(true);

  const streams: any = [];
  
  props.allFuncLogs.map((func: any) => {

    for (let log of func.streams) {
      streams.push(
        // [func.name, log[1]]
        <div className="log-wrapper">
          {/* <i className="far fa-check-circle log-icon"></i> */}
          {/* <i className="fas fa-clipboard-check log-icon"></i> */}
          {/* <i className="far fa-calendar-check log-icon"></i> */}
          <i className="far fa-file-alt log-icon"></i>
          <div className="log-text">
            <div className="func-name">{func.name}</div>
            <div className="time-stamp">{log[1].slice(0, 7) + ' ' + log[1].slice(13)}</div>
          </div>
        </div>
      )
    }
  });

  // streams.sort((a: any, b: any) => b[0] - a[0]); 

  const errors: any = [];

  props.allFuncLogs.map((func: any) => {

    for (let log of func.errors) {
      errors.push(
        <div className="log-wrapper">
          {/* <i className="far fa-check-circle log-icon"></i> */}
          <i className="far fa-file-excel error-icon"></i>
          <div className="log-text">
            <div className="func-name">{func.name}</div>
            <div className="time-stamp">{log[1].slice(0, 7) + ' ' + log[1].slice(13)}</div>
          </div>
        </div>
      )
    }
  });

  return (
    <React.Fragment>
      <div className="stream-container">
        <div className="stream-header">
          <div className="normal-stream">{streamView ? 'Streams' : 'Errors'}</div>
          <div className={"toggle-container" + (streamView ? ' blue-container' : ' red-container')}>
            <div className={"stream-toggle" + (streamView ?  '' : ' active-stream')} onClick={() => setStreamView(!streamView)}> </div>
          </div>
          
          {/* { streamView ? 
            <i className="fas fa-chevron-circle-down switch-icon" onClick={() => setStreamView(!streamView)}></i> : 
            <i className="fas fa-chevron-circle-up switch-icon" onClick={() => setStreamView(!streamView)}></i>
          } */}
          {/* <div className={"error-stream" + (streamView === 'error' ? ' active-stream' : '')} onClick={() => setStreamView('error')}>Errors</div> */}
        </div>
        <div className="stream-body">
          { streamView ? streams : errors }
        </div>
        <div className="stream-footer"></div>
      </div>
    </React.Fragment>
  );
};

export default Stream; 