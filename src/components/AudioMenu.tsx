import React from 'react'
import styled from '../theme/themed-styled-components'
import MenuPanel from '../ui/MenuPanel'
import { MenuPanelProps } from '../ui/MenuPanel'
import Icon from '../ui/Icon'
import { ThemeInterface } from '../theme/theme'
import { withTheme } from 'styled-components'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface AudioMenuProps extends MenuPanelProps {
  metronomeVolume: number
  setMetronomeVolume: (newVolume: number) => void
  droneVolume: number
  setDroneVolume: (newVolume: number) => void
  theme?: ThemeInterface
}

const AudioMenu = (props: AudioMenuProps) => {
  const handleChangeMnVolume = (val: number) => {
    props.setMetronomeVolume(val)
  }
  const handleChangeDroneVolume = (val: number) => {
    props.setDroneVolume(val)
  }

  const handleStyle = {
    borderColor: props.theme!.primaryLight!,
    height: 28,
    width: 28,
    marginLeft: -14,
    marginTop: -9,
    backgroundColor: props.theme!.primaryLight!
  }
  const railStyle = {
    backgroundColor: 'transparent',
    height: 10,
    borderColor: props.theme!.primaryLight!,
    border: `2px solid ${props.theme!.primaryLight!}`
  }
  const trackStyle = { backgroundColor: props.theme!.primary!, height: 10 }

  return (
    <MenuPanel {...props}>
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
            <Slider
              min={0}
              max={100}
              value={props.metronomeVolume}
              onChange={handleChangeMnVolume}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
              railStyle={railStyle}
            />
          </SectionContent>
        </MetronomeSection>

        <HR />

        <DroneSection>
          <IconWrapper>
            <Icon
              icon="chord"
              fillColor={props.theme!.dark!}
              fillColor2={props.theme!.primary!}
              fillColor3="white"
              size={40}
            />
          </IconWrapper>
          <SectionContent>
            <Slider
              min={0}
              max={100}
              value={props.droneVolume}
              onChange={handleChangeDroneVolume}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
              railStyle={railStyle}
            />
          </SectionContent>
        </DroneSection>
      </Content>
    </MenuPanel>
  )
}

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
  width: 100%;
  padding-left: 20px;
  padding-right: 35px;
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
