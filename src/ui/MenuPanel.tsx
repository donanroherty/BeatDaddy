import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled from '../theme/themed-styled-components'
import { ThemeInterface } from '../theme/theme'
import { withTheme } from 'styled-components'

export interface MenuPanelProps {
  show?: boolean
  hasArrow?: boolean
  arrowDirection?: 'up' | 'right' | 'left' | 'down'
  arrowPosition?: number
  arrowWidth?: number
  arrowHeight?: number
  borderThickness?: number
  theme?: ThemeInterface
  children?: ReactNode
}

const defaultProps = {
  show: false,
  hasArrow: true,
  arrowDirection: 'up',
  arrowPosition: 2, // Used to slide arrow along an edge
  arrowWidth: 40,
  arrowHeight: 20,
  borderThickness: 2
}

const MenuPanel = (props: MenuPanelProps) => {
  const makeArrow = () => {
    const { arrowHeight, arrowWidth, borderThickness, theme } = props

    // Get arrow svg viewbox
    const viewBox = `${-borderThickness!} ${-borderThickness!} ${arrowWidth! +
      borderThickness!} ${arrowHeight! - borderThickness!}`

    // Get arrow polygon points.  Spaces in string are inportant!
    const points = `${0},${arrowHeight} ${arrowWidth! * 0.5},${0} ${arrowWidth},${arrowHeight}`

    return (
      <StyledSVG {...props} viewBox={viewBox}>
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
      {props.show && (
        <Wrapper>
          <MainBox>
            {makeArrow()}
            <Content {...props}>{props.children}</Content>
          </MainBox>
        </Wrapper>
      )}
    </div>
  )
}

const Wrapper = styled.div`
  z-index: 10;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.16));
`
const MainBox = styled.div`
  max-width: 286px;
  width: 286px;
  /* height: 216px; */
  background-color: ${props => props.theme.panelBgColor};
  border-radius: 12px;
  border: 2px solid ${props => props.theme.primaryLight};
  position: absolute;
  top: 5px;
  left: -21px;
`
const Content = styled.div<MenuPanelProps>`
  height: calc(100% + ${props => props.arrowHeight!}px);
  width: 100%;
  position: relative;
  top: ${props => -props.arrowHeight!}px;
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

MenuPanel.defaultProps = defaultProps

export default withTheme(MenuPanel)
