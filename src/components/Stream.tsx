import React, { useState } from 'react';

const Stream = (props: any) => {

  const [streamView, setStreamView] = useState(true);

  const streams: any = [];
  
  props.allFuncLogs.map((func: any) => {

    for (let log of func.streams) {
      streams.push(
        <div className="log-wrapper">
          <i className="far fa-file-alt log-icon"></i>
          <div className="log-text">
            <div className="func-name">{func.name}</div>
            <div className="time-stamp">{log[1].slice(0, 7) + ' ' + log[1].slice(13)}</div>
          </div>
        </div>
      )
    }
  });

  const errors: any = [];

  props.allFuncLogs.map((func: any) => {

    for (let log of func.errors) {
      errors.push(
        <div className="log-wrapper">
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