import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'
import styled from 'styled-components'

import Metronome from './Metronome'
import Drone from './Drone'
import BeatStaff from '../components/BeatStaff'
import PlayButton from '../components/PlayButton'
import TempoWidget from '../components/TempoWidget'
import TimeSignature from '../components/TimeSignature'
import Dropdown from '../ui/Dropdown'

import { Key, getKeySafeName } from '../data/Types'

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
  chordKey: Key

  // Number of bars to be generate.  Should be set very high to simulate a looping metronome.
  barCount: number
  // True if app is playing
  isPlaying: boolean
  // True if required media samples are fetched and decoded
  audioLoaded: boolean
  timeSigMenuVisible: boolean
  metronomeIsDirty: boolean
  droneIsDirty: boolean
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
      chordKey: Key.C,
      barCount: 1000,
      isPlaying: false,
      audioLoaded: false,
      timeSigMenuVisible: false,
      metronomeIsDirty: false,
      droneIsDirty: false
    }
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (
      prevState.tempo !== this.state.tempo ||
      prevState.beatCount !== this.state.beatCount ||
      prevState.beatLength !== this.state.beatLength ||
      prevState.subdivisions !== this.state.subdivisions
    ) {
      if (this.state.isPlaying) {
        this.setMetronomeDirty()
      }
    }
    if (prevState.chordKey !== this.state.chordKey) {
      if (this.state.isPlaying) {
        this.setState({ droneIsDirty: true })
      }
    }
  }

  setMetronomeDirty = () => this.setState({ metronomeIsDirty: true })
  onMetronomeGenerated = () => this.setState({ metronomeIsDirty: false })

  setAudioLoaded = (val: boolean) => {
    this.setState({ audioLoaded: val })
    if (val) console.log('audio loaded')
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

  setChordKey = (idx: number) => {
    const newKey = Key[Object.keys(Key)[idx] as keyof typeof Key]
    this.setState({ chordKey: newKey })
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
            barCount={this.state.barCount}
            isPlaying={this.state.isPlaying}
            setAudioLoaded={this.setAudioLoaded}
            metronomeIsDirty={this.state.metronomeIsDirty}
            onMetronomeGenerated={this.onMetronomeGenerated}
          />
          <Drone
            audioCtx={this.audioCtx}
            chordKey={this.state.chordKey}
            isPlaying={this.state.isPlaying}
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

          <Dropdown
            selected={Object.values(Key).findIndex(val => val === this.state.chordKey)}
            options={Object.values(Key).map(key => getKeySafeName(key))}
            handleOptionSelection={this.setChordKey}
            width={'70px'}
            dropdownHeight={'200px'}
          />
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
