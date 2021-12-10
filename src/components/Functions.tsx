import React from 'react';

const Functions = (props:any) => {
  return (
    <React.Fragment>
      <div className="functions-view-wrapper" onClick={() => props.setMenuOpen(false)}>
          <div className="functions-header">
              <p className="functions-header-text"> Functions View </p>
          </div>
          <div className="functions-view-body">
              <div className="functions-left">
                
              </div>
              <div className="functions-right">


              </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default Functions; 