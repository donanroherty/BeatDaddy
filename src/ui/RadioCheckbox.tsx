/**
 * RadioCheckbox.tsx
 */
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'

export interface RadioCheckboxProps {
  isChecked: boolean
  id: string
  onClick?: (id: string) => void
  theme?: ThemeInterface
}

const defaultProps: RadioCheckboxProps = {
  isChecked: false,
  id: '',
  onClick: (id: string) => {}
}

const RadioCheckbox = (props: RadioCheckboxProps) => {
  const handleClick = () => {
    props.onClick!(props.id)
  }

  return <Wrapper onClick={handleClick}>{props.isChecked && <Check />}</Wrapper>
}

const Wrapper = styled.div`
  width: 25px;
  height: 25px;
  border: 2px solid ${props => props.theme.light};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Check = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  position: relative;
`

RadioCheckbox.defaultProps = defaultProps
export default withTheme(RadioCheckbox)
