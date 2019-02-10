/**
 * Icon.tsx
 * Helper class for creating svg icons with props for colour and shadow
 * Icons are defined either by paths in iconPaths or by providing svg child elements
 */

import React from 'react'
import styled from '../theme/themed-styled-components'
import iconDefinitions, { getIconDimensions } from './iconDefinitions'

export interface IconProps {
  fillColor: string
  size: number
  icon: keyof typeof iconDefinitions
}

const Icon = (props: IconProps) => {
  // Get viewbox dimensions from icon definition
  const iconDef = iconDefinitions[props.icon]
  const viewBox = iconDef.props.viewBox.split(' ')
  const vbWidth = viewBox[2]
  const vbHeight = viewBox[3]

  const dimensions = getIconDimensions(props.icon, props.size)

  return (
    <SVGWrapper
      {...props}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      height={dimensions.height}
      width={dimensions.width}
      
    >
      {iconDef}
    </SVGWrapper>
  )
}

const SVGWrapper = styled('svg')<IconProps>`
  fill: ${props => props.fillColor};
`

export default Icon
