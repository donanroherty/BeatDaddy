import React from 'react'
import styled from '../theme/themed-styled-components'
import { withTheme } from 'styled-components'
import { ThemeInterface } from '../theme/theme'
import BeatCount from '../components/BeatCount'
import BeatStaff from '../components/BeatStaff'
import { Accent } from '../utils/Types'

// Redux
//////////////////////
import { connect } from 'react-redux'
import { IRootState } from '../store'
import { Dispatch } from 'redux'
import * as actions from '../store/metronome/actions'
import { MetronomeActions } from '../store/metronome/types'

//////////////////////

interface StaffSectionProps extends ReduxType {
  theme: ThemeInterface
}

const StaffSection = (props: StaffSectionProps) => {
  const cycleBeatAccent = (beatIdx: number) => {
    const curr = props.beatAccents[beatIdx]
    const max = Object.keys(Accent).length / 2
    const newAccent = curr + 1 < max ? curr + 1 : 0
    props.setBeatAccent(beatIdx, newAccent)
  }

  return (
    <Wrapper>
      <Inner>
        <Staff>
          <BeatCount
            beatCount={props.beatCount}
            beatLength={props.beatLength}
            setBeatCount={props.setBeatCount}
            setBeatLength={props.setBeatLength}
          />
          <BeatStaff
            beatCount={props.beatCount}
            beatLength={props.beatLength}
            subdivisions={props.subdivisions}
            beatAccents={props.beatAccents}
            cycleBeatAccent={cycleBeatAccent}
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

// Redux
/////////////////////////////////////////
const mapDispatcherToProps = (dispatch: Dispatch<MetronomeActions>) => {
  return {
    setBeatCount: (value: number) => dispatch(actions.setBeatCount(value)),
    setBeatLength: (value: number) => dispatch(actions.setBeatLength(value)),
    setBeatAccent: (beatIdx: number, value: Accent) =>
      dispatch(actions.setBeatAccent(beatIdx, value))
  }
}

const mapStateToProps = ({ metronome }: IRootState) => {
  const { beatCount, beatLength, beatAccents, subdivisions } = metronome
  return { beatCount, beatLength, beatAccents, subdivisions }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
/////////////////////////////////////////

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(withTheme(StaffSection))
