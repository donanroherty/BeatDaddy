/**
 * TimeSignature.tsx
 * Responsible for displaying time signature and opening TimeSignatureMenu
 */
import React, { ReactNode } from 'react'
import styled from '../theme/themed-styled-components'
import Icon from '../ui/Icon'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import TimeSignatureMenu from './TimeSignatureMenu'

export interface TimeSignatureProps {
  beatCount: number
  beatLength: number
  menuVisible: boolean
  openTimeSigMenu: () => void
  closeTimeSigMenu: () => void
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  theme: ThemeInterface
}

const TimeSignature = (props: TimeSignatureProps) => {
  const handleClick = () => {
    if (!props.menuVisible) {
      props.openTimeSigMenu()
    } else {
      props.closeTimeSigMenu()
    }
  }

  return (
    <Wrapper {...props}>
      <StyledTimeSignatureMenu
        show={props.menuVisible}
        handleOutsideClick={props.closeTimeSigMenu}
        beatCount={props.beatCount}
        beatLength={props.beatLength}
        setBeatCount={props.setBeatCount}
        setBeatLength={props.setBeatLength}
      />

      <Inner onClick={handleClick}>
        <Chevron icon="chevron" fillColor={props.theme.primary} size={8} />

        <Column>
          <Text {...props}>{props.beatCount}</Text>

          <Line {...props} />

          <Text {...props}>{props.beatLength}</Text>
        </Column>
      </Inner>
    </Wrapper>
  )
}

const Chevron = styled(Icon)`
  filter: drop-shadow(${props => props.theme.dropShadow});
`

const Wrapper = styled.div`
  user-select: none;
  padding-top: 12px;
  &:hover ${Chevron} {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active ${Chevron} {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`
const StyledTimeSignatureMenu = styled(TimeSignatureMenu)`
  left: 0px;
  top: 40px;
`
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50px;

  padding-right: 5px;
`
const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Text = styled.div<TimeSignatureProps>`
  color: ${props => props.theme.dark};
  font-size: 31px;
  font-weight: bold;
`
const Line = styled.div<TimeSignatureProps>`
  width: 70%;
  height: 2px;
  background-color: ${props => props.theme.light};
`

export default withTheme(TimeSignature)
