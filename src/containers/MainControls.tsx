import React from 'react'
import styled from '../theme/themed-styled-components'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import Dropdown from '../ui/Dropdown'
import { Key, getKeySafeName, getChordTypeSafeName, ChordType } from '../utils/Types'
import TempoWidget from '../components/TempoWidget'
import Button from '../ui/Button'
import PlayButton from '../components/PlayButton'
import AudioMenuButton from '../components/AudioMenuButton'

interface MainControlsProps {
  chordKey: Key
  chordType: ChordType
  setChordKey: (idx: number) => void
  setChordType: (idx: number) => void
  tempo: number
  tempoMin: number
  tempoMax: number
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

      <StyledTempoWidget
        tempo={props.tempo}
        tempoMin={props.tempoMin}
        tempoMax={props.tempoMax}
        setTempo={props.setTempo}
      />

      <ThumbControlsWrapper>
        <StyledAudioMenuButton
          toggleAudioMenu={props.toggleAudioMenu}
          closeAudioMenu={props.closeAudioMenu}
          metronomeVolume={props.metronomeVolume}
          setMetronomeVolume={props.setMetronomeVolume}
          droneVolume={props.droneVolume}
          setDroneVolume={props.setDroneVolume}
          audioMenuVisible={props.audioMenuVisible}
        />

        <PlayBtnWrapper>
          <StyledPlayButton onClick={props.togglePlayState} isPlaying={props.isPlaying} />
        </PlayBtnWrapper>

        <TapButton width="40px" height="40px" contentColor={'white'} onClick={props.tapTempo}>
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

  display: flex;
  flex-direction: column;
`

const DroneControls = styled.div`
  grid-area: drone;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto 0 auto;
  margin-bottom: 30px;
  z-index: 10;
`
const StyledTempoWidget = styled(TempoWidget)`
  grid-area: tempo;
  margin: 0 auto 20px auto;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 2;
`

const ThumbControlsWrapper = styled.div`
  grid-area: thumb-controls;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 300px;
  z-index: 2;
`

const TapButton = styled(Button)`
  width: 56px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.primaryVeryLight};
  &:hover {
    border: 1px solid ${props => props.theme.primaryVeryLight};
  }
`
const StyledAudioMenuButton = styled(AudioMenuButton)``

const StyledPlayButton = styled(PlayButton)``

const PlayBtnWrapper = styled.div`
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
