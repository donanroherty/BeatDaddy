import React from 'react'
import styled from '../theme/themed-styled-components'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import Dropdown from '../ui/Dropdown'
import { Key, getKeySafeName, getChordTypeSafeName, ChordType } from '../data/Types'
import TempoWidget from '../components/TempoWidget'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import PlayButton from '../components/PlayButton'
import AudioMenu from '../components/AudioMenu'

interface MainControlsProps {
  chordKey: Key
  chordType: ChordType
  setChordKey: (idx: number) => void
  setChordType: (idx: number) => void
  tempo: number
  setTempo: (newTempo: number) => void
  isPlaying: boolean
  togglePlayState: () => void
  toggleAudioMenu: () => void
  closeAudioMenu: () => void
  metronomeVolume: number
  setMetronomeVolume: (value: number) => void
  droneVolume: number
  setDroneVolume: (value: number) => void
  audioMenuVisible: boolean
  tapTempo: () => void
  theme: ThemeInterface
}

const MainControls = (props: MainControlsProps) => {
  return (
    <Wrapper>
      <DroneControls>
        <Dropdown
          selected={Object.values(Key).findIndex(val => val === props.chordKey)}
          options={Object.values(Key).map(key => getKeySafeName(key))}
          handleOptionSelection={props.setChordKey}
          width={'70px'}
          dropdownHeight={'200px'}
        />
        <Dropdown
          selected={Object.values(ChordType).findIndex(val => val === props.chordType)}
          options={Object.values(ChordType).map(type => getChordTypeSafeName(type))}
          handleOptionSelection={props.setChordType}
          width={'70px'}
        />
      </DroneControls>

      <StyledTempoWidget tempo={props.tempo} setTempo={props.setTempo} />

      <ThumbControlsWrapper>
        <AudioButtonWrapper>
          <AudioButtonInner>
            <AudioMenuButton width="40px" height="40px" onClick={props.toggleAudioMenu}>
              <Icon icon="volume" fillColor={props.theme.primary} size={32} />
            </AudioMenuButton>
            <StyledAudioMenu
              metronomeVolume={props.metronomeVolume}
              setMetronomeVolume={props.setMetronomeVolume}
              droneVolume={props.droneVolume}
              setDroneVolume={props.setDroneVolume}
              show={props.audioMenuVisible}
              handleOutsideClick={props.closeAudioMenu}
            />
          </AudioButtonInner>
        </AudioButtonWrapper>

        <PlayBtnWrapper>
          <StyledPlayButton onClick={props.togglePlayState} isPlaying={props.isPlaying} />
        </PlayBtnWrapper>

        <TapButton
          width="40px"
          height="40px"
          contentColor={props.theme.primary}
          onClick={props.tapTempo}
        >
          Tap
        </TapButton>
      </ThumbControlsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;

  grid-template-areas:
    'drone'
    'tempo'
    'thumb-controls';
`

const DroneControls = styled.div`
  grid-area: drone;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto 0 auto;
  margin-bottom: 30px;
`
const StyledTempoWidget = styled(TempoWidget)`
  grid-area: tempo;
  margin: 0 auto 20px auto;
  padding-top: 10px;
  padding-bottom: 10px;
`

const ThumbControlsWrapper = styled.div`
  grid-area: thumb-controls;

  display: grid;
  grid-template-columns: 45px auto 45px;
  grid-template-rows: auto;
  margin-left: auto;
  margin-right: auto;
`

const StyledButton = styled(Button)`
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
`
const AudioButtonWrapper = styled.div`
  display: flex;
`
const AudioButtonInner = styled.div`
  margin: auto auto 0 auto;
  display: flex;
  width: 40px;
  height: 40px;
`
const AudioMenuButton = styled(StyledButton)``
const StyledAudioMenu = styled(AudioMenu)`
  height: 150px;
  position: relative;
  top: -80px;
  left: -50px;
  margin-left: 20px;
`
const TapButton = styled(StyledButton)``

const StyledPlayButton = styled(PlayButton)``

const PlayBtnWrapper = styled.div`
  /* background-color: lightseagreen; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 170px;
  height: 170px;
`

export default withTheme(MainControls)
