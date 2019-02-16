/**
 * Icon.tsx
 * Helper class for creating svg icons with props for colour and shadow
 * Icons are defined either by paths in iconPaths or by providing svg child elements
 */

import React from 'react'
import styled from '../theme/themed-styled-components'
import iconDefinitions, { getIconDimensions } from './iconDefinitions'
import shortId from 'shortid'

export interface IconProps {
  fillColor?: string
  fillColor2?: string
  fillColor3?: string
  size?: number
  icon?: keyof typeof iconDefinitions
}

const defaultProps: IconProps = {
  fillColor: 'pink',
  fillColor2: 'lightgreen',
  fillColor3: 'lightblue',
  size: 50,
  icon: 'pause'
}

const Icon = (props: IconProps) => {
  // Get viewbox dimensions from icon definition
  const iconDef = iconDefinitions[props.icon!]
  const viewBox = iconDef.viewBox
  const vbWidth = viewBox.x2 - viewBox.x1
  const vbHeight = viewBox.y2 - viewBox.y1

  const dimensions = getIconDimensions(props.icon!, props.size!)

  const paths = iconDef.paths.map((val, i) => {
    console.log(val)

    const color = val.props.className
      ? val.props.className === 'color1'
        ? props.fillColor
        : val.props.className === 'color2'
          ? props.fillColor2
          : val.props.className === 'color3'
            ? props.fillColor3
            : 'red'
      : props.fillColor

    return (
      <SVGInner key={props.icon! + ' icon ' + shortId.generate()} fillColor={color}>
        {val}
      </SVGInner>
    )
  })

  return (
    <SVGWrapper
      {...props}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      height={dimensions.height}
      width={dimensions.width}
    >
      {paths}
    </SVGWrapper>
  )
}

const SVGWrapper = styled.svg<IconProps>`
  fill: ${props => props.fillColor};
`
const SVGInner = styled.svg<any>`
  fill: ${props => props.fillColor};
`

Icon.defaultProps = defaultProps
export default Icon
