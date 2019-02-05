import React, { Component, ChangeEvent } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'

import Metronome from './Metronome'
import PlayButton from '../components/PlayButton'
import TempoWidget from '../components/TempoWidget'

export interface AppProps {}
export interface AppState {
  // Number of beats per minute
  tempo: number
  // Number of beats in a bar
  beatCount: number
  // Number of bars to be generate.  Should be set very high to simulate a looping metronome.
  barCount: number
  // True if app is playing
  isPlaying: boolean
  // True if required media samples are fetched and decoded
  audioLoaded: boolean
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
      barCount: 2,
      isPlaying: false,
      audioLoaded: false
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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyle />
          <Metronome
            audioCtx={this.audioCtx}
            tempo={this.state.tempo}
            beatCount={this.state.beatCount}
            barCount={this.state.barCount}
            isPlaying={this.state.isPlaying}
            setAudioLoaded={this.setAudioLoaded}
          />

          <TempoWidget tempo={this.state.tempo} setTempo={this.setTempo} />
          <PlayButton onClick={this.togglePlayState} isPlaying={this.state.isPlaying} />
        </div>
      </ThemeProvider>
    )
  }
}

export default App
