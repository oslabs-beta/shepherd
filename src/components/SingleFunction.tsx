import React from 'react';

type Props = {
  funcName: string,
  funcView: string,
  setFuncView: Function,
};

const SingleFunction = ({ funcName, funcView, setFuncView }: Props ) => {

  return (
    <React.Fragment>
      <div className={"single-func-wrapper" + (funcView === funcName ? ' active-func' : '')} onClick={() => setFuncView(funcName)}>
        <div className="single-func-icon">
          <i className="far fa-file-code code-icon"></i>
        </div>
         <div className="single-func-name">
          {funcName}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleFunction; 