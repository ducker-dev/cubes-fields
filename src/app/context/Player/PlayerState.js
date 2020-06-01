import React, {useReducer, useEffect} from 'react';
import {PlayerContext} from "./playerContext";
import {playerReducer} from "./playerReducer";
import {ADD_FIELD, ADD_NUMBER_PLAYERS, ADD_PLAYER, ADD_POINTS, REMOVE_COLOR, CHANGE_ITERATION} from "../types";

export const PlayerState = ({children}) => {
  const initialState = {
    numberPlayers: 0,
    players: [],
    addIteration: 0,
    playerColors: [
      {id: "pC_1", value: "#3497db"},
      {id: "pC_2", value: "#f1c50e"},
      {id: "pC_3", value: "#e74b3c"},
      {id: "pC_4", value: "#18bb9c"},
      {id: "pC_5", value: "#f07817"},
    ]
  };
  const [playerState, dispatch] = useReducer(
      playerReducer,
      JSON.parse(localStorage.getItem("playerData")) || initialState
  );
  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerState || initialState));
  }, [playerState, initialState]);

  const addNumberPlayers = value => {
    dispatch({
        type: ADD_NUMBER_PLAYERS,
        payload: value
      }
    );
  };
  const addPlayer = ({id, name, color}) => {
    dispatch({
      type: ADD_PLAYER,
      payload: {id, name, color, points: 0, arrayFields: []}
    })
  };
  const addField = ({id, x, y, width, height}) => {
    dispatch({
      type: ADD_FIELD,
      // payload: {id, name, color} TODO
    })
  };
  const changeIteration = value => {
    dispatch({
      type: CHANGE_ITERATION,
      payload: value
    })
  };
  const removeColor = value => {
    dispatch({
      type: REMOVE_COLOR,
      payload: value
    })
  };
  const addPoints = ({id, value}) => {
    dispatch({type: ADD_POINTS, payload: {id, value}});
  };

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        addPlayer,
        addField,
        addNumberPlayers,
        changeIteration,
        removeColor,
        addPoints,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
};