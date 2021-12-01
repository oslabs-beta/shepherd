import React from 'react';
import Radio from '../assets/images/radio.gif';

// const Ring = require('../assets/images/ring.gif');

const Loading = () => {
  console.log('loading')
    return (
        <div className="loading-screen">
          <img className="loading-icon" src={Radio} />
        </div>
    );
};

export default Loading; 