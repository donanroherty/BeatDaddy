/**
 * TempoWidget.tsx
 * Displays and updates tempo
 */
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import Button from '../ui/Button'

type TempoWidgetProps = {
  tempo: number
  tempoMin: number
  tempoMax: number
  setTempo: (val: number) => void
  theme: ThemeInterface
}

export interface TempoWidgetState {
  value: string
  hasValidValue: boolean
}

class TempoWidget extends React.Component<TempoWidgetProps, TempoWidgetState> {
  constructor(props: TempoWidgetProps) {
    super(props)
    this.state = {
      value: String(this.props.tempo),
      hasValidValue: true
    }
  }

  componentDidUpdate = (prevProps: TempoWidgetProps, prevState: TempoWidgetState) => {
    if (prevState.value !== this.state.value) {
      if (this.hasValidInput()) {
        // TODO: Tapping tempo causes tempo widget to change value and set state again. Optimise.
        this.props.setTempo(parseInt(this.state.value))
      }
    }

    if (prevProps.tempo !== this.props.tempo) {
      this.setState({ value: String(this.props.tempo) })
    }
  }

  handleValueChange = (val: string) => {
    var reg = new RegExp('^[0-9]+$')
    if ((val === '' || reg.test(val)) && val.length < 4) {
      this.setState({ value: val })
    }
  }

  hasValidInput = () => {
    const val = this.state.value
    const isValid = parseInt(val) >= this.props.tempoMin! && parseInt(val) <= this.props.tempoMax!
    return isValid
  }
  handleClickIncrement = () => this.handleValueChange(parseInt(this.state.value) + 1 + '')
  handleClickDecrement = () => this.handleValueChange(parseInt(this.state.value) - 1 + '')
  handleInputChange = (e: any) => this.handleValueChange(e.target.value)

  handleInputBlur = (e: any) => this.handleValueChange(String(this.props.tempo))
  handleInputFocus = (e: any) => e.target.select()

  public render() {
    return (
      <Wrapper {...this.props}>
        <ValidationText>{!this.hasValidInput() && <div>min: 20, max 240</div>} </ValidationText>
        <Row>
          {this.hasValidInput()}

          <MinusBtn onClick={this.handleClickDecrement}>-</MinusBtn>

          <BpmField
            value={this.state.value}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            type="number"
          />

          <PlusBtn onClick={this.handleClickIncrement}>+</PlusBtn>
        </Row>
        <BpmSuffix>bpm</BpmSuffix>
      </Wrapper>
    )
  }
}

const Wrapper = styled('div')`
  width: 188px;

  display: flex;
  flex-direction: column;
  font-weight: bold;
  align-items: center;

  user-select: none;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
`
const BpmField = styled.input`
  font-family: 'Roboto', arial, sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: white;
  text-align: center;
  width: 45px;
  height: 22px;
  padding: 0 6px 0 6px;
  border: 0;
  background-color: transparent;
  appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const BpmSuffix = styled.div`
  color: ${props => props.theme.dark};
  font-size: 16px;
  padding-left: 4px;
`

const Btn = styled(Button)`
  color: white;
  font-size: 20px;

  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  background-color: ${props => props.theme.primary};
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${props => props.theme.primaryVeryLight};
  }
`
const MinusBtn = styled(Btn)`
  margin-left: 6px;
  margin-right: 17px;
`
const PlusBtn = styled(Btn)`
  margin-left: 17px;
`
const ValidationText = styled.div`
  font-size: 12px;
  color: red;
  height: 14px;
`

export default withTheme(TempoWidget)
