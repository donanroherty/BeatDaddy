import { ChordType, Key } from './../../utils/Types'
import { IDroneState, Constants, DroneActions } from './types'

const init: IDroneState = {
  chordKey: Key.C,
  chordType: ChordType.Major,
  chordOctave: 4,
  droneVolume: 60,
  a4: 440
}

export const droneReducer = (state: IDroneState = init, action: DroneActions): IDroneState => {
  switch (action.type) {
    case Constants.SET_CHORD_KEY:
      return { ...state, chordKey: action.payload.value as Key }

    case Constants.SET_CHORD_TYPE:
      return { ...state, chordType: action.payload.value as ChordType }

    case Constants.SET_DRONE_VOLUME:
      return { ...state, droneVolume: action.payload.value }

    default:
      return state
  }
}
