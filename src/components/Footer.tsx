import React from 'react'
import styled, { withTheme } from 'styled-components'

interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <Wrapper>
      <Container>
        <Text>© Ronan Doherty 2018</Text>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  top: calc(100% - 50px);
  margin-top: 100px;
  background-color: ${props => props.theme.dark};
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 900px;
  margin: 0 auto 0 auto;
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`
const Text = styled.div``

export default withTheme(Footer)
