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

// Redux
//////////////////////
import { connect } from 'react-redux'
import { IRootState } from '../store'
import { Dispatch } from 'redux'
import * as metronomeActions from '../store/metronome/actions'
import { MetronomeActions } from '../store/metronome/types'
import * as droneActions from '../store/drone/actions'
import { DroneActions } from '../store/drone/types'
import * as appActions from '../store/app/actions'
import { AppActions } from '../store/app/types'
//////////////////////

interface MainControlsProps extends ReduxType {
  theme: ThemeInterface
}

const MainControls = (props: MainControlsProps) => {
  const handleSetChordKey = (idx: number) => {
    const newKey = Key[Object.keys(Key)[idx] as keyof typeof Key]
    props.setChordKey(newKey)
  }

  const handleSetChordType = (idx: number) => {
    const newType = ChordType[Object.keys(ChordType)[idx] as keyof typeof ChordType]
    props.setChordType(newType)
  }

  return (
    <Wrapper>
      <DroneControls>
        <Dropdown
          selected={Object.values(Key).findIndex(val => val === props.chordKey)}
          options={Object.values(Key).map(key => getKeySafeName(key))}
          handleOptionSelection={handleSetChordKey}
          width={'70px'}
          dropdownHeight={'200px'}
        />
        <Dropdown
          selected={Object.values(ChordType).findIndex(val => val === props.chordType)}
          options={Object.values(ChordType).map(type => getChordTypeSafeName(type))}
          handleOptionSelection={handleSetChordType}
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
          setMenuVisible={props.setAudioMenuVisible}
          metronomeVolume={props.metronomeVolume}
          setMetronomeVolume={props.setMetronomeVolume}
          droneVolume={props.droneVolume}
          setDroneVolume={props.setDroneVolume}
          audioMenuVisible={props.audioMenuVisible}
        />

        <PlayBtnWrapper>
          <StyledPlayButton onClick={props.toggleIsPlaying} isPlaying={props.isPlaying} />
        </PlayBtnWrapper>

        <Button width="56px" height="40px" contentColor={'white'} onClick={props.tapTempo}>
          Tap
        </Button>
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

// Redux
//////////////////////
const mapDispatcherToProps = (
  dispatch: Dispatch<MetronomeActions> & Dispatch<DroneActions> & Dispatch<AppActions>
) => {
  return {
    setTempo: (value: number) => dispatch(metronomeActions.setTempo(value)),
    setBeatCount: (value: number) => dispatch(metronomeActions.setBeatCount(value)),
    setMetronomeVolume: (value: number) => dispatch(metronomeActions.setMetronomeVolume(value)),
    tapTempo: () => dispatch(metronomeActions.tapTempo()),
    setChordKey: (value: Key) => dispatch(droneActions.setChordKey(value)),
    setChordType: (value: ChordType) => dispatch(droneActions.setChordType(value)),
    setDroneVolume: (value: number) => dispatch(droneActions.setDroneVolume(value)),
    toggleIsPlaying: () => dispatch(appActions.toggleIsPlaying()),
    setAudioMenuVisible: (value: boolean) => dispatch(appActions.setAudioMenuVisible(value))
  }
}

const mapStateToProps = ({ metronome, drone, app }: IRootState) => {
  const { tempo, tempoMin, tempoMax, metronomeVolume } = metronome
  const { chordKey, chordType, droneVolume } = drone
  const { isPlaying, audioMenuVisible } = app
  return {
    tempo,
    tempoMin,
    tempoMax,
    metronomeVolume,
    chordKey,
    chordType,
    droneVolume,
    isPlaying,
    audioMenuVisible
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

//////////////////////

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(withTheme(MainControls))
