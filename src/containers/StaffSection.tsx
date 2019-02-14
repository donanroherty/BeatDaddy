import React from 'react'
import styled from '../theme/themed-styled-components'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import { SubDivisionOptions } from './App'
import TimeSignature from '../components/TimeSignature'
import BeatStaff from '../components/BeatStaff'

interface StaffSectionProps {
  beatCount: number
  beatLength: number
  subdivisions: SubDivisionOptions
  timeSigMenuVisible: boolean
  toggleTimeSigMenu: () => void
  closeTimeSigMenu: () => void
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  theme: ThemeInterface
}

const StaffSection = (props: StaffSectionProps) => {
  return (
    <Wrapper>
      <Staff>
        <TimeSignature
          beatCount={props.beatCount}
          beatLength={props.beatLength}
          menuVisible={props.timeSigMenuVisible}
          toggleTimeSigMenu={props.toggleTimeSigMenu}
          closeTimeSigMenu={props.closeTimeSigMenu}
          setBeatCount={props.setBeatCount}
          setBeatLength={props.setBeatLength}
        />

        <BeatStaff
          beatCount={props.beatCount}
          beatLength={props.beatLength}
          subdivisions={props.subdivisions}
        />
      </Staff>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* background-color: lightcoral; */
  width: 100%;
  height: 100%;
  margin-top: auto;
  margin-bottom: auto;
`
const Staff = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export default withTheme(StaffSection)
