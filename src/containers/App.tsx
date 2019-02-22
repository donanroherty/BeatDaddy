import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'
import styled from 'styled-components'

import Metronome from '../audio-engines/Metronome'
import Drone from '../audio-engines/Drone'
import MainControls from './MainControls'
import StaffSection from './StaffSection'
import Navbar from '../components/Navbar'

import { Key, ChordType } from '../data/Types'

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
  audioMenuVisible: boolean
}

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
      droneVolume: 0.25,
      isPlaying: false,
      audioLoaded: false,
      timeSigMenuVisible: false,
      audioMenuVisible: true
    }
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {}

  setAudioLoaded = (val: boolean) => {
    this.setState({ audioLoaded: val })
  }

  togglePlayState = () => {
    this.audioCtx.resume()
    if (this.state.audioLoaded) {
      this.setState({ isPlaying: !this.state.isPlaying })
    }
    // TODO: Stop automatically after all bars are played
  }

  setTempo = (val: number) => {
    this.setState({ tempo: val })
  }

  openTimeSigMenu = () => {
    this.setState({ timeSigMenuVisible: true })
  }
  closeTimeSigMenu = () => {
    this.setState({ timeSigMenuVisible: false })
  }

  toggleAudioMenu = () => {
    this.state.audioMenuVisible ? this.closeAudioMenu() : this.openAudioMenu()
  }
  openAudioMenu = () => {
    this.setState({ audioMenuVisible: true })
  }
  closeAudioMenu = () => {
    this.setState({ audioMenuVisible: false })
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

  setMetronomeVolume = (value: number) => {
    this.setState({ metronomeVolume: value })
  }
  setDroneVolume = (value: number) => {
    const val = value < 0.3 ? value : 0.3
    this.setState({ droneVolume: val })
  }

  tapTempo = () => {}

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

          <Inner>
            <Navbar />

            <AppControlsWrapper>
              <TopRow>
                <StaffSection
                  beatCount={this.state.beatCount}
                  beatLength={this.state.beatLength}
                  timeSigMenuVisible={this.state.timeSigMenuVisible}
                  openTimeSigMenu={this.openTimeSigMenu}
                  closeTimeSigMenu={this.closeTimeSigMenu}
                  setBeatCount={this.setBeatCount}
                  setBeatLength={this.setBeatLength}
                  subdivisions={this.state.subdivisions}
                />
              </TopRow>
              <BottomRow>
                <MainControls
                  chordKey={this.state.chordKey}
                  chordType={this.state.chordType}
                  setChordKey={this.setChordKey}
                  setChordType={this.setChordType}
                  tempo={this.state.tempo}
                  setTempo={this.setTempo}
                  isPlaying={this.state.isPlaying}
                  togglePlayState={this.togglePlayState}
                  toggleAudioMenu={this.toggleAudioMenu}
                  closeAudioMenu={this.closeAudioMenu}
                  tapTempo={this.tapTempo}
                  metronomeVolume={this.state.metronomeVolume}
                  setMetronomeVolume={this.setMetronomeVolume}
                  droneVolume={this.state.droneVolume}
                  setDroneVolume={this.setDroneVolume}
                  audioMenuVisible={this.state.audioMenuVisible}
                />
              </BottomRow>
            </AppControlsWrapper>
          </Inner>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

const GlobalStyle = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto'); */
body{
  font-family:'Roboto', arial, sans-serif;
  color: ${theme.dark};
  margin: 0px;
  height: 100%;
}
:root {
  height: 100%;
}
#root{
  height: 100%;
}
`

const Wrapper = styled.div`
  /* background-color: lightskyblue; */
  max-width: 900px;
  height: 100%;
  padding: 0px 20px 0px 20px;
  margin-left: auto;
  margin-right: auto;
`
const Inner = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  flex-direction: column;
`
const AppControlsWrapper = styled.div`
  /* background-color: lightslategrey; */
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
`
const TopRow = styled.div`
  /* background-color: lightcoral; */
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`
const BottomRow = styled.div`
  /* background-color: lightgreen; */
  /* margin-top: auto; */
  margin-bottom: 110px;
  width: 100%;
`

export default App
