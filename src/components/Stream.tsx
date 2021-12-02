import React, { useState } from 'react';

const Stream = (props: any) => {

  const [streamView, setStreamView] = useState(true);

  const streams: any = [];
  
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
  console.log(streams)
  // take the streams variable and sort it by date and time. the end result should be an array of objects with the most recent date and time at the beggining of the array.
//[[{funcName:'name', time:[month, day, year, time, am or pm]},{},{}],[]]



  function sortStreamsByDate(streams: any) {
    const monthsByValue: any = {
      'Jan': '01',
      'Feb': '02',
      'Mar': '03',
      'Apr': '04',
      'May': '05',
      'Jun': '06',
      'Jul': '07',
      'Aug': '08',
      'Sep': '09',
      'Oct': '10',
      'Nov': '11',
      'Dec': '12'
    };
    const allStreams:any =[];
    streams.forEach((arr: any) => {
      arr.forEach((arr2: any) => {
        arr2.forEach((arr3: any) => {
          allStreams.push(arr3)
        })
      })
    })
    // sort the streams by month, day, time, am or pm
    allStreams.sort((a: any, b: any) => {
      const aStreamInstance = a.time.split(' ');
      const bStreamInstance = b.time.split(' ');
      const aMonth = monthsByValue[aStreamInstance[0]];
      const bMonth = monthsByValue[bStreamInstance[0]];
      const aDay = aStreamInstance[1];
      const bDay = bStreamInstance[1];
      const aTime = aStreamInstance[3];
      const bTime = bStreamInstance[3];
      const aAMPM = aStreamInstance[4];
      const bAMPM = bStreamInstance[4];
      if(aMonth > bMonth) {
        return 1;
      }
      if(aMonth < bMonth) {
        return -1;
      }
      if(aDay > bDay) {
        return 1;
      }
      if(aDay < bDay) {
        return -1;
      }
      if(aTime > bTime) {
        return 1;
      }
      if(aTime < bTime) {
        return -1;
      }
      if(aAMPM > bAMPM) {
        return 1;
      }
      if(aAMPM < bAMPM) {
        return -1;
      }
      return 0;
    })
    return allStreams;
}
console.log('ALLSTREAMS',sortStreamsByDate(streams))



  // const streamViews = streams.map((stream: any, index: number) => {
  //   return (
  //     <div className="stream-view" key={index}></div>
  //   );
  // });

  //   for (let log of func.streams) {
  //     streams.push(
  //       // [func.name, log[1]]
  //       <div className="log-wrapper">
  //         {/* <i className="far fa-check-circle log-icon"></i> */}
  //         {/* <i className="fas fa-clipboard-check log-icon"></i> */}
  //         {/* <i className="far fa-calendar-check log-icon"></i> */}
  //         <i className="far fa-file-alt log-icon"></i>
  //         <div className="log-text">
  //           <div className="func-name">{func.name}</div>
  //           <div className="time-stamp">{log[1].slice(0, 7) + ' ' + log[1].slice(13)}</div>
  //         </div>
  //       </div>
  //     )
  //   }
  // });
//   0: (3) ['...a8b67', 'Nov 26, 2021 11:18 AM', 'value3 = value3\n']
// 1: (3) ['...a8b67', 'Nov 26, 2021 11:18 AM', 'value2 = value2\n']
//2: (3) ['...a8b67', 'Nov 26, 2021 11:18 AM', 'value1 = value1\n']
 //3: (3) ['...a8b67', 'Nov 26, 2021 11:18 AM', '']
// 4: (3) ['...9ff4d', 'Nov 25, 2021 4:22 PM', 'value3 = value3\n']
// 5: (3) ['...9ff4d', 'Nov 25, 2021 4:22 PM', 'value2 = value2\n']
// 6: (3) ['...9ff4d', 'Nov 25, 2021 4:22 PM', 'value1 = value1\n']
// 7: (3) ['...9ff4d', 'Nov 25, 2021 4:22 PM', '']

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