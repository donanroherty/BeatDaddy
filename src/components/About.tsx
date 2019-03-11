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
          genres of music.
        </p>
        <p>
          As a bass player myself, I built BeatDaddy to consolidate the various apps, videos and
          sound files I use in my regular practice. I hope you find it useful. If you have any
          suggestions to make BeatDaddy a better tool for the practicing musician I'd love to hear
          from you at{' '}
          <a href="mailto:ronandohertydev@gmail.com" target="_top">
            ronandohertydev@gmail.com
          </a>
        </p>
        -Ronan
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 900px;
  background-color: white;
  border-radius: 20px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
`
const Content = styled.div`
  padding: 40px 80px 60px 80px;
  color: ${props => props.theme.dark};
  font-size: 20px;
  /* font-weight: bold; */
`
const Header = styled.div`
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
  padding-bottom: 20px;
  user-select: none;
`

export default withTheme(About)