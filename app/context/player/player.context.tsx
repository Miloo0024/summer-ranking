'use client'

import type { FC } from 'react'
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'

import { playerReducer, initialState } from './player.reducer'
import type { PlayerContextValue, PlayerProviderProps } from './player.types'
import { ActionTypes, Player } from './player.types'

export const PlayerContext = createContext<PlayerContextValue | null>(null)

const usePlayer = (): PlayerContextValue => {
  const context = useContext(PlayerContext)

  if (!context) throw new Error('usePlayer must be wrapped in an PlayerProvider')

  const { state, dispatch } = context

  const addPlayer = (player: Player) => dispatch({
    type: ActionTypes.ADD_PLAYER,
    payload: { player }
  })

  const updatePlayer = (player: Player) => dispatch({
    type: ActionTypes.UPDATE_PLAYER,
    payload: { player }
  })

  const removePlayer = (id: string) => dispatch({
    type: ActionTypes.REMOVE_PLAYER,
    payload: { id }
  })

  const clearPlayer = () => dispatch({
    type: ActionTypes.CLEAR_ALL
  })

  const setPlayers = (players: Player[]) => dispatch({
    type: ActionTypes.SET_PLAYERS,
    payload: { players }
  })


  return {
    state,
    dispatch,
    addPlayer,
    updatePlayer,
    removePlayer,
    clearPlayer,
    setPlayers
  }
}

const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState)

  // const value = useMemo(
  //   () => ({
  //     state,
  //     dispatch,
  //   }),
  //   [state],
  // ) as PlayerContextValue
  const value = {
    state,
    dispatch,
  } as PlayerContextValue

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export { PlayerProvider, usePlayer }
