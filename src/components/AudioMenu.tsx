import React from 'react'
import styled from '../theme/themed-styled-components'
import Slider from '@material-ui/lab/Slider'
import MenuPanel from '../ui/MenuPanel'
import { MenuPanelProps } from '../ui/MenuPanel'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'
import { withTheme } from 'styled-components'

interface AudioMenuProps extends MenuPanelProps {
  metronomeVolume: number
  setMetronomeVolume: (newVolume: number) => void
  droneVolume: number
  setDroneVolume: (newVolume: number) => void
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
    <Wrapper {...props}>
      <Content>
        <MetronomeSection>
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
        </MetronomeSection>

        <HR />

        <DroneSection>
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
        </DroneSection>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled(MenuPanel)`
  /* position: relative; */
`

const Content = styled.div`
  max-width: 300px;
  width: calc(100vw - 40px); // 40px allows for viewport padding
`
const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  padding-left: 20px;
`
const MetronomeSection = styled(Section)`
  padding-top: 20px;
`
const DroneSection = styled(Section)`
  padding-bottom: 30px;
`

const IconWrapper = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
`
const SectionContent = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
`
const HR = styled.div`
  background-color: ${props => props.theme.light};
  height: 1px;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`

export default withTheme(AudioMenu)
