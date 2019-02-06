/**
 * TempoWidget.tsx
 * Displays and updates tempo
 */
import React from 'react'
import styled, { withTheme } from 'styled-components'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'

type TempoWidgetProps = {
  tempo: number
  setTempo: (val: number) => void
  theme: ThemeInterface
} & Partial<DefaultProps>

export interface TempoWidgetState {
  value: number
  hasValidValue: boolean
}

type DefaultProps = Readonly<typeof defaultProps>
const defaultProps = {
  minValue: 20,
  maxValue: 240
}

class TempoWidget extends React.Component<TempoWidgetProps, TempoWidgetState> {
  constructor(props: TempoWidgetProps) {
    super(props)
    this.state = {
      value: this.props.tempo,
      hasValidValue: true
    }
  }

  static defaultProps = defaultProps

  componentDidUpdate = (prevProps: TempoWidgetProps, prevState: TempoWidgetState) => {
    if (prevState.value !== this.state.value) {
      if (this.hasValidInput()) {
        this.props.setTempo(this.state.value)
      }
    }
  }

  handleValueChange = (val: string) => {
    var reg = new RegExp('^[0-9]+$')

    if ((val === '' || reg.test(val)) && val.length < 4) {
      this.setState({ value: parseInt(val) })
    }
  }

  handleClickIncrement = () => {
    this.handleValueChange(this.state.value + 1 + '')
  }
  handleClickDecrement = () => {
    this.handleValueChange(this.state.value - 1 + '')
  }

  hasValidInput = () => {
    const val = this.state.value
    const isValid = val >= 20! && val <= 240!
    return isValid
  }

  public render() {
    return (
      <Wrapper {...this.props}>
        <Row>
          {this.hasValidInput()}

          <MinusBtn onClick={this.handleClickDecrement}>-</MinusBtn>

          <Icon icon="note" fillColor={this.props.theme.dark} size={25} />

          <Equals>=</Equals>

          <BpmField
            value={this.state.value}
            onChange={e => this.handleValueChange(e.target.value)}
          />

          <BpmSuffix>bpm</BpmSuffix>

          <PlusBtn onClick={this.handleClickIncrement}>+</PlusBtn>
        </Row>
        {!this.hasValidInput() && <ValidationText>min: 20, max 240</ValidationText>}
      </Wrapper>
    )
  }
}

const Wrapper = styled('div')`
  width: 188px;
  height: 44px;
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
  color: ${props => props.theme.primary};
  text-align: center;
  width: 45px;
  height: 22px;
  padding: 0 6px 0 6px;
  border: 0;
`

const BpmSuffix = styled.div`
  color: ${props => props.theme.dark};
  font-size: 16px;
`
const Equals = styled.div`
  color: ${props => props.theme.dark};
  font-size: 20px;
  padding-left: 6px;
`

const Btn = styled.div`
  color: ${props => props.theme.primary};
  font-size: 16px;
  width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 5px;
  position: relative;

  &:hover {
    background-color: ${props => props.theme.primaryVeryLight};
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
`

export default withTheme(TempoWidget)
