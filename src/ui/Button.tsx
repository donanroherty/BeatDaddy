import React, { ReactNode } from 'react'
import styled, { withTheme } from 'styled-components'

import { ThemeInterface } from '../theme/theme'

interface ButtonProps {
  width?: string
  height?: string
  contentColor?: string
  onClick?: () => void
  theme?: ThemeInterface
  children?: ReactNode
}

const defaultProps: ButtonProps = {
  width: '32px',
  height: '32px',
  contentColor: 'blue',
  onClick: () => {}
}

const Button = (props: ButtonProps) => {
  return (
    <Wrapper onClick={props.onClick} {...props}>
      <Content>{props.children && props.children}</Content>
    </Wrapper>
  )
}

const Content = styled.div``

const Wrapper = styled.div<any>`
  width: ${props => props.width};
  height: ${props => props.height};

  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 21px;
  color: ${props => props.contentColor};

  border-radius: 5px;
  border: 1px solid ${props => props.theme.primary};

  &:hover {
    border: 1px solid ${props => props.theme.primaryVeryLight};
  }

  &:hover ${Content} {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active ${Content} {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`

Button.defaultProps = defaultProps
export default withTheme(Button)
