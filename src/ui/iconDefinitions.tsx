import React from 'react'

const iconDefinitions = {
  note: (
    <svg viewBox="0 0 29.44 76">
      <path d="M29.44,0V61.23c0,.1,0,.2,0,.3-.16,4.91-4.38,10.19-10.75,12.86C10.85,77.67,2.74,75.77.55,70.15S2.94,57.3,10.76,54c4.94-2.07,10-2.08,13.59-.39V0Z" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 63 84.78">
      <path d="M63,42.39,0,84.78V0" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 63 84.6">
      <path d="M63,0V84.6H38.7V0ZM0,84.6H24.3V0H0Z" />
    </svg>
  )
}

// Get viewbox dimensions from icon definition and target size
export const getIconDimensions = (icon: keyof typeof iconDefinitions, targetSize: number) => {
  // Get viewbox dimensions from icon definition
  const iconDef = iconDefinitions[icon]
  const viewBox = iconDef.props.viewBox.split(' ')
  const vbWidth = viewBox[2]
  const vbHeight = viewBox[3]

  const height = targetSize // Target height of the icon
  const percent = height / parseFloat(vbHeight)
  const width = vbWidth * percent // Scale width proportunial to changes in height

  return { height, width }
}

export default iconDefinitions
