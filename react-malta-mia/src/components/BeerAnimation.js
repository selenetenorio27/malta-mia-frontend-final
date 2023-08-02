import React from 'react';
import './BeerAnimation.css';

const BeerAnimation = () => {
  return (
    <div className="beer-container">
      <div className="glass">
        <div className="inner">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bubble"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeerAnimation;