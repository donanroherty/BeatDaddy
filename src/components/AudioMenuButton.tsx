import React from 'react'
import styled, { withTheme } from 'styled-components'
import Button from '../ui/Button'
import AudioMenu from './AudioMenu'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'

interface AudioMenuButtonProps {
  setMenuVisible: (val: boolean) => void
  audioMenuVisible: boolean
  metronomeVolume: number
  setMetronomeVolume: (value: number) => void
  droneVolume: number
  setDroneVolume: (value: number) => void

  theme: ThemeInterface
}

const AudioMenuButton = (props: AudioMenuButtonProps) => {
  const handleClick = () => props.setMenuVisible(!props.audioMenuVisible)
  const handleOutsideClick = () => props.setMenuVisible(false)

  return (
    <Wrapper>
      <Button width="56px" height="40px" onClick={handleClick}>
        <StyledIcon icon="volume" fillColor={'white'} size={32} />
      </Button>
      <StyledAudioMenu
        metronomeVolume={props.metronomeVolume}
        setMetronomeVolume={props.setMetronomeVolume}
        droneVolume={props.droneVolume}
        setDroneVolume={props.setDroneVolume}
        show={props.audioMenuVisible}
        handleOutsideClick={handleOutsideClick}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledIcon = styled(Icon)`
  position: relative;
  top: 3px;
`
const StyledAudioMenu = styled(AudioMenu)`
  top: -105px;
  left: -5px;
`

export default withTheme(AudioMenuButton)
