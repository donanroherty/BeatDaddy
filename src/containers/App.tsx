import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'
import styled from 'styled-components'

import Metronome from '../audio-engines/Metronome'
import Drone from '../audio-engines/Drone'
import BeatStaff from '../components/BeatStaff'
import PlayButton from '../components/PlayButton'
import TempoWidget from '../components/TempoWidget'
import TimeSignature from '../components/TimeSignature'
import Dropdown from '../ui/Dropdown'

import { Key, getKeySafeName, ChordType, getChordTypeSafeName } from '../data/Types'

export enum BeatLengthOptions {
  one,
  two,
  four,
  eight,
  sixteen,
  thirtytwo
}
export enum SubDivisionOptions {
  none,
  eighth,
  sixteenth,
  triplet
}

export interface AppProps {}
export interface AppState {
  // Number of beats per minute
  tempo: number
  // Number of beats in a bar
  beatCount: number
  beatLength: number
  subdivisions: SubDivisionOptions
  chordKey: Key
  chordType: ChordType
  a4: number
  metronomeVolume: number
  droneVolume: number
  // True if app is playing
  isPlaying: boolean
  // True if required media samples are fetched and decoded
  audioLoaded: boolean
  timeSigMenuVisible: boolean
}

const GlobalStyle = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto'); */
body{
  font-family:'Roboto', arial, sans-serif;
  color: ${theme.dark}
}
`

class App extends Component<AppProps, AppState> {
  audioCtx!: AudioContext

  constructor(props: AppProps) {
    super(props)

    // Get audio context
    if (!window.AudioContext) {
      if (!(window as any).webkitAudioContext) {
        console.log('Browser incompatible with WebAudio')
        return
      }
      window.AudioContext = (window as any).webkitAudioContext
    }
    this.audioCtx = new AudioContext()

    this.state = {
      tempo: 90,
      beatCount: 4,
      beatLength: 4,
      subdivisions: SubDivisionOptions.sixteenth,
      chordKey: Key.C,
      chordType: ChordType.Major,
      a4: 440,
      metronomeVolume: 1.0,
      droneVolume: 0.05,
      isPlaying: false,
      audioLoaded: false,
      timeSigMenuVisible: false
    }
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {}

  setAudioLoaded = (val: boolean) => {
    this.setState({ audioLoaded: val })
  }

  togglePlayState = () => {
    this.audioCtx.resume()
    // if (this.state.audioLoaded) {
    this.setState({ isPlaying: !this.state.isPlaying })
    // }
    // TODO: Stop automatically after all bars are played
  }

  setTempo = (val: number) => {
    this.setState({ tempo: val })
  }

  toggleTimeSigMenu = () => {
    this.state.timeSigMenuVisible ? this.closeTimeSigMenu() : this.openTimeSigMenu()
  }
  openTimeSigMenu = () => {
    this.setState({ timeSigMenuVisible: true })
  }
  closeTimeSigMenu = () => {
    this.setState({ timeSigMenuVisible: false })
  }

  setBeatCount = (count: number) => {
    this.setState({ beatCount: count })
  }
  setBeatLength = (length: number) => {
    this.setState({ beatLength: length })
  }

  setChordKey = (idx: number) => {
    const newKey = Key[Object.keys(Key)[idx] as keyof typeof Key]
    this.setState({ chordKey: newKey })
  }

  setChordType = (idx: number) => {
    const newType = ChordType[Object.keys(ChordType)[idx] as keyof typeof ChordType]
    this.setState({ chordType: newType })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <Metronome
            audioCtx={this.audioCtx}
            tempo={this.state.tempo}
            beatCount={this.state.beatCount}
            beatLength={this.state.beatLength}
            isPlaying={this.state.isPlaying}
            volume={this.state.metronomeVolume}
            setAudioLoaded={this.setAudioLoaded}
          />
          <Drone
            audioCtx={this.audioCtx}
            chordKey={this.state.chordKey}
            chordType={this.state.chordType}
            isPlaying={this.state.isPlaying}
            volume={this.state.droneVolume}
            a4={this.state.a4}
          />
          <TopRow>
            <Staff>
              <TimeSignature
                beatCount={this.state.beatCount}
                beatLength={this.state.beatLength}
                menuVisible={this.state.timeSigMenuVisible}
                toggleTimeSigMenu={this.toggleTimeSigMenu}
                closeTimeSigMenu={this.closeTimeSigMenu}
                setBeatCount={this.setBeatCount}
                setBeatLength={this.setBeatLength}
              />

              <BeatStaff
                beatCount={this.state.beatCount}
                beatLength={this.state.beatLength}
                subdivisions={this.state.subdivisions}
              />
            </Staff>
          </TopRow>

          <TempoWidget tempo={this.state.tempo} setTempo={this.setTempo} />
          <PlayButton onClick={this.togglePlayState} isPlaying={this.state.isPlaying} />

          <DroneControls>
            <Dropdown
              selected={Object.values(Key).findIndex(val => val === this.state.chordKey)}
              options={Object.values(Key).map(key => getKeySafeName(key))}
              handleOptionSelection={this.setChordKey}
              width={'70px'}
              dropdownHeight={'200px'}
            />
            <Dropdown
              selected={Object.values(ChordType).findIndex(val => val === this.state.chordType)}
              options={Object.values(ChordType).map(type => getChordTypeSafeName(type))}
              handleOptionSelection={this.setChordType}
              width={'70px'}
            />
          </DroneControls>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TopRow = styled.div`
  width: 100%;
  height: 100px;
`
const Staff = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const DroneControls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

export default App
