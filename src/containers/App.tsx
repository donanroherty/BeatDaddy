import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'
import styled from 'styled-components'

import Metronome from './Metronome'
import BeatStaff from '../components/BeatStaff'
import PlayButton from '../components/PlayButton'
import TempoWidget from '../components/TempoWidget'
import TimeSignature from '../components/TimeSignature'
import MenuPanel from '../ui/MenuPanel'

enum BeatLengthOptions {
  one = 1,
  two = 2,
  four = 4,
  eight = 8,
  sixteen = 16,
  thirtytwo = 32
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
  // Number of bars to be generate.  Should be set very high to simulate a looping metronome.
  barCount: number
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
      tempo: 120,
      beatCount: 4,
      beatLength: BeatLengthOptions.four,
      subdivisions: SubDivisionOptions.sixteenth,
      barCount: 1000,
      isPlaying: false,
      audioLoaded: false,
      timeSigMenuVisible: false
    }
  }

  setAudioLoaded = (val: boolean) => {
    this.setState({ audioLoaded: val })
    if (this.state.audioLoaded) {
      console.log('audio loaded')
    }
  }

  togglePlayState = () => {
    if (this.state.audioLoaded) {
      this.setState({ isPlaying: !this.state.isPlaying })
    }
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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <Metronome
            audioCtx={this.audioCtx}
            tempo={this.state.tempo}
            beatCount={this.state.beatCount}
            barCount={this.state.barCount}
            isPlaying={this.state.isPlaying}
            setAudioLoaded={this.setAudioLoaded}
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

              <BeatStaff beatCount={this.state.beatCount} subdivisions={this.state.subdivisions} />
            </Staff>
          </TopRow>

          <TempoWidget tempo={this.state.tempo} setTempo={this.setTempo} />
          <PlayButton onClick={this.togglePlayState} isPlaying={this.state.isPlaying} />
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

export default App
