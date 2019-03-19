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

import ReactGA from 'react-ga'
ReactGA.initialize('UA-121200245-2')
ReactGA.pageview(window.location.pathname + window.location.search)

export interface AppProps {}
export interface AppState {}

class App extends Component<AppProps, AppState> {
  audioCtx!: AudioContext
  masterGain!: GainNode

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
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyle />
          <Metronome audioCtx={this.audioCtx} masterGain={this.masterGain} />
          <Drone />

          <PageContent>
            <PaperBG />
            <NavbarWrapper>
              <Navbar />
            </NavbarWrapper>

            <AppControlsWrapper>
              <TopRow>
                <StaffWrapper>
                  <StaffSection />
                </StaffWrapper>
              </TopRow>

              <BottomSection>
                <GradientBackground />

                <BottomSectionContent>
                  <MainControls />

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
  padding-top: 70px;
`
const AboutWrapper = styled.div`
  max-width: 900px;
  padding: 0 20px 0 20px;
  margin: 100px auto 0 auto;
`

export default App
