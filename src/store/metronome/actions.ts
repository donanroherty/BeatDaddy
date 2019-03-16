import { Accent } from './../../utils/Types'
import { action } from 'typesafe-actions'
import { Constants } from './types'
import { SubDivisionOptions } from '../../utils/Types'

export const setTempo = (value: number) => {
  return action(Constants.SET_TEMPO, { value })
}

export const tapTempo = () => {
  return action(Constants.TAP_TEMPO, {})
}

export const setBeatCount = (value: number) => {
  return action(Constants.SET_BEAT_COUNT, { value })
}

export const setBeatLength = (value: number) => {
  return action(Constants.SET_BEAT_LENGTH, { value })
}

export const setSubdivisions = (value: SubDivisionOptions) => {
  return action(Constants.SET_SUBDIVISIONS, { value })
}

export const setMetronomeVolume = (value: number) => {
  return action(Constants.SET_METRONOME_VOLUME, { value })
}

export const setAudioLoaded = (value: boolean) => {
  return action(Constants.SET_AUDIO_LOADED, { value })
}

export const setBeatAccent = (beatIdx: number, value: Accent) => {
  return action(Constants.SET_BEAT_ACCENT, { beatIdx, value })
}
