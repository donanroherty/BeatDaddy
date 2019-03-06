import React from 'react'
import styled, { withTheme } from 'styled-components'
import Button from '../ui/Button'
import AudioMenu from './AudioMenu'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'

interface AudioMenuButtonProps {
  toggleAudioMenu: () => void
  closeAudioMenu: () => void
  metronomeVolume: number
  setMetronomeVolume: (value: number) => void
  droneVolume: number
  setDroneVolume: (value: number) => void
  audioMenuVisible: boolean
  theme: ThemeInterface
}

const AudioMenuButton = (props: AudioMenuButtonProps) => {
  return (
    <Wrapper>
      <Button width="40px" height="40px" onClick={props.toggleAudioMenu}>
        <Icon icon="volume" fillColor={props.theme.primary} size={32} />
      </Button>
      <StyledAudioMenu
        metronomeVolume={props.metronomeVolume}
        setMetronomeVolume={props.setMetronomeVolume}
        droneVolume={props.droneVolume}
        setDroneVolume={props.setDroneVolume}
        show={props.audioMenuVisible}
        handleOutsideClick={props.closeAudioMenu}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 40px;
  height: 40px;
`

const StyledAudioMenu = styled(AudioMenu)`
  top: -105px;
  left: -5px;
`

export default withTheme(AudioMenuButton)
