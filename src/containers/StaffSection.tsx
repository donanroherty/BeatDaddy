import React from 'react'
import styled from '../theme/themed-styled-components'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import TimeSignature from '../components/TimeSignature'
import BeatCount from '../components/BeatCount'
import BeatStaff from '../components/BeatStaff'
import { Accent, SubDivisionOptions } from '../utils/Types'

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
      <Inner>
        <Staff>
          <BeatCount
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
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`
const Inner = styled.div`
  padding: 0px 20px 0px 20px;
`
const Staff = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90px;
`

export default withTheme(StaffSection)
