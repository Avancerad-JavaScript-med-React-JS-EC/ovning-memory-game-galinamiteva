import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function Card({ 
    handleClick, 
    id, 
    type, 
    flipped, 
    solved,
    height, 
    width, 
    disabled
}) {
    return <div className={`flip-container ${flipped || solved ? 'flipped' : ''}`}

        style={{
            width, height
        }}
        onClick={()=> disabled ? null : handleClick(id)}
        >
        <div className="flipper">
    <img
      className="front"
      src={`/image/${type}.png`}
      alt={type}
    />
    <img
      className="back"
      src="image/back.png"
      alt="card back"
    />
  </div>
</div>
}

Card.propTypes = {
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired, 
    disabled: PropTypes.bool.isRequired
}