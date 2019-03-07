/**
 * Metronome.tsx
 * Manages the loading, arrangment and playback of metronome sounds
 */

import React, { Component } from 'react'
import { Accent } from '../data/Types'

export interface MetronomeProps {
  audioCtx: AudioContext
  masterGain: GainNode
  tempo: number
  beatCount: number
  beatLength: number
  beatAccents: Accent[]
  isPlaying: boolean
  volume: number
  setAudioLoaded: (val: boolean) => void
}
export interface MetronomeState {
  beatSoundLightPath: string
  beatSoundMediumPath: string
  beatSoundHeavyPath: string
}

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

    this.state = {
      beatSoundLightPath: '/audio/wood-light.wav',
      beatSoundMediumPath: '/audio/wood-medium.wav',
      beatSoundHeavyPath: '/audio/wood-heavy.wav'
    }

    this.loadPreset()
  }

  componentDidUpdate(prevProps: MetronomeProps, prevState: MetronomeState) {
    const playStateUpdated = prevProps.isPlaying !== this.props.isPlaying
    const tempoUpdated = prevProps.tempo !== this.props.tempo
    const beatCountUpdated = prevProps.beatCount !== this.props.beatCount
    const beatLengthUpdated = prevProps.beatLength !== this.props.beatLength
    const beatAccentsUpdated = prevProps.beatAccents !== this.props.beatAccents
    const volumeUpdated = prevProps.volume !== this.props.volume

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
    return (volMax / 100) * this.props.volume
  }

  // Load audio samples
  loadPreset = () => {
    this.props.setAudioLoaded(false)

    Promise.all([
      this.fetchSample(this.state.beatSoundLightPath, sample => (this.beatLight = sample)),
      this.fetchSample(this.state.beatSoundMediumPath, sample => (this.beatMedium = sample)),
      this.fetchSample(this.state.beatSoundHeavyPath, sample => (this.beatHeavy = sample))
    ])
      .then(() => {
        this.props.setAudioLoaded(true)
        // console.log(this.beatLight)
      })
      .catch(err => console.log(err))
  }

  // Fetch and decode a sample at the given path
  fetchSample = (path: string, setter: (sample: AudioBuffer) => void) => {
    return fetch(path)
      .then(res => res.arrayBuffer())
      .then(raw => this.props.audioCtx.decodeAudioData(raw, decoded => setter(decoded)))
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

export default Metronome
