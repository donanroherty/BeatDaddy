/**
 * Metronome.tsx
 * Manages the loading, arrangment and playback of metronome sounds
 */

import React, { Component } from 'react'
import { setTimeout } from 'timers'

export interface MetronomeProps {
  audioCtx: AudioContext
  tempo: number
  beatCount: number
  beatLength: number
  isPlaying: boolean
  volume: number
  setAudioLoaded: (val: boolean) => void
}
export interface MetronomeState {
  soundPath: string
}

class Metronome extends Component<MetronomeProps, MetronomeState> {
  private metronomeMasterGain = this.props.audioCtx.createGain()
  private metronomeBuffer = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)
  private sound = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)
  private metronomeSource!: AudioBufferSourceNode

  constructor(props: MetronomeProps) {
    super(props)
    this.metronomeMasterGain.gain.value = this.props.volume
    this.metronomeMasterGain.connect(this.props.audioCtx.destination)

    this.state = {
      soundPath: '/audio/metronome.wav'
    }

    this.loadPreset()
  }

  componentDidUpdate(prevProps: MetronomeProps, prevState: MetronomeState) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        this.start()
      } else {
        this.stop()
      }
    }

    if (
      prevProps.tempo !== this.props.tempo ||
      prevProps.beatCount !== this.props.beatCount ||
      prevProps.beatLength !== this.props.beatLength
    ) {
      if (this.props.isPlaying) {
        this.stop()
        this.start()
      }
    }
  }

  // Load audio samples
  loadPreset = () => {
    this.props.setAudioLoaded(false)

    this.fetchSample(this.state.soundPath, sample => (this.sound = sample))
      .then(() => {
        this.props.setAudioLoaded(true)
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
      acc.copyToChannel(this.sound.getChannelData(0), 0, time)
      return acc
    }, this.props.audioCtx.createBuffer(1, sampleCount + this.sound.length, this.props.audioCtx.sampleRate))

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
    newSource.connect(this.metronomeMasterGain)
    this.metronomeSource = newSource
  }

  render() {
    return <div />
  }
}

export default Metronome
