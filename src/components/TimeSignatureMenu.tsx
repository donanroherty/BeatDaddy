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

export interface TimeSignatureMenuProps {
  show?: boolean
  theme: ThemeInterface
}
export interface TimeSignatureMenuState {
  selectedOption: string
}

class TimeSignatureMenu extends React.Component<TimeSignatureMenuProps, TimeSignatureMenuState> {
  constructor(props: TimeSignatureMenuProps) {
    super(props)

    this.state = {
      selectedOption: '3'
    }
  }

  handleRadioClick = (id: string) => {
    this.setState({ selectedOption: id })
  }

  render() {
    return (
      <MenuPanel {...this.props}>
        <Content>
          <TopSpan>
            <TimeSigOption
              numerator={2}
              denominator={2}
              isChecked={this.state.selectedOption === '0'}
              id="0"
              onClick={this.handleRadioClick}
            />
            <TimeSigOption
              numerator={2}
              denominator={4}
              isChecked={this.state.selectedOption === '1'}
              id="1"
              onClick={this.handleRadioClick}
            />
            <TimeSigOption
              numerator={3}
              denominator={4}
              isChecked={this.state.selectedOption === '2'}
              id="2"
              onClick={this.handleRadioClick}
            />
            <TimeSigOption
              numerator={4}
              denominator={4}
              isChecked={this.state.selectedOption === '3'}
              id="3"
              onClick={this.handleRadioClick}
            />
            <TimeSigOption
              numerator={6}
              denominator={8}
              isChecked={this.state.selectedOption === '4'}
              id="4"
              onClick={this.handleRadioClick}
            />
            <TimeSigOption
              numerator={12}
              denominator={8}
              isChecked={this.state.selectedOption === '5'}
              id="5"
              onClick={this.handleRadioClick}
            />
          </TopSpan>
          {/* <HR /> */}
        </Content>
      </MenuPanel>
    )
  }
}

interface TimeSigOptionProps {
  numerator: number
  denominator: number
  isChecked: boolean
  id: string
  onClick: (id: string) => void
}

const TimeSigOption = (props: TimeSigOptionProps) => {
  const handleClick = (id: string) => {
    props.onClick(props.id)
  }
  return (
    <OptionWrapper onClick={e => handleClick(props.id)}>
      <TimeSigLabel>
        <div>{props.numerator}</div>
        <Line />
        <div>{props.numerator}</div>
      </TimeSigLabel>
      <RadioCheckbox isChecked={props.isChecked} id={props.id} onClick={handleClick} />
    </OptionWrapper>
  )
}

const Content = styled.div``
const TopSpan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 17px 20px 0px 20px;
`
const HR = styled.div`
  background-color: ${props => props.theme.light};
  height: 1px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`
const OptionWrapper = styled.div`
  width: 22px;
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
  margin-bottom: 17px;
`
const Line = styled.div`
  width: 17px;
  height: 2px;
  background-color: ${props => props.theme.dark};
`

export default withTheme(TimeSignatureMenu)
