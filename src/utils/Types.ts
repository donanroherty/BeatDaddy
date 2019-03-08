export enum Accent {
  normal,
  medium,
  heavy,
  silent
}

export enum BeatLengthOptions {
  one,
  two,
  four,
  eight,
  sixteen,
  thirtytwo
}

export enum SubDivisionOptions {
  none,
  eighth,
  sixteenth,
  triplet
}

export enum Key {
  C = 'C',
  CSharp = 'C_SHARP',
  D = 'D',
  DSharp = 'D_SHARP',
  E = 'E',
  F = 'F',
  FSharp = 'F_SHARP',
  G = 'G',
  GSharp = 'G_SHARP',
  A = 'A',
  ASharp = 'A_SHARP',
  B = 'B'
}

export const getKeySafeName = (key: Key) => {
  switch (key) {
    case Key.C:
      return 'C'
    case Key.CSharp:
      return 'C#'
    case Key.D:
      return 'D'
    case Key.DSharp:
      return 'D#'
    case Key.E:
      return 'E'
    case Key.F:
      return 'F'
    case Key.FSharp:
      return 'F#'
    case Key.G:
      return 'G'
    case Key.GSharp:
      return 'G#'
    case Key.A:
      return 'A'
    case Key.ASharp:
      return 'A#'
    case Key.B:
      return 'B'
    default:
      return 'Error'
  }
}

export enum ChordType {
  Major = 'MAJOR',
  Minor = 'MINOR',
  Major7 = 'MAJOR7',
  Minor7 = 'MINOR7',
  Dominant7 = 'DOMINANT7'
}

export const getChordTypeSafeName = (chord: ChordType) => {
  switch (chord) {
    case ChordType.Major:
      return 'M'
    case ChordType.Minor:
      return 'm'
    case ChordType.Major7:
      return 'maj7'
    case ChordType.Minor7:
      return 'm7'
    case ChordType.Dominant7:
      return '7'
    default:
      return 'Error'
  }
}

// export enum Interval {
//   PERFECT_UNISON = 'P1',
//   MINOR_SECOND = 'm2',
//   MAJOR_SECOND = 'M2',
//   MINOR_THIRD = 'm3',
//   MAJOR_THIRD = 'M3',
//   PERFECT_FOURTH = 'P4',
//   DIMINISHED_FIFTH = 'D5',
//   PERFECT_FIFTH = 'P5',
//   MINOR_SIXTH = 'm6',
//   MAJOR_SIXTH = 'M6',
//   MINOR_SEVENTH = 'm7',
//   MAJOR_SEVENTH = 'M7',
//   PERFECT_OCTAVE = 'P8',
//   MINOR_NINTH = 'm9',
//   MAJOR_NINTH = 'M9',
//   MINOR_TENTH = 'm10',
//   MAJOR_TENTH = 'M10',
//   PERFECT_ELEVENTH = 'P11',
//   AUGMENTED_ELEVENTH = 'A11',
//   PERFECT_TWELVTH = 'P12',
//   MINOR_THIRTEENTH = 'm13',
//   MAJOR_THIRTEENTH = 'M13',
//   MINOR_FOURTEENTH = 'm14'
// }

export enum Interval {
  P1,
  m2,
  M2,
  m3,
  M3,
  P4,
  D5,
  P5,
  m6,
  M6,
  m7,
  M7,
  P8,
  m9,
  M9,
  m10,
  M10,
  P11,
  A11,
  P12,
  m13,
  M13,
  m14
}

const getIntervalAsNumber = (interval: Interval) => {}
