import React, { ReactNode } from 'react'
import styled from '../theme/themed-styled-components'
import { ThemeInterface } from '../theme/theme'
import { withTheme } from 'styled-components'
import ReactDOM from 'react-dom'

export interface MenuPanelProps {
  show?: boolean
  borderThickness?: number
  handleOutsideClick?: () => void
  parent?: Element
  theme?: ThemeInterface
  children?: ReactNode
}

class MenuPanel extends React.Component<MenuPanelProps, {}> {
  constructor(props: MenuPanelProps) {
    super(props)
  }

  static defaultProps: MenuPanelProps = {
    show: false,
    borderThickness: 2,
    handleOutsideClick: () => {}
  }

  componentWillMount = () => document.addEventListener('mousedown', this.handleClick, false)
  componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClick, false)

  handleClick = (e: any) => {
    const domNode = ReactDOM.findDOMNode(this)

    if (
      !domNode ||
      !domNode.parentNode ||
      (!domNode.contains(e.target) && !domNode.parentNode.contains(e.target))
    ) {
      this.props.handleOutsideClick!()
    }
  }

  render() {
    return (
      <Wrapper {...this.props}>
        <Content {...this.props}>{this.props.children}</Content>
      </Wrapper>
    )
  }
}

// Wrapper is relative to get initial position of parrent element
const Wrapper = styled.div<any>`
  display: ${props => (props.show ? 'inherit' : 'none')};

  /* Relative to get initial position of parrent element */
  position: relative;

  height: 0;

  z-index: 50;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.16));
  // background-color: red;
`

const Content = styled.div`
  /* Absolute to prevent pushing other content */
  position: absolute;
  background-color: ${props => props.theme.panelBgColor};
  border-radius: 12px;
  border: 2px solid ${props => props.theme.primaryLight};
  /* background-color: red; */
`

export default withTheme(MenuPanel)
