/**
 * Icon.tsx
 * Helper class for creating svg icons with props for colour and shadow
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'

export interface IconProps {
  fill?: string
  hasShadow?: boolean
  children: ReactNode
  size?: string
}

const SVGWrapper = styled('svg')<IconProps>`
  height: ${props => props.size || '100%'};
  fill: ${props => props.fill};
`

const Icon = (props: IconProps) => {
  const shadowX = 0
  const shadowY = 3
  const shadowOpacity = 0.16
  const shadowSpread = 2

  return (
    <SVGWrapper {...props} viewBox="-5 -5 100 100">
      <defs>
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={shadowSpread} />
          <feOffset dx={shadowX} dy={shadowY} result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={shadowOpacity} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <svg filter={props.hasShadow ? 'url(#dropshadow)' : ''}>{props.children}</svg>
    </SVGWrapper>
  )
}

export default Icon
