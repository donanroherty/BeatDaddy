import { Accent } from './../../utils/Types'
import { BeatSoundPreset } from './../../data/MetronomeSounds'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { SubDivisionOptions } from '../../utils/Types'

export type MetronomeActions = ActionType<typeof actions>

export interface IMetronomeState {
  tempo: number
  tempoMin: number
  tempoMax: number
  lastTempoTapTime: number
  beatCount: number
  beatLength: number
  subdivisions: SubDivisionOptions
  beatSoundPreset: BeatSoundPreset
  metronomeVolume: number
  audioLoaded: boolean
  beatAccents: Accent[]
}

export enum Constants {
  SET_TEMPO = 'SET_TEMPO',
  TAP_TEMPO = 'TAP_TEMPO',
  SET_BEAT_COUNT = 'SET_BEAT_COUNT',
  SET_BEAT_LENGTH = 'SET_BEAT_LENGTH',
  SET_SUBDIVISIONS = 'SET_SUBDIVISIONS',
  SET_METRONOME_VOLUME = 'SET_METRONOME_VOLUME',
  SET_AUDIO_LOADED = 'SET_AUDIO_LOADED',
  SET_BEAT_ACCENT = 'SET_BEAT_ACCENT'
}
