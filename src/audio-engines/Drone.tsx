import React from 'react'
import { Key, ChordType, getKeySafeName } from '../utils/Types'
import { chords } from '../data/ChordIntervals'
// @ts-ignore
import Tone from 'tone'
import { mapToRange } from '../utils/utils'

interface DroneProps {
  chordKey: Key
  chordOctave: number
  chordType: ChordType
  isPlaying: boolean
  volume: number
}

interface DroneState {}

class Drone extends React.Component<DroneProps, DroneState> {
  private synth = new Tone.PolySynth(4, Tone.Synth).toMaster()
  private chordTones: string[] = new Array()

  constructor(props: DroneProps) {
    super(props)

    this.synth.volume.rampTo(this.getSafeVolume(), 0)

    this.handleChordChanged()
  }

  componentDidUpdate(prevProps: DroneProps, prevState: DroneState) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.props.isPlaying ? this.start() : this.stop()
    }

    if (
      prevProps.chordKey !== this.props.chordKey ||
      prevProps.chordType !== this.props.chordType
    ) {
      this.handleChordChanged()
    }

    if (prevProps.volume !== this.props.volume) {
      if (this.props.volume === 0) {
        this.synth.volume.rampTo(-100, 0)
      } else {
        this.synth.volume.rampTo(this.getSafeVolume(), 0)
      }
    }
  }

  // Returns volume prop mapped within a usable range for the drone
  getSafeVolume = () => {
    const min = -40
    const max = 0
    return mapToRange(this.props.volume, 0, 100, min, max)
  }

  start = () => {
    this.synth.triggerAttack(this.chordTones)
  }

  stop = () => {
    this.synth.triggerRelease(this.chordTones)
  }

  handleChordChanged = () => {
    const prevChordTones = this.chordTones

    this.chordTones = this.getChordNotes(
      this.props.chordKey,
      this.props.chordOctave,
      this.props.chordType
    )

    // release previously held keys if they are not still being held in the new chord
    this.synth.triggerRelease(
      prevChordTones.filter(prevTone => this.chordTones.findIndex(tone => tone === prevTone) === -1)
    )

    // Timeout allows time for previous chord to release
    setTimeout(() => {
      if (this.props.isPlaying) {
        this.start()
      }
    }, 1)
  }

  // Get the notes of a predefined chord type
  getChordNotes = (key: Key, octave: number, type: ChordType) => {
    const keyFinal = getKeySafeName(key) + octave
    const chordDef = chords.find(val => val.type === type)

    if (!chordDef) return []

    const intervals = Tone.Frequency(keyFinal).harmonize(chordDef.intervals)
    const freqs = intervals.reduce((acc: string[], curr: any) => {
      return [...acc, curr._val]
    }, [])

    return freqs
  }

  render() {
    return <div />
  }
}

export default Drone
