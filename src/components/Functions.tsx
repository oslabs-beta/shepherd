import React, { useState } from 'react';
import SingleFunction from './SingleFunction';
import SmallCard from './SmallCard';
import Stream from './Stream';

type Props = {
  setMenuOpen: Function,
  funcViewData: {name: string, total: number, error: number}[],
  allFuncLogs: {name: string, streams: Array<string>}[],
};

const Functions = ({ setMenuOpen, funcViewData, allFuncLogs }: Props) => {

  const [funcView, setFuncView] = useState('');

  const funcNames = funcViewData.map(func => {
    return <SingleFunction funcName={func.name} funcView={funcView} setFuncView={setFuncView} />
  });

  const calls = funcViewData.map(func => {
    return funcView === func.name ? <SmallCard cardText="Total calls:" metric={func.total} icon={<i className="fas fa-phone-volume call-icon"></i>} /> : null
  });

  const errors = funcViewData.map(func => {
    return funcView === func.name ? <SmallCard cardText="Total errors :" metric={func.error} icon={<i className="fas fa-bug bug-icon"></i>} /> : null
  });


  return (
    <React.Fragment>
      <div className="functions-view-wrapper" onClick={() => setMenuOpen(false)}>
          <div className="functions-header">
              <p className="functions-header-text"> Functions Overview </p>
          </div>
          <div className="functions-view-body">
              <div className="functions-left">
                {funcNames}
              </div>
              <div className="functions-right">
                <div className="func-panel-1">
                  {calls}
                  {errors}
                </div>
                <div className="func-panel-2">
                  { funcView ? <Stream allFuncLogs={allFuncLogs} funcView={funcView} bothLogs={false} streamsOnly errorsOnly={false} noToggle /> : null }
                  <div className="log-divider"></div>
                  { funcView ? <Stream allFuncLogs={allFuncLogs} funcView={funcView} bothLogs={false} streamsOnly={false} errorsOnly noToggle /> : null }
                </div>
              </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default Functions; 