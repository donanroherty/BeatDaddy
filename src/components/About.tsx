import React from 'react'
import styled, { withTheme } from 'styled-components'
import breakpoints from '../utils/breakpoints'

interface AboutProps {}

const About = (props: AboutProps) => {
  return (
    <Wrapper>
      <Content>
        <Header>?</Header>
        <p>
          Beatdaddy is a music practice tool combining a metronome and chord drone, allowing
          musicians to practice in time and in harmonic context.
        </p>

        <p>
          I hope you find it useful, I have a lot more features planned. If you have any suggestions
          to improve BeatDaddy I'd love to hear from you at&nbsp;
          <a href="mailto:ronandohertydev@gmail.com" target="_top">
            ronandohertydev@gmail.com
          </a>
        </p>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
`
const Content = styled.div`
  padding: 40px 80px 60px 80px;
  color: ${props => props.theme.dark};
  font-size: 18px;

  @media (max-width: ${breakpoints.tablet}px) {
    padding: 40px 40px 60px 40px;
  }
  @media (max-width: ${breakpoints.phone}px) {
    padding: 40px 20px 60px 20px;
  }
`
const Header = styled.div`
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
  padding-bottom: 20px;
  user-select: none;
`

export default withTheme(About)
