import React from 'react'
import styled from '../theme/themed-styled-components'
import Slider from '@material-ui/lab/Slider'
import MenuPanel from '../ui/MenuPanel'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'
import { withTheme } from 'styled-components'

interface AudioMenuProps {
  posX?: number
  posY?: number
  metronomeVolume: number
  setMetronomeVolume: (newVolume: number) => void
  droneVolume: number
  setDroneVolume: (newVolume: number) => void
  show: boolean
  theme?: ThemeInterface
}

const AudioMenu = (props: AudioMenuProps) => {
  const handleSetMetronomeVolume = (event: any, value: number) => {
    props.setMetronomeVolume(value / 100)
  }

  const handleSetDroneVolume = (event: any, value: number) => {
    props.setDroneVolume(value / 100)
  }

  return (
    <MenuPanel posX={props.posX!} posY={props.posY!} show={props.show} hasArrow={true}>
      <Inner>
        <Section>
          <IconWrapper>
            <Icon
              icon="metronome"
              fillColor={props.theme!.dark!}
              fillColor2={props.theme!.primary!}
              size={41.5}
            />
          </IconWrapper>
          <SectionContent>
            <Slider value={props.metronomeVolume * 100} onChange={handleSetMetronomeVolume} />
          </SectionContent>
        </Section>

        <HR />

        <Section>
          <IconWrapper>
            <Icon
              icon="keyboard"
              fillColor={props.theme!.dark!}
              fillColor2={props.theme!.primary!}
              fillColor3="white"
              size={27}
            />
          </IconWrapper>
          <SectionContent>
            <Slider value={props.droneVolume * 100} onChange={handleSetDroneVolume} />
          </SectionContent>
        </Section>
      </Inner>
    </MenuPanel>
  )
}

const Inner = styled.div`
  height: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 1fr auto 1fr;
`
const Section = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`
const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
`
const SectionContent = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px 0 20px;
`
const HR = styled.div`
  background-color: ${props => props.theme.light};
  height: 1px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`

export default withTheme(AudioMenu)
