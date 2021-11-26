import React from 'react';

const MediumCard = (props: any) => {

  const cardColor = {
    backgroundColor: props.color
  };

  const fontColor = {
    color: props.color
  };

  return (
    <React.Fragment>
      <div className="medium-card-wrapper">
        <div className="medium-card-color" style={cardColor}>
          {props.icon}
        </div>
        <div className="medium-card-body">
          <p className="card-text-1">testFunc</p>
          <p className="card-text-2">Most <span style={fontColor}>{props.cardText}</span></p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MediumCard; 