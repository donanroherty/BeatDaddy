/**
 * Metronome.tsx
 * Manages the loading, arrangment and playback of metronome sounds
 */

import React, { Component } from 'react'

export interface MetronomeProps {
  audioCtx: AudioContext
  tempo: number
  beatCount: number
  barCount: number
  isPlaying: boolean
  setAudioLoaded: (val: boolean) => void
}
export interface MetronomeState {
  soundPath: string
}

interface BeatSource {
  startTime: number
  source: AudioBufferSourceNode
}

class Metronome extends Component<MetronomeProps, MetronomeState> {
  private beatSources: Array<BeatSource> = [
    {
      startTime: 0,
      source: this.props.audioCtx.createBufferSource()
    }
  ]

  private sound: AudioBuffer = this.props.audioCtx.createBuffer(1, 1, this.props.audioCtx.sampleRate)

  constructor(props: MetronomeProps) {
    super(props)

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

    if (prevProps.tempo !== this.props.tempo && this.props.isPlaying) {
      this.stop()
      this.start()
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

  clearBeatSources = () => {
    if (this.beatSources) {
      this.beatSources.forEach(source => {
        source.source.stop()
      })
    }
  }

  // Generates AudioSourceNode and start time for each beat
  generateBeatAudioSourceNodes = (audioCtx: AudioContext, tempo: number, beatCount: number, barCount: number) => {
    const beatTime = 60.0 / tempo

    const beatStartTimes = new Array(beatCount * barCount).fill(0).map((val, i) => {
      return beatTime * i
    })

    const newBeatSources = beatStartTimes.map((startTime, i) => {
      const source = audioCtx.createBufferSource()
      source.buffer = this.sound
      source.connect(audioCtx.destination)
      return { startTime, source }
    })

    return newBeatSources
  }

  start = () => {
    this.beatSources = this.generateBeatAudioSourceNodes(
      this.props.audioCtx,
      this.props.tempo,
      this.props.beatCount,
      this.props.barCount
    )
    const now = this.props.audioCtx.currentTime
    this.beatSources.forEach(source => source.source.start(now + source.startTime))
  }

  stop = () => {
    this.clearBeatSources()
  }

  render() {
    return (
      <div>
        <div />
      </div>
    )
  }
}

export default Metronome
