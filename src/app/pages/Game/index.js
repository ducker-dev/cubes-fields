import React, {useContext} from 'react';
import './style.scss';
import {PlayerContext} from "../../context/Player/playerContext";
import {PlayerCard} from "../../components/PlayerCard";
import {PlayingField} from "../../components/PlayingField";

export const Game = () => {
  const {playerState} = useContext(PlayerContext);
  return (
    <div className="game container">
      <h1 className="title-one">
        Кидаем кубики, рисуем поля
      </h1>
      <p className="paragraph game__paragraph">
        А что там у нас по очкам?
      </p>
      <div className="game__players">
        {
          playerState.players.map(player => (
            <PlayerCard key={player.id} {...player}/>
          ))
        }
      </div>
      <hr/>
      <PlayingField/>
    </div>
  )
};