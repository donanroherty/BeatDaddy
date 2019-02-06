import * as React from 'react'
import styled, { withTheme } from 'styled-components/macro'
import { ThemeInterface } from '../theme/theme'
import Icon from '../ui/Icon'
import iconDefinitions, { getIconDimensions } from '../ui/iconDefinitions'
import { SubDivisionOptions } from '../containers/App'

export interface BeatStaffProps {
  beatCount: number
  subdivisions: SubDivisionOptions
  theme: ThemeInterface
}

interface Beat {
  time: number
  subdivs: Array<SubDivObj>
}

interface SubDivObj {
  type: SubDivisionType
  time: number
}
enum SubDivisionType {
  beat = 'BEAT',
  eighth = 'EIGHTH',
  sixteenth = 'SIXTEENTH'
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100px;
  background-color: lightgoldenrodyellow;
`

const BeatStaff = (props: BeatStaffProps) => {
  const dimensions = getIconDimensions('note', 50)

  // const totalWidth = 600 // Total width of svg
  // const margin = 0 // Perc of staffWidth to use as margin
  // const width = totalWidth - (totalWidth / 100) * margin // width - margin
  // const usableWidth = width - dimensions.width // Width that prevents icon overhang into margin as svgs scale to the right

  // const icons = new Array(props.beatCount).fill(undefined).map((val, i) => {
  //   const usableWidthPerc = 100 * (usableWidth / totalWidth)
  //   const xPos = (usableWidthPerc / (props.beatCount - 1)) * i

  //   return (
  //     <svg x={`${xPos}%`} y="25%" key={i}>
  //       {<Icon icon="note" fillColor={props.theme.primary} size={50} hasShadow />}
  //     </svg>
  //   )
  // })
  const totalHeight = 100
  const totalWidth = 600 // Total width of svg
  const marginPixels = 30
  const marginPerc = (marginPixels / totalWidth) * 100
  const innerWidthPerc = 100 - marginPerc * 2

  const divCount =
    props.subdivisions === SubDivisionOptions.eighth
      ? 2
      : props.subdivisions === SubDivisionOptions.sixteenth
        ? 4
        : props.subdivisions === SubDivisionOptions.triplet
          ? 3
          : 1

  const divs = new Array(props.beatCount * divCount).fill(0).map((val, i, arr) => {
    const isBeat = i === 0 || i % (arr.length / props.beatCount) === 0

    const isEighth =
      !isBeat &&
      (props.subdivisions === SubDivisionOptions.triplet ||
        i % (arr.length / props.beatCount / 2) === 0)

    const out: SubDivObj = {
      time: (100 / arr.length) * i,
      type: isBeat
        ? SubDivisionType.beat
        : isEighth
          ? SubDivisionType.eighth
          : SubDivisionType.sixteenth
    }
    return out
  })

  const makeLine = (posX: number, color: string, length: number, key: string) => {
    const y1 = (totalHeight - length) / 2
    const y2 = totalHeight - (totalHeight - length) / 2
    return (
      <svg key={key}>
        <line
          x1={`${posX}%`}
          y1={`${y1}%`}
          x2={`${posX}%`}
          y2={`${y2}%`}
          style={{ stroke: color, strokeWidth: 2 }}
          shapeRendering="crispEdges"
        />
      </svg>
    )
  }

  const markers = divs.map((div, i) => {
    const x = (innerWidthPerc / 100) * div.time + marginPerc

    const length =
      div.type === SubDivisionType.beat ? 40 : div.type === SubDivisionType.eighth ? 20 : 15

    const beatColor =
      div.type === SubDivisionType.beat
        ? 'blue'
        : div.type === SubDivisionType.eighth
          ? 'cyan'
          : 'yellow'

    return makeLine(x, beatColor, length, `${i}`)
  })

  return (
    <Wrapper>
      <svg height="100" width="100%">
        <rect x="0" y="0" width="100%" height="100%" fill="lightgray" />
        <line
          x1={`${marginPerc}%`}
          y1="50%"
          x2={`${100 - marginPerc}%`}
          y2="50%"
          style={{ stroke: 'rgb(255, 0, 0)', strokeWidth: 2 }}
        />

        {markers}
      </svg>
    </Wrapper>
  )
}
export default withTheme(BeatStaff)
