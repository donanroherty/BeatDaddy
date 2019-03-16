import { Key, ChordType } from './../../utils/Types'
import { action } from 'typesafe-actions'
import { Constants } from './types'

export const setChordKey = (value: Key) => {
  return action(Constants.SET_CHORD_KEY, { value })
}

export const setChordType = (value: ChordType) => {
  return action(Constants.SET_CHORD_TYPE, { value })
}

export const setDroneVolume = (value: number) => {
  return action(Constants.SET_DRONE_VOLUME, { value })
}
