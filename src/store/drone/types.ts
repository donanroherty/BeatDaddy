import { ChordType, Key } from './../../utils/Types'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type DroneActions = ActionType<typeof actions>

export interface IDroneState {
  chordKey: Key
  chordType: ChordType
  chordOctave: number
  droneVolume: number
  a4: number
}

export enum Constants {
  SET_CHORD_KEY = 'SET_CHORD_KEY',
  SET_CHORD_TYPE = 'SET_CHORD_TYPE',
  SET_DRONE_VOLUME = 'SET_DRONE_VOLUME'
}
