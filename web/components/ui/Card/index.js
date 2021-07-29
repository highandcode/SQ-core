import React from 'react';
import './card.scss';

function CustomCard() {

  return (
    <div className="cmp-card">
      <div className="cmp-card__header">
        <span className="cmp-card__icon"></span>
      </div>
      <div className="cmp-card__content">
        content here
      </div>
    </div>
  );
}

export default CustomCard;