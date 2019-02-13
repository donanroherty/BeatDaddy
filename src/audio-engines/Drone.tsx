import React from 'react'
import { Key, ChordType } from '../data/Types'
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
  chordType: ChordType
  isPlaying: boolean
  volume: number
}

interface DroneState {}

class Drone extends React.Component<DroneProps, DroneState> {
  private chordToneOscillators: { oscillator: OscillatorNode; gain: GainNode }[] = new Array()
  private notes: Note[] = []
  private droneMasterGain = this.props.audioCtx.createGain()

  constructor(props: DroneProps) {
    super(props)
    this.notes = this.getAllNotes()
    this.droneMasterGain.connect(this.props.audioCtx.destination)
  }

  componentDidUpdate(prevProps: DroneProps, prevState: DroneState) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.props.isPlaying ? this.start() : this.stop()
    }

    if (
      prevProps.chordKey !== this.props.chordKey ||
      prevProps.chordType !== this.props.chordType
    ) {
      if (this.props.isPlaying) {
        // this.stop()
        this.start()
      }
    }
  }

  start = () => {
    this.updatechordToneOscillators()
    this.chordToneOscillators = this.updatechordToneOscillators()

    const now = this.props.audioCtx.currentTime
    this.droneMasterGain.gain.setValueAtTime(0, now).setTargetAtTime(this.props.volume, now, 2)
  }

  stop = () => {
    this.droneMasterGain.gain.setTargetAtTime(0, this.props.audioCtx.currentTime, 0.2)
  }

  updatechordToneOscillators = (): Array<{ oscillator: OscillatorNode; gain: GainNode }> => {
    const chordDef = chords.find(val => val.type === this.props.chordType)

    const keyIndex = this.notes.findIndex(
      val => val.key === this.props.chordKey && val.octave === 4
    )

    // Get note definitions for chord intervals
    const intervals = chordDef!.intervals.map(interval => this.notes[keyIndex + interval])

    // Kill existing sounds
    this.chordToneOscillators.forEach(val => {
      val.oscillator.stop()
      val.gain.disconnect()
    })

    return intervals.map((interval, i) => {
      const gain = this.props.audioCtx.createGain()
      gain.connect(this.droneMasterGain)

      const osc = this.props.audioCtx.createOscillator()
      osc.frequency.value = interval.frequency

      osc.connect(gain)
      osc.start()

      return { oscillator: osc, gain: gain }
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
    return <div />
  }
}

export default Drone
