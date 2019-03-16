/**
 * Metronome.tsx
 * Manages the loading, arrangment and playback of metronome sounds
 */

import React, { Component } from 'react'
import { Accent } from '../utils/Types'

import { connect } from 'react-redux'
import { IRootState } from '../store'
import { Dispatch } from 'redux'
import * as mnActions from '../store/metronome/actions'
import { MetronomeActions } from '../store/metronome/types'

export interface MetronomeProps extends ReduxType {
  audioCtx: AudioContext
  masterGain: GainNode
}
export interface MetronomeState {}

class Metronome extends Component<MetronomeProps, MetronomeState> {
  private metronomeGain = this.props.audioCtx.createGain()
  private metronomeBuffer = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)
  private metronomeSource!: AudioBufferSourceNode

  private beatLight = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)
  private beatMedium = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)
  private beatHeavy = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)

  constructor(props: MetronomeProps) {
    super(props)
    this.metronomeGain.gain.value = this.getSafeVolume()
    this.metronomeGain.connect(this.props.masterGain)
    this.loadPreset()
  }

  componentDidUpdate(prevProps: MetronomeProps, prevState: MetronomeState) {
    const playStateUpdated = prevProps.isPlaying !== this.props.isPlaying
    const tempoUpdated = prevProps.tempo !== this.props.tempo
    const beatCountUpdated = prevProps.beatCount !== this.props.beatCount
    const beatLengthUpdated = prevProps.beatLength !== this.props.beatLength
    const beatAccentsUpdated = prevProps.beatAccents !== this.props.beatAccents
    const volumeUpdated = prevProps.metronomeVolume !== this.props.metronomeVolume

    // TODO: Handle user changes beat sound preset.  Requires fetch new audio and restart
    const beatSoundPresetUpdated = prevProps.beatSoundPreset !== this.props.beatSoundPreset

    if (playStateUpdated) {
      if (this.props.isPlaying) {
        this.start()
      } else {
        this.stop()
      }
    }

    if (tempoUpdated || beatCountUpdated || beatLengthUpdated || beatAccentsUpdated) {
      if (this.props.isPlaying) {
        this.stop()
        this.start()
      }
    }

    if (volumeUpdated) {
      this.metronomeGain.gain.value = this.getSafeVolume()
    }
  }

  getSafeVolume = () => {
    const volMax = 1.0
    return (volMax / 100) * this.props.metronomeVolume
  }

  // Load audio samples
  loadPreset = () => {
    // Fetch and decode a sample at the given path and then call the setter
    const fetchSample = (path: string, callback: (sample: AudioBuffer) => void) => {
      return fetch(path)
        .then(res => res.arrayBuffer())
        .then(raw => this.props.audioCtx.decodeAudioData(raw, decoded => callback(decoded)))
        .catch(err => console.log(err))
    }

    this.props.setAudioLoaded(false)

    Promise.all([
      fetchSample(this.props.beatSoundPreset.light, sample => (this.beatLight = sample)),
      fetchSample(this.props.beatSoundPreset.medium, sample => (this.beatMedium = sample)),
      fetchSample(this.props.beatSoundPreset.heavy, sample => (this.beatHeavy = sample))
    ])
      .then(() => {
        this.props.setAudioLoaded(true)
      })
      .catch(err => console.log(err))
  }

  start = () => {
    this.buildMetronomeSource()
    this.metronomeSource.start()
  }

  stop = () => {
    this.metronomeSource.stop()
  }

  updateMetronomeBuffer = () => {
    const beatTime = (60.0 / this.props.tempo) * (4 / this.props.beatLength)
    const barTime = beatTime * this.props.beatCount
    const sampleCount = this.props.audioCtx.sampleRate * barTime

    const sampleStartTimes = new Array(this.props.beatCount).fill(0).map((val, i) => {
      return (sampleCount / this.props.beatCount) * i
    })

    // Add a sample to the buffer for each beat
    const filledBuffer = sampleStartTimes.reduce((acc, time, i) => {
      const accent = this.props.beatAccents[i]

      const beatSound =
        accent === Accent.normal
          ? this.beatLight
          : accent === Accent.medium
            ? this.beatMedium
            : accent === Accent.heavy
              ? this.beatHeavy
              : this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)

      acc.copyToChannel(beatSound.getChannelData(0), 0, time)
      return acc
    }, this.props.audioCtx.createBuffer(1, sampleCount + this.beatHeavy.length, this.props.audioCtx.sampleRate))

    // Crop the buffer to correct length
    const croppedTrack = this.props.audioCtx.createBuffer(
      1,
      sampleCount,
      this.props.audioCtx.sampleRate
    )
    croppedTrack.copyToChannel(filledBuffer.getChannelData(0).subarray(0, sampleCount), 0, 0)

    this.metronomeBuffer = croppedTrack
  }

  buildMetronomeSource = () => {
    this.updateMetronomeBuffer()
    // Initiate a new audio source and add buffer to it
    const newSource: AudioBufferSourceNode = this.props.audioCtx.createBufferSource()
    newSource.buffer = this.metronomeBuffer
    newSource.loop = true
    newSource.connect(this.metronomeGain)
    this.metronomeSource = newSource
  }

  render() {
    return <div />
  }
}

// Redux
//////////////////////
const mapDispatcherToProps = (dispatch: Dispatch<MetronomeActions>) => {
  return {
    setTempo: (value: number) => dispatch(mnActions.setTempo(value)),
    setBeatCount: (value: number) => dispatch(mnActions.setBeatCount(value)),
    setMetronomeVolume: (value: number) => dispatch(mnActions.setMetronomeVolume(value)),
    setAudioLoaded: (value: boolean) => dispatch(mnActions.setAudioLoaded(value))
  }
}

const mapStateToProps = ({ metronome, app }: IRootState) => {
  const { tempo, metronomeVolume, beatCount, beatLength, beatAccents, beatSoundPreset } = metronome
  const { isPlaying } = app
  return { tempo, metronomeVolume, beatCount, beatLength, beatAccents, beatSoundPreset, isPlaying }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
//////////////////////

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(Metronome)
