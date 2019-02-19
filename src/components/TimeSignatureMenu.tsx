/**
 * TimeSignatureMenu.tsx
 * Allows user to set time signature
 */
import React from 'react'
import styled from '../theme/themed-styled-components'
import MenuPanel from '../ui/MenuPanel'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import RadioCheckbox from '../ui/RadioCheckbox'
import { MenuPanelProps } from '../ui/MenuPanel'

export interface TimeSignatureMenuProps extends MenuPanelProps {
  beatCount: number
  beatLength: number
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  theme: ThemeInterface
}

interface PresetType {
  name: string
  numerator: number
  denominator: number
}

const Presets: Array<PresetType> = [
  {
    name: 'TwoTwo',
    numerator: 2,
    denominator: 2
  },
  {
    name: 'TwoFour',
    numerator: 2,
    denominator: 4
  },
  {
    name: 'ThreeFour',
    numerator: 3,
    denominator: 4
  },
  {
    name: 'FourFour',
    numerator: 4,
    denominator: 4
  },
  {
    name: 'SixEight',
    numerator: 6,
    denominator: 8
  },
  {
    name: 'TwelveEight',
    numerator: 12,
    denominator: 8
  }
]

const TimeSignatureMenu = (props: TimeSignatureMenuProps) => {
  const optionIsSelected = (id: string) => {
    const count = props.beatCount
    const length = props.beatLength

    const matchedPreset = Presets.filter(
      val => val.numerator === count && val.denominator === length
    )[0]

    return matchedPreset && matchedPreset.name === id
  }

  const handleClick = (id: string) => {
    const preset = Presets.filter(val => val.name === id)[0]
    if (preset) {
      props.setBeatCount(preset.numerator)
      props.setBeatLength(preset.denominator)
    }
  }

  const timeSigPresetElements = Presets.map((preset, i) => (
    <OptionWrapper key={preset.name} onClick={e => handleClick(preset.name)}>
      <TimeSigLabel>
        <div>{preset.numerator}</div>
        <Line />
        <div>{preset.denominator}</div>
      </TimeSigLabel>

      <RadioCheckbox
        isChecked={optionIsSelected(preset.name)}
        id={preset.name}
        onClick={handleClick}
      />
    </OptionWrapper>
  ))

  return (
    <MenuPanel {...props}>
      <Content>
        <TopSpan>{timeSigPresetElements}</TopSpan>
        {/* <HR /> */}
      </Content>
    </MenuPanel>
  )
}

const Content = styled.div`
  max-width: 300px;
  width: calc(100vw - 40px); // 40px allows for viewport padding
`

const TopSpan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
const HR = styled.div`
  background-color: ${props => props.theme.light};
  height: 1px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`
const OptionWrapper = styled.div`
  /* width: 22px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TimeSigLabel = styled.div`
  width: 22px;
  /* background-color: red; */
  font-size: 19px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
`
const Line = styled.div`
  width: 17px;
  height: 2px;
  background-color: ${props => props.theme.dark};
`

export default withTheme(TimeSignatureMenu)
