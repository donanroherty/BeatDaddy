/**
 * BeatStaff.tsx
 * This is a visual representation of the current beat settings.  It displays beats, subdivisions and accents.
 */
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

enum SubDivLevel {
  beat = 'BEAT',
  eighth = 'EIGHTH',
  sixteenth = 'SIXTEENTH'
}

const elementHeight = 70 // Height of element
const elementWidth = 600 // Max width of element

const BeatStaff = (props: BeatStaffProps) => {
  const beatIcon: keyof typeof iconDefinitions = 'note'
  const beatIconSize = 50

  const leftLinePadding = 50 // Space allowed for extension of centerline before first beat
  const leftLinePaddingPerc = (leftLinePadding / elementWidth) * 100

  const endBarLength = 40 // Vertical length of the bars at the end of the staff
  const verticalCenter = elementHeight - endBarLength / 2 // Offset center line from the bottom with end bar length

  // The number of times to subdivide the space between 2 beats
  const divCount =
    props.subdivisions === SubDivisionOptions.eighth
      ? 2
      : props.subdivisions === SubDivisionOptions.sixteenth
        ? 4
        : props.subdivisions === SubDivisionOptions.triplet
          ? 3
          : 1

  //Get the positions and types of every beat and subdivision
  const staffDivisions = new Array(props.beatCount * divCount).fill(0).map((val, i, arr) => {
    const isBeat = i === 0 || i % (arr.length / props.beatCount) === 0

    const isEighth =
      !isBeat &&
      (props.subdivisions === SubDivisionOptions.triplet ||
        i % (arr.length / props.beatCount / 2) === 0)

    return {
      time: (100 / arr.length) * i,
      type: isBeat ? SubDivLevel.beat : isEighth ? SubDivLevel.eighth : SubDivLevel.sixteenth
    }
  })

  // Creates a vetical line svg used for marking subdivisions
  const makeVertLineMarker = (
    posX: number,
    color: string,
    length: number,
    thickness: number,
    key?: string
  ) => {
    const y1 = verticalCenter - length / 2
    const y2 = y1 + length
    return (
      <svg key={key}>
        <line
          x1={`${posX}%`}
          y1={`${y1}`}
          x2={`${posX}%`}
          y2={`${y2}`}
          style={{ stroke: color, strokeWidth: thickness }}
        />
      </svg>
    )
  }

  // Creates an icon used for marking beats
  const makeBeatMarker = (xPos: number, color: string, key: string) => {
    const beatIconDimensions = getIconDimensions(beatIcon, beatIconSize)
    const iconWidthPerc = (beatIconDimensions.width / elementWidth) * 100
    return (
      <svg
        x={`${xPos - iconWidthPerc / 2}%`}
        y={verticalCenter - beatIconDimensions.height + 9}
        key={key}
      >
        {<Icon icon="note" fillColor={color} size={beatIconSize} hasShadow />}
      </svg>
    )
  }

  // Generate markers for beats and subdivisions
  const markers = staffDivisions.map((div, i) => {
    const isBeat = div.type === SubDivLevel.beat
    const isEighth = !isBeat && div.type === SubDivLevel.eighth

    const innerWidthPerc = 100 - leftLinePaddingPerc
    const xPos = (innerWidthPerc / 100) * div.time + leftLinePaddingPerc
    const length = isEighth ? 15 : 8
    const color = isBeat ? props.theme.primary : isEighth ? props.theme.light : props.theme.light

    return isBeat
      ? makeBeatMarker(xPos, color, String(i))
      : makeVertLineMarker(xPos, color, length, 1, `${i}`)
  })

  return (
    <Wrapper height={elementHeight} width={`${elementWidth}px`}>
      {/* center line */}
      <line
        x1={0}
        y1={verticalCenter}
        x2={`${100}%`}
        y2={verticalCenter}
        style={{ stroke: props.theme.light, strokeWidth: 2 }}
      />

      {/* beat and subdiv markers */}
      {markers}

      {/* end lines */}
      {makeVertLineMarker(0, props.theme.dark, endBarLength, 6)}
      {makeVertLineMarker(100, props.theme.dark, endBarLength, 6)}
    </Wrapper>
  )
}

const Wrapper = styled.svg`
  width: 100%;
  max-width: ${`${elementWidth}px`};
  height: ${`${elementHeight}px`};
`

export default withTheme(BeatStaff)
