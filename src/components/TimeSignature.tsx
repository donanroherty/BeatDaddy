import React from 'react'
import styled from '../theme/themed-styled-components'
import Icon from '../ui/Icon'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'

export interface TimeSignatureProps {
  theme: ThemeInterface
}

const TimeSignature = (props: TimeSignatureProps) => {
  return (
    <Wrapper>
      <Inner>
        <Icon icon="chevron" fillColor={props.theme.primary} size={8} hover hasShadow />
        <Column>
          <Numerator>4</Numerator>

          <Line />

          <Denominator>4</Denominator>
        </Column>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: red; */
  width: 40px;

  margin-top: 12px;
  margin-right: 10px;
`
const Column = styled.div`
  padding-left: 5px;
`
const Text = styled.div<TimeSignatureProps>`
  color: ${props => props.theme.dark};
  font-size: 31px;
  font-weight: bold;
  text-align: center;
`
const Numerator = styled(Text)``
const Denominator = styled(Text)``
const Line = styled.div<TimeSignatureProps>`
  width: 20px;
  height: 2px;
  background-color: ${props => props.theme.light};
`

export default withTheme(TimeSignature)
