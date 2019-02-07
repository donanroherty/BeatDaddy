import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled from '../theme/themed-styled-components'
import { ThemeInterface } from '../theme/theme'
import { withTheme } from 'styled-components'

export interface MenuPanelProps {
  hasArrow?: boolean
  arrowDirection?: 'up' | 'right' | 'left' | 'down'
  arrowPosition?: number
  arrowWidth?: number
  arrowHeight?: number
  borderThickness?: number
  theme?: ThemeInterface
  children?: ReactNode
}
export interface MenuPanelState {
  show: boolean
}

class MenuPanel extends React.Component<MenuPanelProps, MenuPanelState> {
  wrapperRef: any
  constructor(props: MenuPanelProps) {
    super(props)

    this.state = {
      show: true
    }

    this.setWrapperRef = this.setWrapperRef.bind(this)
  }

  public static defaultProps: MenuPanelProps = {
    hasArrow: true,
    arrowDirection: 'up',
    arrowPosition: 2, // Used to slide arrow along an edge
    arrowWidth: 40,
    arrowHeight: 20,
    borderThickness: 2
  }

  componentWillMount = () => {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  setWrapperRef = (node: any) => {
    console.log(typeof node)
    this.wrapperRef = node
  }

  handleClick = (e: any) => {
    const domNode = ReactDOM.findDOMNode(this)

    if (!domNode || !domNode.contains(e.target)) {
      this.onClickOutside()
    }
  }

  onClickOutside = () => {
    this.setState({ show: false })
  }

  render() {
    const makeArrow = () => {
      const { arrowHeight, arrowWidth, borderThickness, theme } = this.props

      // Get arrow svg viewbox
      const viewBox = `${-borderThickness!} ${-borderThickness!} ${arrowWidth! +
        borderThickness!} ${arrowHeight! - borderThickness!}`

      // Get arrow polygon points.  Spaces in string are inportant!
      const points = `${0},${arrowHeight} ${arrowWidth! * 0.5},${0} ${arrowWidth},${arrowHeight}`

      return (
        <StyledSVG {...this.props} viewBox={viewBox}>
          <polygon
            points={points}
            style={{
              fill: theme!.panelBgColor,
              stroke: theme!.primaryLight,
              strokeWidth: borderThickness
            }}
          />
        </StyledSVG>
      )
    }

    return (
      <div>
        {this.state.show && (
          <Wrapper>
            <MainBox>
              {makeArrow()}

              {this.props.children}
            </MainBox>
          </Wrapper>
        )}
      </div>
    )
  }
}

const Wrapper = styled.div`
  z-index: 10;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.16));
  background-color: 'red';
`
const MainBox = styled.div`
  max-width: 286px;
  width: 286px;
  height: 216px;
  background-color: ${props => props.theme.panelBgColor};
  border-radius: 12px;
  border: 2px solid ${props => props.theme.primaryLight};
  position: absolute;
  top: 5px;
  left: -21px;
`

const StyledSVG = styled.svg<MenuPanelProps>`
  z-index: 1;
  width: ${props => props.arrowWidth}px;
  height: ${props => props.arrowHeight}px;
  position: relative;

  transform: rotate(
    ${props =>
      props.arrowDirection === 'up'
        ? 0
        : props.arrowDirection === 'right'
          ? 90
          : props.arrowDirection === 'down'
            ? 180
            : 270}deg
  );

  left: ${props =>
    props.arrowDirection === 'left'
      ? -(props.arrowHeight! + 5) + 'px'
      : props.arrowDirection === 'right'
        ? 'calc(100% - 4px)'
        : props.arrowPosition! + '%'};

  top: ${props =>
    props.arrowDirection === 'up'
      ? -props.arrowHeight! + 'px'
      : props.arrowDirection === 'down'
        ? '100%'
        : props.arrowPosition + '%'};
`

export default withTheme(MenuPanel)
