import React from 'react';

const SmallLog = (props: any) => {
    return (
      <React.Fragment>
        <div className="stream-container">
          <div className="stream-header">
            { props.bothLogs ? 
            <div className="normal-stream">
              {props.streamView ? 'Streams' : 'Errors'}
            </div>
              :
            <div className="normal-stream">
              {props.streamsOnly ? 'Streams' : 'Errors'}
            </div>
            }
            <div className={"toggle-container" + (props.streamView ? ' blue-container' : ' red-container') + (props.noToggle ? ' no-toggle' : '')}>
              <div className={"stream-toggle" + (props.streamView ?  '' : ' active-stream')} onClick={() => props.setStreamView(!props.streamView)}> </div>
            </div>
          </div> 
          { props.bothLogs ? 
          <div className="stream-body">
            { props.streamView ? props.allStreams : props.allErrors}
            { !props.allStreams.length && !props.allErrors.length ? <div className="no-streams-message">No streams to display</div> : null }
          </div>
            :
          <div className="stream-body">
            { props.streamsOnly && props.onlyFuncView.length > 0 ? props.onlyFuncView : null }
            { props.errorsOnly && props.onlyErrorView.length > 0 ? props.onlyErrorView : null }
            { props.streamsOnly && !props.onlyFuncView.length ? <div className="no-streams-message">No streams to display</div> : null }
            { props.errorsOnly && !props.onlyErrorView.length ? <div className="no-streams-message">No errors to display</div> : null }
            {/* { props.onlyFuncView.length && props.onlyErrorView.length ? <div className="no-streams-message">No streams to display</div> : null } */}
            {/* { props.streamsOnly ? props.allStreams : props.allErrors } */}
            {/* { !props.allStreams.length && !props.allErrors.length ? <div className="no-streams-message">No streams to display</div> : null } */}
          </div>
          }
          <div className="stream-footer"></div>
        </div> 
      </React.Fragment>
    );
};

export default SmallLog; 