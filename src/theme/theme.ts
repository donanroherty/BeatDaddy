export interface ThemeInterface {
  primary: string
  primaryLight: string
  primaryVeryLight: string
  dark: string
  light: string
  warning: string
  error: string
  panelBgColor: string
  dropShadow: string
  hoverDropShadow: string
  hoverBrightness: number
}

export const theme: ThemeInterface = {
  primary: '#2699FB',
  primaryLight: '#BCE0FD',
  primaryVeryLight: '#F1F9FF',
  dark: '#545454',
  light: '#CECBCB',
  warning: 'orange',
  error: 'red',
  panelBgColor: 'white',
  dropShadow: '0px 3px 1px rgba(0, 0, 0, 0.16)',
  hoverDropShadow: '0px 4px 2px rgba(0, 0, 0, 0.2)',
  hoverBrightness: 1.2
}
