import React from 'react'
import ReactDOM from 'react-dom'
import styled, { withTheme } from 'styled-components'
import Icon from './Icon'
import { ThemeInterface } from '../theme/theme'

interface DropdownProps {
  width?: string
  dropdownHeight?: string
  options: Array<string>
  selected: number
  handleOptionSelection?: (idx: number) => void
  borderRadius?: string
  theme?: ThemeInterface
}

interface DropdownState {
  isOpen: boolean
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props)

    this.state = {
      isOpen: false
    }
  }
  static defaultProps: DropdownProps = {
    width: '200px',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    selected: 0,
    borderRadius: '10px'
  }

  componentWillMount = () => document.addEventListener('mousedown', this.handleClick, false)
  componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClick, false)
  // Close menu on outside click
  handleClick = (e: any) => {
    const domNode = ReactDOM.findDOMNode(this)
    if (!domNode || !domNode.contains(e.target)) {
      this.closeMenu()
    }
  }

  toggleMenuOpen = (e: any) => this.setState({ isOpen: !this.state.isOpen })
  closeMenu = () => this.setState({ isOpen: false })

  handleOptionClick = (idx: number) => {
    this.props.handleOptionSelection!(idx)
    this.closeMenu()
  }

  render() {
    const optionComps = this.props.options!.map((val, i) => {
      return (
        <Option {...this.props} onClick={() => this.handleOptionClick(i)} key={val + i}>
          {val}
        </Option>
      )
    })

    return (
      <Wrapper {...this.props} isOpen={this.state.isOpen}>
        <TopSection {...this.props} isOpen={this.state.isOpen} onClick={this.toggleMenuOpen}>
          <Selection>
            <div>{this.props.options![this.props.selected]}</div>
          </Selection>
          <ChevronWrapper>
            <Icon icon="chevron" fillColor={this.props.theme!.primary} size={6} />
          </ChevronWrapper>
        </TopSection>
        <OptionPanelWrapper {...this.props} isOpen={this.state.isOpen}>
          <OptionPanel {...this.props} isOpen={this.state.isOpen}>
            {optionComps}
          </OptionPanel>
        </OptionPanelWrapper>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div<any>`
  width: ${props => props.width};
  height: ${props => (props.isOpen ? 'auto' : '40px')};
  background-color: white;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
  border: 1px solid ${props => props.theme.primaryLight};
  border-radius: ${props => props.borderRadius};
  overflow: hidden;
`
const ChevronWrapper = styled.div`
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(${props => props.theme.dropShadow});
`
const TopSection = styled.div<any>`
  height: 40px;
  display: flex;
  flex-direction: row;

  border-radius: ${props =>
    `${props.borderRadius} ${props.borderRadius} ${props.isOpen ? '0' : props.borderRadius} ${
      props.isOpen ? '0' : props.borderRadius
    }`};

  &:hover {
    background-color: ${props => props.theme.primaryVeryLight};
  }
  &:hover ${ChevronWrapper} {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active ${ChevronWrapper} {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`
const Selection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  font-size: 16px;
`

const optionItemHeight = 40
const OptionPanelWrapper = styled.div<any>`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  border: 1px solid ${props => props.theme.primaryLight};
  border-radius: ${props => props.borderRadius};
  display: ${props => (props.isOpen ? 'inherit' : 'none')};
  background-color: white;
`
const OptionPanel = styled.div<any>`
  overflow-y: auto;
  height: ${props =>
    props.dropdownHeight ? props.dropdownHeight : optionItemHeight * props.options.length + 'px'};
  width: ${props => props.width};
`
const Option = styled.div`
  height: ${optionItemHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  font-size: 16px;
  &:hover {
    background-color: ${props => props.theme.primaryVeryLight};
  }
`

export default withTheme(Dropdown)
