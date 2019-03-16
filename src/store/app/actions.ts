import { action } from 'typesafe-actions'
import { Constants } from './types'

export function setIsPlaying(value: boolean) {
  return action(Constants.SET_IS_PLAYING, { value })
}

export function toggleIsPlaying() {
  return action(Constants.TOGGLE_IS_PLAYING, {})
}

export function setTimeSigMenuVisible(value: boolean) {
  return action(Constants.SET_TIME_SIG_MENU_VISIBLE, { value })
}

export function setAudioMenuVisible(value: boolean) {
  return action(Constants.SET_AUDIO_MENU_VISIBLE, { value })
}
