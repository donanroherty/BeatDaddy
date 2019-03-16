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
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  theme: ThemeInterface
}

const BeatCount = (props: BeatCountProps) => {
  const beatCountOptions = new Array(32).fill(0).map((val, i) => String(i + 1))

  const handleBeatCountChange = (idx: number) => {
    props.setBeatCount(idx + 1)
  }

  return (
    <Wrapper {...props}>
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
    </Wrapper>
  )
}

const Chevron = styled(Icon)`
  filter: drop-shadow(${props => props.theme.dropShadow});
  padding-right: 5px;
`

const Wrapper = styled.div`
  user-select: none;
  padding-right: 5px;
  padding-top: 24px;
  width: 50px;
  &:hover ${Chevron} {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active ${Chevron} {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`

export default withTheme(BeatCount)
