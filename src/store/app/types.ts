import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type AppActions = ActionType<typeof actions>

export interface IAppState {
  isPlaying: boolean
  timeSigMenuVisible: boolean
  audioMenuVisible: boolean
}

export enum Constants {
  SET_IS_PLAYING = 'SET_IS_PLAYING',
  TOGGLE_IS_PLAYING = 'TOGGLE_IS_PLAYING',
  SET_TIME_SIG_MENU_VISIBLE = 'SET_TIME_SIG_MENU_VISIBLE',
  SET_AUDIO_MENU_VISIBLE = 'SET_AUDIO_MENU_VISIBLE'
}
