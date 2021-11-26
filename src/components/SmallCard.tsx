import React from 'react';

const SmallCard = (props: any) => {
  return (
    <React.Fragment>
      <div className="small-card-wrapper"> 
        {props.icon}&nbsp;&nbsp;{props.cardText} <span className="metric">&nbsp;100</span>
      </div>
    </React.Fragment>
  );
};

export default SmallCard; 