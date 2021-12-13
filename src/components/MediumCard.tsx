import React from 'react';

type Props = {
  color: string,
  icon: React.ReactNode,
  displayFunc: string,
  cardText: string,
}

const MediumCard = ({ color, icon, displayFunc, cardText }: Props) => {

  const cardColor = {
    backgroundColor: color
  };

  const fontColor = {
    color: color
  };
  
  return (
    <React.Fragment>
      <div className="medium-card-wrapper">
        <div className="medium-card-color" style={cardColor}>
          {icon}
        </div>
        <div className="medium-card-body">
          <p className="card-text-1">{displayFunc ? displayFunc : 'N/A'}</p>
          <p className="card-text-2">Most <span className="medium-font-color" style={fontColor}>&nbsp;{cardText}</span></p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MediumCard; 