/**
 * PlayButton.tsx
 * Toggle button displaying play and pause icons
 */
import React from 'react'
import styled from 'styled-components'
import Icon from '../ui/Icon'
import { theme } from '../theme/theme'

export interface PlayButtonProps {
  isPlaying: boolean
  onClick: () => void
}

const Wrapper = styled('div')<PlayButtonProps>`
  width: 100px;
  height: 100px;
`

const PlayButton = (props: PlayButtonProps) => {
  const playIcon = (
    <Icon fill={theme.primary} hasShadow={true}>
      <title>play-icon</title>
      <path d="M17.65,92.48V7L81.82,48.9h0Z" transform="translate(-5 -4.88)" />
    </Icon>
  )

  const pauseIcon = (
    <Icon fill={theme.primary} hasShadow={true}>
      <title>pause-icon</title>
      <rect x="13.5" y="2.7" width="24.3" height="84.6" />
      <rect x="52.2" y="2.7" width="24.3" height="84.6" />
    </Icon>
  )
  return <Wrapper {...props}>{props.isPlaying ? pauseIcon : playIcon}</Wrapper>
}

export default PlayButton
