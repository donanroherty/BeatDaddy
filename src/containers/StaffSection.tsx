import React from 'react'
import styled from '../theme/themed-styled-components'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import TimeSignature from '../components/TimeSignature'
import BeatStaff from '../components/BeatStaff'
import { Accent, SubDivisionOptions } from '../data/Types'

interface StaffSectionProps {
  beatCount: number
  beatLength: number
  subdivisions: SubDivisionOptions
  timeSigMenuVisible: boolean
  beatAccents: Accent[]
  openTimeSigMenu: () => void
  closeTimeSigMenu: () => void
  setBeatCount: (count: number) => void
  setBeatLength: (length: number) => void
  cycleBeatAccent: (beatIdx: number) => void
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
          closeTimeSigMenu={props.closeTimeSigMenu}
          openTimeSigMenu={props.openTimeSigMenu}
          setBeatCount={props.setBeatCount}
          setBeatLength={props.setBeatLength}
        />

        <BeatStaff
          beatCount={props.beatCount}
          beatLength={props.beatLength}
          subdivisions={props.subdivisions}
          beatAccents={props.beatAccents}
          cycleBeatAccent={props.cycleBeatAccent}
        />
      </Staff>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
