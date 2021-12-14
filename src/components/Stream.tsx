import React, { useState } from 'react';
import SmallLog from './SmallLog';

const Stream = (props: any) => {
  const [streamView, setStreamView] = useState(true);
  // parse the stream object to get name and timestamp
  const streams: any = [];
  const errors: any = [];
  // Map all the streams
  props.allFuncLogs.map((func: any) => {
    const result: any =[];
    const name = func.name;
    if(func.streams.length > 0) {
      const eachFunction: any = [];
      func.streams.map((stream: any) => {
        const date = stream[1].split(' ')
        eachFunction.push({
          funcName: name,
          time: date
        })
      })
      result.push(eachFunction)
    }
    streams.push(result)
  });
  // Map all the errors
  props.allFuncLogs.map((func: any) => {
    const result: any =[];
    const name = func.name;
    if(func.errors.length > 0) {
      const eachFunction: any = [];
      func.errors.map((stream: any) => {
        const date = stream[1].split(' ')
        eachFunction.push({
          funcName: name,
          time: date
        })
      })
      result.push(eachFunction)
    }
    errors.push(result)
  });
// take the streams variable and sort it by date and time. the end result should be an array of objects with the most recent date and time at the beggining of the array.
//[[{funcName:'name', time:[month, day, year, time, am or pm]},{},{}],[]]
  function sortStreamsByDate(streams: any) {
    const allStreams:any =[];
    streams.forEach((arr: any) => {
      arr.forEach((arr2: any) => {
        arr2.forEach((arr3: any) => {
          allStreams.push(arr3)
        })
      })
    })
    // sort the streams by month, day, time, am or pm
    function sortThis(array: any){
      const sortedByMonth: any = {};
      array.forEach((item:any) => {
        if(!sortedByMonth[item.time[0]]){
          sortedByMonth[item.time[0]] = [item];
        } else {
          sortedByMonth[item.time[0]].push(item);
        }
      })
      //this sorts the months by day
      for (const prop in sortedByMonth){
        sortedByMonth[prop].sort((a:any, b:any) => {
          if(a.time[1] > b.time[1]){
            return 1;
          } else if (a.time[1] < b.time[1]){
            return -1;
          }
          })
        }
      // sort the days by time
      for (const prop in sortedByMonth){
        sortedByMonth[prop].sort((a:any, b:any) => {
          // if the time is pm, split the 3rd index from its ":", concat the two parts together and then add 1200 to the result. make sure to keep the order of the days the same which is the first index.
          const dayA = a.time[1];
          const dayB = b.time[1];
          let timeA = a.time[3].split(':');
          let timeB = b.time[3].split(':');
          if(a.time[4] === 'pm'){
            timeA = timeA[0] + timeA[1];
            timeA = parseInt(timeA) + 1200;
          } else {
            timeA = timeA[0] + timeA[1];
            timeA = parseInt(timeA);
          }
          if(b.time[4] === 'pm'){
            timeB = timeB[0] + timeB[1];
            timeB = parseInt(timeB) + 1200;
          } else {
            timeB = timeB[0] + timeB[1];
            timeB = parseInt(timeB);
          }
          const fullTimeA = parseInt(dayA + 'timeA');
          const fullTimeB = parseInt(dayB + 'timeB');
          if(fullTimeA < fullTimeB){
            return 1;
          } else if (fullTimeA > fullTimeB){
            return -1;
          }
        })
      }
      return sortedByMonth;
    }
  return sortThis(allStreams);
}
  function dumpIntoArray(order: Array<string>, obj: any) {
  const result: Array<Object> = [];
  for (const month of order){
    if (obj[month]){
      obj[month].forEach((stream: any) => {
        result.push(stream)
      })
    }
  }
  return result;
}
  const monthsByValue: any =['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'];
  const sortedStreamsInObject: any = sortStreamsByDate(streams);
  const sortedErrorsInObject: any = sortStreamsByDate(errors);
  const streamsArray = dumpIntoArray(monthsByValue, sortedStreamsInObject);
  const errorsArray = dumpIntoArray(monthsByValue, sortedErrorsInObject);
// console.log(streamsArray);
  // map into render array

  const onlyFuncView: {}[] = [];

  const allStreams: any = [];
  streamsArray.forEach((stream: any) => {
    allStreams.push(
      <div className="log-wrapper">
          <i className="far fa-file-alt log-icon"></i>
          <div className="log-text">
            <div className="func-name">{stream.funcName}</div>
            <div className="time-stamp">{`${stream.time[0]} ${stream.time[1]} ${stream.time[3]}${stream.time[4]}`}</div>
          </div>
        </div>
    )
    if (stream.funcName === props.funcView) {
      onlyFuncView.push(
        <div className="log-wrapper">
          <i className="far fa-file-alt log-icon"></i>
          <div className="log-text">
            <div className="func-name">{stream.funcName}</div>
            <div className="time-stamp">{`${stream.time[0]} ${stream.time[1]} ${stream.time[3]}${stream.time[4]}`}</div>
          </div>
        </div>
      )
    }
  })

  console.log('THIS IS ALLSTREAMS', allStreams)

  // console.log('THIS IS ONLYFUNCVIEW', onlyFuncView)


  // const onlyFuncView = allStreams.filter((func: any) => {
  //   return func.funcName === props.funcView;
  // });
  // console.log('THIS IS FUNC VIEW', props.funcView)

  // map into render array
  const onlyErrorView: {}[] = [];

  const allErrors: any = [];
  errorsArray.forEach((error: any) => {
    allErrors.push(
      <div className="log-wrapper">
          <i className="far fa-file-excel error-icon"></i>
          <div className="log-text">
            <div className="func-name">{error.funcName}</div>
            <div className="time-stamp">{`${error.time[0]} ${error.time[1]} ${error.time[3]}${error.time[4]}`}</div>
          </div>
        </div>
    )
    if (error.funcName === props.funcView) {
      onlyErrorView.push(
        <div className="log-wrapper">
          <i className="far fa-file-excel error-icon"></i>
          <div className="log-text">
            <div className="func-name">{error.funcName}</div>
            <div className="time-stamp">{`${error.time[0]} ${error.time[1]} ${error.time[3]}${error.time[4]}`}</div>
          </div>
        </div>
      )
    }
  })

  console.log('THIS IS ONLY ERRORS VIEW', onlyErrorView)
        
  return (
    <React.Fragment>
      <SmallLog 
        streamView={streamView}
        onlyFuncView={onlyFuncView}
        onlyErrorView={onlyErrorView} 
        bothLogs={props.bothLogs}
        streamsOnly={props.streamsOnly} 
        errorsOnly={props.errorsOnly} 
        setStreamView={setStreamView}  
        allStreams={allStreams} 
        allErrors={allErrors} 
        noToggle={props.noToggle} 
      />
    </React.Fragment>
  );
};

export default Stream; 