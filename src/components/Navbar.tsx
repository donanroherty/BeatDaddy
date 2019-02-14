import React from 'react'
import styled, { withTheme } from 'styled-components'

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  return (
    <Wrapper>
      <Brand>BeatDaddy</Brand>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  max-width: 900px;
`

const Brand = styled.div`
  /* color: ${props => props.theme.primary}; */
  color: ${props => props.theme.dark};
  font-size: 20px;
  font-weight: 900;
`

export default withTheme(Navbar)
