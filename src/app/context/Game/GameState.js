import React, {useReducer, useEffect, useContext} from 'react';
import {GameContext} from "./gameContext";
import {PlayerContext} from "../Player/playerContext";
import {gameReducer} from "./gameReducer";
import {CHANGE_ACTIVE, CHANGE_STAGE, GET_FIRST, RESET_CUBES, THROW_CUBES} from "../types";

export const GameState = ({children}) => {
  const initialState = {
    cubes: {
      cubeOne: null,
      cubeTwo: null,
    },
    gameStage: 0,
    activePlayer: null
  };
  const [gameState, dispatch] = useReducer(
      gameReducer,
      JSON.parse(localStorage.getItem("gameData")) || initialState
  );
  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(gameState || initialState));
  }, [initialState, gameState]);

  const {playerState, addPoints, addField} = useContext(PlayerContext);

  const changeStage = () => dispatch({
    type: CHANGE_STAGE
  });
  const getFirst = () => {
    dispatch({type: GET_FIRST, payload: playerState.players.length});
    changeStage();
  };
  const throwCubes = () => {
    dispatch({type: THROW_CUBES});
    changeStage();
  };
  const resetCubes = () => {
    dispatch({type: RESET_CUBES});
    changeStage();
  };
  const addingField = ({id, value}) => {
    addField(); // TODO
    changeStage();
  };
  const addingPoints = ({id, value}) => {
    addPoints({id, value});
    changeStage();
  };
  const changeActive = () => {
    dispatch({type: CHANGE_ACTIVE, payload: playerState.players});
    changeStage();
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        getFirst,
        throwCubes,
        resetCubes,
        addingField,
        addingPoints,
        changeActive,
      }}
    >
      {children}
    </GameContext.Provider>
  )
};