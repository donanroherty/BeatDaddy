import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'
import styled from 'styled-components'

import Metronome from '../audio-engines/Metronome'
import Drone from '../audio-engines/Drone'
import MainControls from './MainControls'
import StaffSection from './StaffSection'
import Navbar from '../components/Navbar'

import { Key, ChordType, Accent, SubDivisionOptions } from '../data/Types'
import { clamp } from '../utils/utils'

export interface AppProps {}
export interface AppState {
  // Number of beats per minute
  tempo: number
  tempoMin: number
  tempoMax: number
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
  beatAccents: Accent[]
}

class App extends Component<AppProps, AppState> {
  audioCtx!: AudioContext
  masterGain!: GainNode
  private lastTapTime: number = 0

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

    this.masterGain = this.audioCtx.createGain()
    this.masterGain.connect(this.audioCtx.destination)
    this.masterGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime)

    this.state = {
      tempo: 90,
      tempoMin: 20,
      tempoMax: 240,
      beatCount: 4,
      beatLength: 4,
      subdivisions: SubDivisionOptions.sixteenth,
      chordKey: Key.C,
      chordType: ChordType.Major,
      a4: 440,
      metronomeVolume: 75,
      droneVolume: 75,
      isPlaying: false,
      audioLoaded: false,
      timeSigMenuVisible: false,
      audioMenuVisible: false,
      beatAccents: new Array(4).fill(undefined).map(() => Accent.normal)
    }
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (prevState.beatCount !== this.state.beatCount) {
      const newBeatAccents = new Array(this.state.beatCount)
        .fill(undefined)
        .map(() => Accent.normal)

      this.setState({ beatAccents: newBeatAccents })
    }
  }

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
    this.setState({ metronomeVolume: clamp(value, 0.0, 100.0) })
  }
  setDroneVolume = (value: number) => {
    this.setState({ droneVolume: clamp(value, 0.0, 100.0) })
  }

  tapTempo = () => {
    const now = new Date().getTime()
    const diff = now - this.lastTapTime
    const bpm = Math.floor(60 / (diff / 1000.0))

    this.lastTapTime = now

    if (bpm > this.state.tempoMin) {
      this.setTempo(clamp(bpm, this.state.tempoMin, this.state.tempoMax))
    }
  }

  cycleBeatAccent = (beatIdx: number) => {
    const newAccents = this.state.beatAccents.map((val, i) => {
      if (i === beatIdx) {
        const max = Object.keys(Accent).length / 2
        const current = this.state.beatAccents[beatIdx]
        const newAccent = current + 1 < max ? current + 1 : 0

        return newAccent
      } else return val
    })

    this.setState({ beatAccents: newAccents })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <Metronome
            audioCtx={this.audioCtx}
            masterGain={this.masterGain}
            tempo={this.state.tempo}
            beatCount={this.state.beatCount}
            beatLength={this.state.beatLength}
            beatAccents={this.state.beatAccents}
            isPlaying={this.state.isPlaying}
            volume={this.state.metronomeVolume}
            setAudioLoaded={this.setAudioLoaded}
          />
          <Drone
            chordKey={this.state.chordKey}
            chordType={this.state.chordType}
            chordOctave={4}
            isPlaying={this.state.isPlaying}
            volume={this.state.droneVolume}
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
                  beatAccents={this.state.beatAccents}
                  cycleBeatAccent={this.cycleBeatAccent}
                />
              </TopRow>

              <BottomRow>
                <MainControls
                  chordKey={this.state.chordKey}
                  chordType={this.state.chordType}
                  setChordKey={this.setChordKey}
                  setChordType={this.setChordType}
                  tempo={this.state.tempo}
                  tempoMin={this.state.tempoMin}
                  tempoMax={this.state.tempoMax}
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
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
`
const TopRow = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`
const BottomRow = styled.div`
  margin-bottom: 110px;
  width: 100%;
`

export default App
