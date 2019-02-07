/**
 * Icon.tsx
 * Helper class for creating svg icons with props for colour and shadow
 * Icons are defined either by paths in iconPaths or by providing svg child elements
 */

import React from 'react'
import styled from '../theme/themed-styled-components'
import iconDefinitions, { getIconDimensions } from './iconDefinitions'
import { lighten } from 'polished'

export interface IconProps {
  fillColor: string
  size: number
  icon: keyof typeof iconDefinitions
  hover?: boolean
  hasShadow?: boolean
}

const Icon = (props: IconProps) => {
  const SVGWrapper = styled('svg')<IconProps>`
    ${props => props.hasShadow && `filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.16));`}

    fill: ${props => props.fillColor};

    ${props =>
      props.hover &&
      `&:hover {
      fill: ${lighten(0.1, props.fillColor!)};
      ${props.hasShadow && `filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.16));`}
    }`}
  `

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

export default Icon
