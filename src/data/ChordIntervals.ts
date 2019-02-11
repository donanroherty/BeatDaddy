import { Interval, Key, ChordType } from './Types'

interface ChordDefinition {
  type: ChordType
  typeSuffix: string
  intervals: Array<Interval>
}

export const chords = {
  Major: <ChordDefinition>{
    type: ChordType.Major,
    typeSuffix: 'M',
    intervals: [Interval.P1, Interval.M3, Interval.P5]
  },
  Minor: <ChordDefinition>{
    type: ChordType.Minor,
    typeSuffix: 'm',
    intervals: [Interval.P1, Interval.m3, Interval.P5]
  },
  Major7: <ChordDefinition>{
    type: ChordType.Major7,
    typeSuffix: 'Maj7',
    intervals: [Interval.P1, Interval.M3, Interval.P5, Interval.M7]
  },
  Minor7: <ChordDefinition>{
    type: ChordType.Minor7,
    typeSuffix: 'm7',
    intervals: [Interval.P1, Interval.m3, Interval.P5, Interval.m7]
  },
  Dominant7: <ChordDefinition>{
    type: ChordType.Dominant7,
    typeSuffix: '7',
    intervals: [Interval.P1, Interval.M3, Interval.P5, Interval.m7]
  }
}
