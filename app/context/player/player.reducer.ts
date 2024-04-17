import type { PlayerReducerAction, PlayerState } from './player.types'
import { ActionTypes } from './player.types'
// import players from '@/public/assets/players.json'

export const initialState: PlayerState = {
  players: []
}

export const playerReducer = (state: PlayerState, action: PlayerReducerAction): PlayerState => {
  switch (action.type) {
    case ActionTypes.SET_PLAYERS: {
      return { players: action.payload.players }
    }
    case ActionTypes.ADD_PLAYER: {
      return { players: [...state.players, action.payload.player] }
    }
    case ActionTypes.REMOVE_PLAYER: {
      return {
        players: state.players.filter(player => player.id !== action.payload.id)
      }
    }
    case ActionTypes.CLEAR_ALL: {
      return {
        players: []
      }
    }
    case ActionTypes.UPDATE_PLAYER: {
      const formerRanking = state.players.filter(player => player.id === action.payload.player.id)[0].ranking

      if (formerRanking > action.payload.player.ranking) {
        return {
          players: state.players.map(player => {
            if (player.id === action.payload.player.id) {
              return action.payload.player
            } else if (player.ranking < formerRanking && player.ranking > action.payload.player.ranking - 1) {
              return { ...player, ranking: player.ranking + 1 }
            } else {
              return player
            }
          })
        }
      } else if (formerRanking === action.payload.player.ranking) {
        return {
          players: state.players.map(player => {
            if (player.id === action.payload.player.id) return action.payload.player
            else return player
          })
        }
      } else {
        return {
          players: state.players.map(player => {
            if (player.id === action.payload.player.id) {
              return action.payload.player
            } else if (player.ranking > formerRanking && player.ranking < action.payload.player.ranking + 1) {
              return { ...player, ranking: player.ranking - 1 }
            } else {
              return player
            }
          })
        }
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${JSON.stringify(action)}`)
    }
  }
}
