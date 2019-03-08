export interface BeatSoundPreset {
  light: string
  medium: string
  heavy: string
}

export const beatSounds = {
  woodLight: '/audio/wood/wood-light.mp3',
  woodMedium: '/audio/wood/wood-medium.mp3',
  woodHeavy: '/audio/wood/wood-heavy.mp3',
  clickLight: '/audio/click/click-light.mp3',
  clickMedium: '/audio/click/click-medium.mp3',
  clickHeavy: '/audio/click/click-heavy.mp3'
}

export const beatSoundPresets = {
  wood: {
    light: beatSounds.woodLight,
    medium: beatSounds.woodMedium,
    heavy: beatSounds.woodHeavy
  },
  click: {
    light: beatSounds.clickLight,
    medium: beatSounds.clickMedium,
    heavy: beatSounds.clickHeavy
  },
  custom: {
    light: beatSounds.clickMedium,
    medium: beatSounds.woodMedium,
    heavy: beatSounds.woodHeavy
  }
}
