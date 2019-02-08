/**
 * TimeSignature.tsx
 * Responsible for displaying time signature and opening TimeSignatureMenu
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled from '../theme/themed-styled-components'
import Icon from '../ui/Icon'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import TimeSignatureMenu from './TimeSignatureMenu'

export interface TimeSignatureProps {
  beatCount: number
  beatLength: number
  menuVisible: boolean
  toggleTimeSigMenu: () => void
  closeTimeSigMenu: () => void
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  theme: ThemeInterface
}

class TimeSignature extends React.Component<TimeSignatureProps, {}> {
  constructor(props: TimeSignatureProps) {
    super(props)
  }

  componentWillMount = () => {
    document.addEventListener('mousedown', this.handleClick, false)
  }
  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = (e: any) => {
    const domNode = ReactDOM.findDOMNode(this)
    if (!domNode || !domNode.contains(e.target)) {
      this.props.closeTimeSigMenu!()
    }
  }

  render() {
    return (
      <Wrapper {...this.props}>
        <Inner onClick={this.props.toggleTimeSigMenu}>
          <ChevronWrapper>
            <Icon icon="chevron" fillColor={this.props.theme.primary} size={8} />
          </ChevronWrapper>
          <Column>
            <Text {...this.props}>{this.props.beatCount}</Text>

            <Line {...this.props} />

            <Text {...this.props}>{this.props.beatLength}</Text>
          </Column>
        </Inner>
        <TimeSignatureMenu
          show={this.props.menuVisible}
          beatCount={this.props.beatCount}
          beatLength={this.props.beatLength}
          setBeatCount={this.props.setBeatCount}
          setBeatLength={this.props.setBeatLength}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  user-select: none;
  margin-right: 15px;
`
const ChevronWrapper = styled.div`
  margin-right: 5px;

  filter: drop-shadow(${props => props.theme.dropShadow});
  &:hover {
    filter: brightness(${props => props.theme.hoverBrightness});
    filter: drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Line = styled.div<TimeSignatureProps>`
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.light};
`

export default withTheme(TimeSignature)
