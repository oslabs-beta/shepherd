import React from 'react';

type Props = {
  icon: React.ReactNode,
  cardText: string,
  metric: number
}

const SmallCard = ({ icon, cardText, metric }: Props) => {
  return (
    <React.Fragment>
      <div className="small-card-wrapper"> 
        {icon}&nbsp;&nbsp;&nbsp;{cardText} <span className="metric">&nbsp;{metric !== undefined ? metric : '0'}</span>
      </div>
    </React.Fragment>
  );
};

export default SmallCard; 