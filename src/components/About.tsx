import React from 'react'
import styled, { withTheme } from 'styled-components'

interface AboutProps {}

const About = (props: AboutProps) => {
  return (
    <Wrapper>
      <Content>
        <Header>?</Header>
        <p>
          BeatDaddy is a practice tool for musicians working on scales, arpeggios and tight
          time-keeping. The metronome is a staple of music practice helping you lock in with your
          favourite time signatures. The chord drone gives you a harmonic context to the notes you
          are playing. Accenting beats helps you to target specific beats or simulate different
          genres of music.{' '}
        </p>
        <p>
          As a bass player myself, I built BeatDaddy to consolidate the various apps, videos and
          sound files I use in my regular practice. I also wanted a consistent experience across PCs
          and mobile devices which is why BeatDaddy is a ProgressiveWebApp allowing you to access it
          on the web, as a Windows 10 store app or as a homescreen app on your phone. I hope you
          find it useful. If you have any suggestions to make BeatDaddy a better tool for the
          practicing musician I'd love to hear from you.
        </p>{' '}
        -R
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
`
const Content = styled.div`
  padding: 40px;
  color: ${props => props.theme.dark};
`
const Header = styled.div`
  font-size: 40px;
  font-weight: bolder;

  text-align: center;
`

export default withTheme(About)
