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

const PlayButton = (props: PlayButtonProps) => {
  const color = props.theme.primary
  const playIcon = <Icon icon="play" fillColor={color} size={50} />
  const pauseIcon = <Icon icon="pause" fillColor={color} size={50} />

  return (
    <Wrapper onClick={props.onClick} {...props}>
      <IconWrapper isPlaying={props.isPlaying}>
        {props.isPlaying ? pauseIcon : playIcon}
      </IconWrapper>
    </Wrapper>
  )
}

const IconWrapper = styled.div<any>`
  filter: drop-shadow(${props => props.theme.dropShadow});
  ${props => !props.isPlaying && 'margin-left: 10px;'};
`
const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  &:hover ${IconWrapper} {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active ${IconWrapper} {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`

export default withTheme(PlayButton)
