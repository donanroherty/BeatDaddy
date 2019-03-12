import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from '../theme/themed-styled-components'
import { theme } from '../theme/theme'
import styled from 'styled-components'

import Metronome from '../audio-engines/Metronome'
import Drone from '../audio-engines/Drone'
import MainControls from './MainControls'
import StaffSection from './StaffSection'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Footer from '../components/Footer'

import { Key, ChordType, Accent, SubDivisionOptions } from '../utils/Types'
import { clamp } from '../utils/utils'
import { BeatSoundPreset, beatSoundPresets } from '../data/MetronomeSounds'

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
  beatSoundPreset: BeatSoundPreset
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
      beatSoundPreset: beatSoundPresets.click,
      chordKey: Key.C,
      chordType: ChordType.Major,
      a4: 440,
      metronomeVolume: 100,
      droneVolume: 60,
      isPlaying: false,
      audioLoaded: false,
      timeSigMenuVisible: false,
      audioMenuVisible: false,
      beatAccents: new Array(4)
        .fill(undefined)
        .map((val, i) => (i === 0 ? Accent.heavy : Accent.normal))
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
            beatSoundPreset={this.state.beatSoundPreset}
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

          <PageContent>
            <PaperBG />
            <NavbarWrapper>
              <Navbar />
            </NavbarWrapper>

            <AppControlsWrapper>
              <TopRow>
                <StaffWrapper>
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
                </StaffWrapper>
              </TopRow>

              <BottomSection>
                <GradientBackground />

                <BottomSectionContent>
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

                  <AboutWrapper>
                    <About />
                  </AboutWrapper>

                  <Footer>© Ronan Doherty 2018</Footer>
                </BottomSectionContent>
              </BottomSection>
            </AppControlsWrapper>
          </PageContent>
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
a{
  color: ${theme.primary};
  text-decoration: none;
  &:link {text-decoration: none;}
  &:visited {text-decoration: none;}
  &:hover {text-decoration: underline;}
  &:active {text-decoration: underline;}
}
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const PageContent = styled.div`
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`
const NavbarWrapper = styled.div`
  margin: 0px auto 40px auto;
  max-width: 900px;
  width: 100%;
  z-index: 2;
`
const AppControlsWrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: 2;
`
const TopRow = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`
const StaffWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`
const BottomSection = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 30px;
  position: relative;
  z-index: 10;
`
const PaperBG = styled.div`
  height: 400px;
  width: 100%;
  position: absolute;
  z-index: 0;
  background-image: url('images/backgrounds/paper.png');
  background-size: calc(500px * 1.5) calc(593px * 1.5);
  background-position: center;
`
const GradientBackground = styled.div`
  position: absolute;
  z-index: 0;
  height: 700px;
  width: 100%;

  background-color: #012985;
  clip-path: polygon(0% 70px, 100% 0%, 100% calc(100% - 70px), 0% 100%);

  background: url('images/backgrounds/snow-contrast.png');
  background-size: calc(1000px * 0.5) calc(1000px * 0.5);
  background-position: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom right, #012985, #b4e7ff);
    opacity: 0.88;
  }
`
const BottomSectionContent = styled.div`
  /* position: relative; */
  /* z-index: 10; */
  padding-top: 70px;
`
const AboutWrapper = styled.div`
  max-width: 900px;
  padding: 0 20px 0 20px;
  margin: 100px auto 0 auto;
`
const FooterWrapper = styled.div`
  max-width: 900px;
  padding: 0 20px 0 20px;
  margin: 100px auto 0 auto;
`

export default App
