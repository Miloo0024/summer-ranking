import React from 'react'
import type { Dispatch } from 'react'

export type PlayerContextValue = {
  state: PlayerState
  dispatch: Dispatch<PlayerReducerAction>
  addPlayer: (props: Player) => void
  updatePlayer: (player: Player) => void
  removePlayer: (id: string) => void
  clearPlayer: () => void
  setPlayers: (players: Player[]) => void
}

export interface PlayerProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

export interface PlayerState {
  players: Player[]
}

export enum ActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  CLEAR_ALL = 'CLEAR_ALL',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  SET_PLAYERS = 'SET_PLAYERS'
}

export type Player = {
  id: string
  name: string
  school: string
  ranking: number
}

export type PlayerReducerAction =
  | {
    type: ActionTypes.ADD_PLAYER
    payload: { player: Player }
  }
  | {
    type: ActionTypes.REMOVE_PLAYER
    payload: { id: string }
  }
  | {
    type: ActionTypes.CLEAR_ALL
  }
  | {
    type: ActionTypes.UPDATE_PLAYER;
    payload: { player: Player }
  } | {
    type: ActionTypes.SET_PLAYERS
    payload: { players: Player[] }
  }
