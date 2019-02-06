/**
 * PlayButton.tsx
 * Toggle button displaying play and pause icons
 */
import React from 'react'
import styled, { withTheme } from 'styled-components'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'

export interface PlayButtonProps {
  isPlaying: boolean
  onClick: () => void
  theme: ThemeInterface
}

const Wrapper = styled.div`
  max-width: 100px;
  height: 100px;
  text-align: center;
`

const PlayButton = (props: PlayButtonProps) => {
  const color = props.theme.primary
  const playIcon = <Icon icon="play" fillColor={color} hover hasShadow size={100} />
  const pauseIcon = <Icon icon="pause" fillColor={color} hover hasShadow size={100} />

  return <Wrapper {...props}>{props.isPlaying ? pauseIcon : playIcon}</Wrapper>
}

export default withTheme(PlayButton)
