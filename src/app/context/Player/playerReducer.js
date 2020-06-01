import {ADD_NUMBER_PLAYERS, ADD_PLAYER, ADD_POINTS, REMOVE_COLOR, CHANGE_ITERATION} from "../types";

export const playerReducer = (state, {type, payload}) => {
  switch (type) {
    case ADD_NUMBER_PLAYERS:
      return {
        ...state,
        numberPlayers: payload
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [
          ...state.players,
          {...payload}
        ]
      };
    case CHANGE_ITERATION:
      return {
        ...state,
        addIteration: state.addIteration + 1
      };
    case REMOVE_COLOR:
      return {
        ...state,
        playerColors: state.playerColors.filter(color => color.value !== payload)
      };
    case ADD_POINTS:
      return {
        ...state,
        players: state.players.map(player => {
          if (player.id === payload.id) {
            player.points = player.points + payload.value;
            return player
          } else {
            return player
          }
        })
      };
    default:
      return state
  }
};