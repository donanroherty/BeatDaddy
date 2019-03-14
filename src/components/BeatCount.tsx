/**
 * TimeSignature.tsx
 * Responsible for displaying time signature and opening TimeSignatureMenu
 */
import React from 'react'
import styled from '../theme/themed-styled-components'
import Icon from '../ui/Icon'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'

import Dropdown from '../ui/Dropdown'

export interface BeatCountProps {
  beatCount: number
  beatLength: number
  menuVisible: boolean
  openTimeSigMenu: () => void
  closeTimeSigMenu: () => void
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  theme: ThemeInterface
}

const BeatCount = (props: BeatCountProps) => {
  const handleClick = () => {
    if (!props.menuVisible) {
      props.openTimeSigMenu()
    } else {
      props.closeTimeSigMenu()
    }
  }

  const beatCountOptions = new Array(32).fill(0).map((val, i) => String(i + 1))

  const handleBeatCountChange = (idx: number) => {
    props.setBeatCount(idx + 1)
  }

  return (
    <Wrapper {...props}>
      <Inner onClick={handleClick}>
        <Dropdown
          selected={props.beatCount - 1}
          options={beatCountOptions}
          handleOptionSelection={handleBeatCountChange}
          width={'70px'}
          dropdownHeight={'200px'}
          transparentLabel={true}
          chevronOnLeft={true}
          labelSize={40}
        />
      </Inner>
    </Wrapper>
  )
}

const Chevron = styled(Icon)`
  filter: drop-shadow(${props => props.theme.dropShadow});
  padding-right: 5px;
`

const Wrapper = styled.div`
  user-select: none;
  padding-top: 8px;
  padding-right: 5px;
  &:hover ${Chevron} {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active ${Chevron} {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50px;

  padding-top: 16px;
`

const Text = styled.div<BeatCountProps>`
  color: ${props => props.theme.dark};
  font-size: 40px;
  font-weight: bold;
`

export default withTheme(BeatCount)
