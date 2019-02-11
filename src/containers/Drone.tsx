import React from 'react'
import { Key, ChordType, Interval } from '../data/Types'
import { chords } from '../data/ChordIntervals'

interface Note {
  key: Key
  octave: number
  frequency: number
}

interface DroneProps {
  a4: number
  audioCtx: AudioContext
  chordKey: Key
  isPlaying: boolean
}

interface DroneState {}

class Drone extends React.Component<DroneProps, DroneState> {
  private chordTones: Array<OscillatorNode> = new Array()
  private notes: Note[] = []
  private masterGainNode = this.props.audioCtx.createGain()

  constructor(props: DroneProps) {
    super(props)
    this.notes = this.getAllNotes()

    this.masterGainNode = this.props.audioCtx.createGain()
    this.masterGainNode.connect(this.props.audioCtx.destination)
    this.masterGainNode.gain.setValueAtTime(0.04, this.props.audioCtx.currentTime)
  }

  static defaultProps: DroneProps = {
    a4: 440,
    audioCtx: new AudioContext(),
    chordKey: Key.C,
    isPlaying: false
  }

  componentDidUpdate(prevProps: DroneProps, prevState: DroneState) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.props.isPlaying ? this.start() : this.stop()
    }

    if (prevProps.chordKey !== this.props.chordKey) {
      if (this.props.isPlaying) {
        this.stop()
        this.start()
      }
    }
  }

  start = () => {
    this.updateChordTones()
    this.chordTones.forEach(osc => {
      osc.start()
    })
  }
  stop = () => {
    this.chordTones.forEach(osc => {
      osc.stop()
    })
  }

  updateChordTones = () => {
    const key = this.props.chordKey
    const chordDef = chords.Major

    const keyIndex = this.notes.findIndex(val => val.key === key && val.octave === 4)

    // Get note definitions for chord intervals
    const intervals = chordDef.intervals.map(interval => this.notes[keyIndex + interval])

    this.chordTones = intervals.map(interval => {
      const osc = this.props.audioCtx.createOscillator()
      osc.frequency.value = interval.frequency
      osc.connect(this.masterGainNode)
      return osc
    })
  }

  // Returns a 12 note chromatic scale in the given octave.
  getOctaveChromaticScale = (octaveNumber: number) => {
    const aFourRelativeOctNumber = octaveNumber - 4
    const aFreqAtOctave = this.props.a4 * Math.pow(2, aFourRelativeOctNumber)

    const getNthKeyFrequency = (n: number, a: number) => {
      return a * Math.pow(2, n / 12)
    }

    const octaveChromaticScale = new Array(12).fill(0).map((val, i) => {
      const pianoKeyNumber = i - 9
      const freq = getNthKeyFrequency(pianoKeyNumber, aFreqAtOctave)

      const note: Note = {
        key: Key[Object.keys(Key)[i] as keyof typeof Key],
        octave: octaveNumber,
        frequency: freq
      }
      return note
    })

    return octaveChromaticScale
  }

  getAllNotes = () => {
    const octaveCount = 8
    return new Array(octaveCount)
      .fill([])
      .map((val, i) => this.getOctaveChromaticScale(i))
      .reduce((acc, curr, i) => {
        return [...acc, ...curr]
      }, [])
  }

  render() {
    return (
      <div>
        <div />
      </div>
    )
  }
}

export default Drone
