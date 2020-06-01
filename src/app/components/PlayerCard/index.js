import React from 'react';
import './style.scss';

export const PlayerCard = ({color, name, points}) => (
  <div className="player-card" style={{backgroundColor: color}}>
    {
      points === undefined
        ? <div>{`${name}`}</div>
        : <div>{`${name} - ${points} очков`}</div>
    }
  </div>
);