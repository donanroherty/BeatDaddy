import { Interval, ChordType } from '../utils/Types'

export interface ChordDefinition {
  type: ChordType
  typeSuffix: string
  intervals: Array<Interval>
}

export const chords: ChordDefinition[] = [
  {
    type: ChordType.Major,
    typeSuffix: 'M',
    intervals: [Interval.P1, Interval.M3, Interval.P5]
  },
  {
    type: ChordType.Minor,
    typeSuffix: 'm',
    intervals: [Interval.P1, Interval.m3, Interval.P5]
  },
  {
    type: ChordType.Major7,
    typeSuffix: 'Maj7',
    intervals: [Interval.P1, Interval.M3, Interval.P5, Interval.M7]
  },
  {
    type: ChordType.Minor7,
    typeSuffix: 'm7',
    intervals: [Interval.P1, Interval.m3, Interval.P5, Interval.m7]
  },
  {
    type: ChordType.Dominant7,
    typeSuffix: '7',
    intervals: [Interval.P1, Interval.M3, Interval.P5, Interval.m7]
  }
]
