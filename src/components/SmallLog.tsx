import React from 'react';

const SmallLog = (props: any) => {
    return (
      <React.Fragment>
        <div className="stream-container">
          <div className="stream-header">
            <div className="normal-stream">{props.streamView ? 'Streams' : 'Errors'}</div>
            <div className={"toggle-container" + (props.streamView ? ' blue-container' : ' red-container')}>
              <div className={"stream-toggle" + (props.streamView ?  '' : ' active-stream')} onClick={() => props.setStreamView(!props.streamView)}> </div>
            </div>
          </div>
          <div className="stream-body">
            { props.streamView ? props.allStreams : props.allErrors }
          </div>
          <div className="stream-footer"></div>
        </div> 
      </React.Fragment>
    );
};

export default SmallLog; 