import { beatSoundPresets } from './../../data/MetronomeSounds'
import { SubDivisionOptions, Accent } from './../../utils/Types'
import { IMetronomeState, Constants, MetronomeActions } from './types'
import { clamp } from '../../utils/utils'

const init: IMetronomeState = {
  tempo: 90,
  tempoMin: 20,
  tempoMax: 240,
  lastTempoTapTime: 0,
  beatCount: 4,
  beatLength: 4,
  subdivisions: SubDivisionOptions.sixteenth,
  beatSoundPreset: beatSoundPresets.click,
  metronomeVolume: 100,
  audioLoaded: false,
  beatAccents: new Array(4)
    .fill(undefined)
    .map((val, i) => (i === 0 ? Accent.heavy : i === 2 ? Accent.medium : Accent.normal))
}

export const metronomeReducer = (
  state: IMetronomeState = init,
  action: MetronomeActions
): IMetronomeState => {
  switch (action.type) {
    case Constants.SET_TEMPO:
      return { ...state, tempo: Math.floor(action.payload.value) }

    case Constants.TAP_TEMPO:
      const now = new Date().getTime()
      const diff = now - state.lastTempoTapTime
      const bpm = Math.floor(60 / (diff / 1000.0))
      const newTempo =
        bpm > state.tempoMin ? clamp(bpm, state.tempoMin, state.tempoMax) : state.tempo

      return { ...state, tempo: newTempo, lastTempoTapTime: now }

    case Constants.SET_BEAT_COUNT:
      const newBeatCount = action.payload.value
      const newAccents = new Array(newBeatCount)
        .fill(undefined)
        .map((val, i) => (i === 0 ? Accent.heavy : Accent.normal))
      return { ...state, beatCount: newBeatCount, beatAccents: newAccents }

    case Constants.SET_BEAT_LENGTH:
      return { ...state, beatLength: action.payload.value }

    case Constants.SET_SUBDIVISIONS:
      return { ...state, subdivisions: action.payload.value }

    case Constants.SET_METRONOME_VOLUME:
      return { ...state, metronomeVolume: clamp(action.payload.value, 0.0, 100.0) }

    case Constants.SET_AUDIO_LOADED:
      return { ...state, audioLoaded: action.payload.value }

    case Constants.SET_BEAT_ACCENT:
      const newBeatAccents = state.beatAccents.map(
        (val, i) => (i === action.payload.beatIdx ? action.payload.value : val)
      )
      return { ...state, beatAccents: newBeatAccents }

    default:
      return state
  }
}
