import React from 'react'

interface IconDefinitionsType {
  wholeNote: IconType
  halfNote: IconType
  quarterNote: IconType
  eighthNote: IconType
  sixteenthNote: IconType
  play: IconType
  pause: IconType
  chevron: IconType
  volume: IconType
  metronome: IconType
  keyboard: IconType
  accentLight: IconType
  accentHeavy: IconType
  chord: IconType
  grabDots: IconType
}

interface ViewBoxDimensions {
  x1: number
  y1: number
  x2: number
  y2: number
}
interface IconType {
  viewBox: ViewBoxDimensions
  paths: JSX.Element[]
}

const iconDefinitions: IconDefinitionsType = {
  wholeNote: {
    viewBox: { x1: 0, y1: 0, x2: 43.97, y2: 43.97 },
    paths: [
      <path
        className="color1"
        d="M28.89,60.77c-1.46-3.76-5.57-5.86-10.46-5.86a20,20,0,0,0-7.67,1.61C2.94,59.8-1.64,67,.55,72.65,2,76.4,6.12,78.5,11,78.5a20,20,0,0,0,7.67-1.61C26.5,73.61,31.08,66.39,28.89,60.77ZM16.75,72.28A15,15,0,0,1,11,73.5c-2.89,0-5.17-1-5.8-2.66-1-2.67,1.94-7.39,7.48-9.71a15,15,0,0,1,5.74-1.22c2.89,0,5.17,1.05,5.8,2.68C25.27,65.24,22.29,70,16.75,72.28Z"
      />
    ]
  },
  halfNote: {
    viewBox: { x1: 0, y1: 0, x2: 43.97, y2: 78.5 },
    paths: [
      <path
        className="color1"
        d="M27.22,0a2.5,2.5,0,0,0-2.5,2.5V56.19a13.87,13.87,0,0,0-6-1.28A20,20,0,0,0,11,56.52C3.19,59.8-1.39,67,.8,72.65,2.26,76.4,6.37,78.5,11.26,78.5a20,20,0,0,0,7.67-1.61c6.62-2.78,10.92-8.38,10.75-13.44a2.22,2.22,0,0,0,0-.45V2.5A2.49,2.49,0,0,0,27.22,0ZM17,72.28a15,15,0,0,1-5.74,1.22c-2.89,0-5.17-1-5.8-2.66-1-2.67,1.94-7.39,7.48-9.71a15,15,0,0,1,5.74-1.22,7.36,7.36,0,0,1,5.09,1.62,2.83,2.83,0,0,1,.71,1.06C25.52,65.24,22.54,70,17,72.28Z"
      />
    ]
  },
  quarterNote: {
    viewBox: { x1: 0, y1: 0, x2: 43.97, y2: 78.5 },
    paths: [
      <path
        className="color1"
        d="M29.72,2.5V63a2.22,2.22,0,0,1,0,.45c.17,5.06-4.13,10.66-10.75,13.44C11.1,80.17,3,78.27.8,72.65S3.19,59.8,11,56.52c5-2.09,10.1-2.08,13.71-.33V2.5a2.5,2.5,0,0,1,5,0Z"
      />
    ]
  },
  eighthNote: {
    viewBox: { x1: 0, y1: 0, x2: 43.97, y2: 78.5 },
    paths: [
      <path
        className="color1"
        d="M44,29a2.5,2.5,0,0,1-5,0c0-1.9-.42-4.39-3.5-8.5a53.08,53.08,0,0,0-3.71-4.28c-.69-.73-1.38-1.47-2-2.24V63a2.22,2.22,0,0,1,0,.45c.17,5.06-4.13,10.66-10.75,13.44C11.1,80.17,3,78.27.8,72.65S3.19,59.8,11,56.52c5-2.09,10.1-2.08,13.71-.33V2.5a2.5,2.5,0,0,1,5,0v.31c.47,4.43,2.79,6.89,5.69,10a54.88,54.88,0,0,1,4.06,4.69C42.58,21.65,44,25.2,44,29Z"
      />
    ]
  },
  sixteenthNote: {
    viewBox: { x1: 0, y1: 0, x2: 43.97, y2: 78.5 },
    paths: [
      <path
        className="color1"
        d="M41.22,31.5a2.5,2.5,0,0,0,2.5-2.5c0-3.8-1.39-7.35-4.5-11.5a54.88,54.88,0,0,0-4.06-4.69c-2.9-3.11-5.22-5.57-5.69-10V2.5a2.5,2.5,0,0,0-5,0V56.19c-3.61-1.75-8.72-1.76-13.71.33C2.94,59.8-1.64,67,.55,72.65s10.3,7.52,18.13,4.24c6.62-2.78,10.92-8.38,10.75-13.44a2.22,2.22,0,0,0,0-.45V26c.66.77,1.35,1.51,2,2.24a53.08,53.08,0,0,1,3.71,4.28c3.08,4.11,3.5,6.6,3.5,8.5a2.5,2.5,0,0,0,5,0,17.15,17.15,0,0,0-3.17-9.59A2.46,2.46,0,0,0,41.22,31.5Zm-6.06-6.69c-2.9-3.11-5.22-5.57-5.69-10V14c.66.77,1.35,1.51,2,2.24a53.08,53.08,0,0,1,3.71,4.28c3,4,3.47,6.46,3.5,8.34C37.52,27.33,36.33,26.06,35.16,24.81Z"
      />
    ]
  },
  play: {
    viewBox: { x1: 0, y1: 0, x2: 63, y2: 84.78 },
    paths: [<path className="color1" d="M63,42.39,0,84.78V0" />]
  },
  pause: {
    viewBox: { x1: 0, y1: 0, x2: 63, y2: 84.6 },
    paths: [<path className="color1" d="M63,0V84.6H38.7V0ZM0,84.6H24.3V0H0Z" />]
  },
  chevron: {
    viewBox: { x1: 0, y1: 0, x2: 74.37, y2: 46.17 },
    paths: [
      <path
        className="color1"
        d="M34.42,45,1.15,11.75a3.9,3.9,0,0,1,0-5.53L6.22,1.15a3.91,3.91,0,0,1,5.53,0L34.42,23.81a3.91,3.91,0,0,0,5.53,0L62.62,1.15a3.89,3.89,0,0,1,5.52,0l5.08,5.07a3.9,3.9,0,0,1,0,5.53L40,45A3.92,3.92,0,0,1,34.42,45Z"
      />
    ]
  },
  volume: {
    viewBox: { x1: 0, y1: 0, x2: 23.57, y2: 24 },
    paths: [
      <path
        className="color1"
        d="M19.27,20.56A1.28,1.28,0,0,1,18,19.27a1.3,1.3,0,0,1,.37-.91,9,9,0,0,0,0-12.72,1.3,1.3,0,0,1-.05-1.82,1.28,1.28,0,0,1,1.82,0l.05,0a11.56,11.56,0,0,1,0,16.36,1.3,1.3,0,0,1-.91.38ZM14.7,18.13a1.28,1.28,0,0,1-1.28-1.28,1.25,1.25,0,0,1,.38-.91,5.58,5.58,0,0,0,0-7.88,1.28,1.28,0,0,1,1.81-1.82,8.15,8.15,0,0,1,0,11.52,1.28,1.28,0,0,1-.91.38Z"
      />,
      <path
        className="color1"
        d="M11.14,24a.86.86,0,0,1-.6-.25L3.93,17.14H.86A.85.85,0,0,1,0,16.29H0V7.71a.85.85,0,0,1,.86-.85H3.93L10.54.25A.86.86,0,0,1,12,.86V23.14a.86.86,0,0,1-.85.86Z"
      />
    ]
  },
  metronome: {
    viewBox: { x1: 0, y1: 0, x2: 35.3, y2: 41.5 },
    paths: [
      <path
        id="surround"
        className="color1"
        d="M21.51,2,32.34,39.5H2.66L13.53,2h8M23,0H12L0,41.5H35L23,0Z"
      />,
      <path
        id="arm"
        className="color2"
        d="M35.3,3.4l-1.73-1L31.73,5.58a2.81,2.81,0,0,0-1.32,0,3,3,0,0,0-1.5,4.84L16.57,31.84l1.73,1L30.64,11.48a3.29,3.29,0,0,0,.54,0,3,3,0,0,0,2.6-1.5,3,3,0,0,0,.4-1.51,3,3,0,0,0-.72-1.94ZM32.05,9a1,1,0,0,1-1.73-1,1,1,0,0,1,.61-.47,1.09,1.09,0,0,1,.26,0A1,1,0,0,1,32.05,9Z"
      />,
      <path id="lower" className="color1" d="M3.75,31.87H31.39L35,41.5H0Z" />
    ]
  },
  keyboard: {
    viewBox: { x1: 0, y1: 0, x2: 36.2, y2: 28.09 },
    paths: [
      <path
        className="color3"
        d="M11.64,3.5V24.58a2.49,2.49,0,0,1-2.5,2.5H3.5A2.49,2.49,0,0,1,1,24.58V3.5A2.5,2.5,0,0,1,3.5,1H9.14A2.5,2.5,0,0,1,11.64,3.5Z"
      />,
      <path
        className="color3"
        d="M34.83,3.5V24.58a2.49,2.49,0,0,1-2.5,2.5H26.69a2.49,2.49,0,0,1-2.5-2.5V3.5A2.5,2.5,0,0,1,26.69,1h5.64A2.5,2.5,0,0,1,34.83,3.5Z"
      />,
      <path
        className="color3"
        d="M23.24,3.5V24.58a2.49,2.49,0,0,1-2.5,2.5H15.09a2.49,2.49,0,0,1-2.5-2.5V3.5A2.5,2.5,0,0,1,15.09,1h5.65A2.5,2.5,0,0,1,23.24,3.5Z"
      />,
      <path
        className="color1"
        d="M9.14,28.09H3.5A3.5,3.5,0,0,1,0,24.59V3.5A3.51,3.51,0,0,1,3.5,0H9.14a3.51,3.51,0,0,1,3.5,3.5V24.59A3.5,3.5,0,0,1,9.14,28.09ZM3.5,2A1.5,1.5,0,0,0,2,3.5V24.59a1.5,1.5,0,0,0,1.5,1.5H9.14a1.5,1.5,0,0,0,1.5-1.5V3.5A1.5,1.5,0,0,0,9.14,2Z"
      />,
      <path
        className="color1"
        d="M32.33,28.09H26.69a3.5,3.5,0,0,1-3.5-3.5V3.5A3.51,3.51,0,0,1,26.69,0h5.64a3.51,3.51,0,0,1,3.5,3.5V24.59A3.5,3.5,0,0,1,32.33,28.09ZM26.69,2a1.5,1.5,0,0,0-1.5,1.5V24.59a1.5,1.5,0,0,0,1.5,1.5h5.64a1.5,1.5,0,0,0,1.5-1.5V3.5A1.5,1.5,0,0,0,32.33,2Z"
      />,
      <path
        className="color1"
        d="M20.74,28.09H15.09a3.5,3.5,0,0,1-3.5-3.5V3.5A3.51,3.51,0,0,1,15.09,0h5.65a3.51,3.51,0,0,1,3.5,3.5V24.59A3.5,3.5,0,0,1,20.74,28.09ZM15.09,2a1.51,1.51,0,0,0-1.5,1.5V24.59a1.5,1.5,0,0,0,1.5,1.5h5.65a1.5,1.5,0,0,0,1.5-1.5V3.5A1.51,1.51,0,0,0,20.74,2Z"
      />,
      <path
        className="color2"
        d="M27.36,2v8.81a2,2,0,0,1-2,2H22.2a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2h3.16A2,2,0,0,1,27.36,2Z"
      />,
      <path
        className="color2"
        d="M15.76,2v8.81a2,2,0,0,1-2,2H10.6a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2h3.16A2,2,0,0,1,15.76,2Z"
      />
    ]
  },
  accentLight: {
    viewBox: { x1: 0, y1: 0, x2: 34, y2: 27 },
    paths: [
      <path
        className="color1"
        d="M2.5,27a2.5,2.5,0,0,1-.89-4.84L24.45,13.5,1.61,4.84A2.5,2.5,0,1,1,3.39.16l29,11a2.51,2.51,0,0,1,0,4.68l-29,11A2.5,2.5,0,0,1,2.5,27Z"
      />
    ]
  },
  accentHeavy: {
    viewBox: { x1: 0, y1: 0, x2: 37.5, y2: 37 },
    paths: [
      <path
        className="color1"
        d="M2.5,37a2.54,2.54,0,0,1-1.13-.27,2.51,2.51,0,0,1-1.1-3.36l16.25-32a2.5,2.5,0,0,1,4.46,0l16.25,32A2.5,2.5,0,0,1,35,37H31.45a2.49,2.49,0,0,1-2.23-1.37L17,11.52,4.73,35.63A2.5,2.5,0,0,1,2.5,37Z"
      />
    ]
  },
  chord: {
    viewBox: { x1: 0, y1: 0, x2: 135.71, y2: 152.5 },
    paths: [
      <path
        id="fretboard"
        d="M5.71,22V152.5h122V22Zm23,127.48h-20V129.15h20Zm0-24.37h-20V104.77h20Zm0-24.38h-20V80.4h20Zm0-24.37h-20V56h20ZM28.28,51.5H9.14v-20H28.28Zm24.43,98h-20V129.15h20Zm0-24.37h-20V104.77h20Zm0-24.38h-20V80.4h20Zm.47-24.86-20,1-1-20.31,20-1Zm-.91-24.36H33.15v-20H52.27Zm24.44,98h-20V129.15h20Zm0-24.37h-20V104.77h20Zm0-24.38h-20V80.4h20Zm0-24.37h-20V56h20Zm0-24.4h-20V31.05h20Zm24,97.52h-20V129.15h20Zm0-24.37h-20V104.77h20Zm0-24.38h-20V80.4h20Zm0-24.37h-20V56h20Zm0-24.4h-20V31.05h20Zm24,97.52h-20V129.15h20Zm0-24.37h-20V104.77h20Zm0-24.38h-20V80.4h20Zm0-24.37h-20V56h20Zm0-24.4h-20V31.05h20Z"
      />,
      <path
        id="e"
        className="color1"
        d="M126.71,3a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-3a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z"
      />,
      <path id="B" className="color2" d="M111.71,42a9,9,0,1,1-9-9A9,9,0,0,1,111.71,42Z" />,
      <path
        id="G"
        className="color1"
        d="M78.71,3a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-3a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z"
      />,
      <path id="D" className="color2" d="M63.71,66a9,9,0,1,1-9-9A9,9,0,0,1,63.71,66Z" />,
      <path id="A" className="color2" d="M39.71,91a9,9,0,1,1-9-9A9,9,0,0,1,39.71,91Z" />,
      <path
        id="E-2"
        className="color1"
        d="M8.38,10.25l5.54,5.54L12.5,17.21,7,11.67,1.42,17.21,0,15.79l5.54-5.54L0,4.71,1.42,3.29,7,8.83,12.5,3.29l1.42,1.42Z"
      />
    ]
  },
  grabDots: {
    viewBox: { x1: 0, y1: 0, x2: 86.54, y2: 143.48 },
    paths: [
      <path d="M29.61,128.68a14.81,14.81,0,1,1-14.81-14.8A14.81,14.81,0,0,1,29.61,128.68ZM71.74,29.61a14.81,14.81,0,1,0-14.81-14.8A14.8,14.8,0,0,0,71.74,29.61Zm0,84.27a14.8,14.8,0,1,0,14.8,14.8A14.8,14.8,0,0,0,71.74,113.88ZM14.8,56.94a14.81,14.81,0,1,0,14.81,14.8A14.8,14.8,0,0,0,14.8,56.94Zm0-27.33A14.81,14.81,0,1,0,0,14.81,14.81,14.81,0,0,0,14.8,29.61ZM71.74,56.94a14.81,14.81,0,1,0,14.8,14.8A14.81,14.81,0,0,0,71.74,56.94Z" />
    ]
  }
}

// Get viewbox dimensions from icon definition and target size
export const getIconDimensions = (icon: keyof typeof iconDefinitions, targetSize: number) => {
  // Get viewbox dimensions from icon definition
  const iconDef = iconDefinitions[icon]
  const viewBox = iconDef.viewBox
  const vbWidth = viewBox.x2 - viewBox.x1
  const vbHeight = viewBox.y2 - viewBox.y1

  const height = targetSize // Target height of the icon
  const percent = height / vbHeight
  const width = vbWidth * percent // Scale width proportunial to changes in height

  return { height, width }
}

export default iconDefinitions
