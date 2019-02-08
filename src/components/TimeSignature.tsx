import React from 'react'
import ReactDOM from 'react-dom'
import styled from '../theme/themed-styled-components'
import Icon from '../ui/Icon'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import TimeSignatureMenu from './TimeSignatureMenu'

export interface TimeSignatureProps {
  menuVisible?: boolean
  toggleTimeSigMenu?: () => void
  closeTimeSigMenu?: () => void
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
      <Wrapper>
        <Inner onClick={this.props.toggleTimeSigMenu}>
          <Icon icon="chevron" fillColor={this.props.theme.primary} size={8} hover hasShadow />
          <Column>
            <Numerator>4</Numerator>

            <Line />

            <Denominator>4</Denominator>
          </Column>
        </Inner>
        <TimeSignatureMenu show={this.props.menuVisible} />
      </Wrapper>
    )
  }
}

// const TimeSignature = (props: TimeSignatureProps) => {
//   return (
//     <Wrapper>
//       <Inner onClick={props.toggleTimeSigMenu}>
//         <Icon icon="chevron" fillColor={props.theme.primary} size={8} hover hasShadow />
//         <Column>
//           <Numerator>4</Numerator>

//           <Line />

//           <Denominator>4</Denominator>
//         </Column>
//       </Inner>
//       {props.menuVisible && <MenuPanel closeMenu={props.closeTimeSigMenu} />}
//     </Wrapper>
//   )
// }

const Wrapper = styled.div`
  user-select: none;
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
const Numerator = styled(Text)``
const Denominator = styled(Text)``
const Line = styled.div<TimeSignatureProps>`
  width: 20px;
  height: 2px;
  background-color: ${props => props.theme.light};
`

export default withTheme(TimeSignature)
