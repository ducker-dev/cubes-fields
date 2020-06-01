import {CHANGE_ACTIVE, CHANGE_STAGE, GET_FIRST, RESET_CUBES, THROW_CUBES} from "../types";

function random(max) {
  return Math.ceil(Math.random() * max);
}

export const gameReducer = (state, {type, payload}) => {
  switch (type) {
    case CHANGE_STAGE:
      return {
        ...state,
        gameStage: state.gameStage + 1
      };
    case GET_FIRST:
      return {
        ...state,
        activePlayer: random(payload) - 1
      };
    case THROW_CUBES:
      return {
        ...state,
        cubes: {
          cubeOne: random(6),
          cubeTwo: random(6),
        }
      };
    case RESET_CUBES:
      return {
        ...state,
        cubes: {
          cubeOne: null,
          cubeTwo: null,
        }
      };
    case CHANGE_ACTIVE:
      return {
        ...state,
        activePlayer: state.activePlayer === payload.length - 1 ? 0 : state.activePlayer + 1
      };
    default:
      return state
  }
};