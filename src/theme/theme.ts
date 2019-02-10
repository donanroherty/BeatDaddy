export interface ThemeInterface {
  primary: string
  primaryLight: string
  primaryVeryLight: string
  dark: string
  light: string
  panelBgColor: string
  dropShadow: string
  hoverDropShadow: string
  hoverBrightness: number
}

export const theme: ThemeInterface = {
  primary: '#2699FB',
  primaryLight: '#BCE0FD',
  primaryVeryLight: '#D0E3F2',
  dark: '#545454',
  light: '#CECBCB',
  panelBgColor: 'white',
  dropShadow: '0px 3px 1px rgba(0, 0, 0, 0.16)',
  hoverDropShadow: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.16))',
  hoverBrightness: 1.2
}
