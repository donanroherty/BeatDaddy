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
  const shadowX = 0
  const shadowY = 3
  const shadowOpacity = 0.16
  const shadowSpread = 2

  const makeShadowFilter = (x: number, y: number, opacity: number, spread: number) => (
    <filter id="dropshadow" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation={spread} />
      <feOffset dx={x} dy={y} result="offsetblur" />
      <feComponentTransfer>
        <feFuncA type="linear" slope={opacity} />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  )

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
      filter={props.hasShadow ? 'url(#dropshadow)' : ''}
    >
      <defs>{makeShadowFilter(shadowX, shadowY, shadowOpacity, shadowSpread)}</defs>

      {iconDef}
    </SVGWrapper>
  )
}

const SVGWrapper = styled('svg')<IconProps>`
  fill: ${props => props.fillColor};

  &:hover {
    fill: ${props => (props.hover ? lighten(0.1, props.fillColor!) : props.fillColor)};
  }
`

export default Icon
