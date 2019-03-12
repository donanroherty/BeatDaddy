import React from 'react'
import styled, { withTheme } from 'styled-components'

interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <Wrapper>
      <Container>
        <Text href="https://www.ronandoherty.com">© Ronan Doherty 2018</Text>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  top: calc(100% - 50px);
  bottom: 0;
  margin-top: 100px;
  /* background-color: ${props => props.theme.dark}; */
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
const Text = styled.a`
  padding-right: 20px;
  color: ${props => props.theme.primary};
  text-decoration: none;
  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: underline;
  }
`

export default withTheme(Footer)
