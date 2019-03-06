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
import { Accent } from '../data/Types'

export interface BeatStaffProps {
  beatCount: number
  beatLength: number
  subdivisions: SubDivisionOptions
  beatAccents: Accent[]
  cycleBeatAccent: (beatIdx: number) => void
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
  const makeBeatMarker = (beatIdx: number, xPos: number, color: string, key: string) => {
    const { beatLength } = props
    const beatIcon: keyof typeof iconDefinitions =
      beatLength === 1
        ? 'wholeNote'
        : beatLength === 2
          ? 'halfNote'
          : beatLength === 4
            ? 'quarterNote'
            : beatLength === 8
              ? 'eighthNote'
              : 'sixteenthNote'

    const beatIconDimensions = getIconDimensions(beatIcon, beatIconSize)
    const horizAdjust = -8.0
    const iconWidthPerc = ((beatIconDimensions.width + horizAdjust) / elementWidth) * 100

    const accentIconOffset = { x: 3, y: 60 }
    const accent = props.beatAccents[beatIdx]
    const hasAccent = accent === Accent.light || accent === Accent.heavy
    const accentIcon =
      accent === Accent.light ? 'accentLight' : accent === Accent.heavy ? 'accentHeavy' : ''

    return (
      <BeatIconWrapper
        x={`${xPos - iconWidthPerc / 2}%`}
        y={verticalCenter - beatIconDimensions.height + 7.5}
        key={key}
        onClick={() => handleBeatClick(beatIdx)}
      >
        <rect
          x="0"
          y="0"
          width={beatIconDimensions.width + horizAdjust}
          height={beatIconSize + accentIconOffset.y}
          fill="transparent"
        />

        <Icon
          icon={beatIcon}
          fillColor={accent === Accent.silent ? 'lightgrey' : color}
          size={beatIconSize}
        />

        {accent === Accent.silent && (
          <line
            x1="0"
            y1="0"
            x2={beatIconDimensions.width}
            y2={beatIconSize}
            style={{ stroke: color, strokeWidth: 3 }}
          />
        )}

        {hasAccent && (
          <svg {...accentIconOffset}>
            <Icon
              icon={
                props.beatAccents[beatIdx] === Accent.light
                  ? 'accentLight'
                  : props.beatAccents[beatIdx] === Accent.heavy
                    ? 'accentHeavy'
                    : undefined
              }
              fillColor={color}
              size={15}
            />
          </svg>
        )}
      </BeatIconWrapper>
    )
  }

  // Return the horizontal posiiton of a marker by normalizing it's time to a percentage in the svg container
  const getMarkerXPosition = (div: any) => {
    const innerWidthPerc = 100 - leftLinePaddingPerc
    return (innerWidthPerc / 100) * div.time + leftLinePaddingPerc
  }

  // Generate markers for beats
  const beats = staffDivisions.filter(div => div.type === SubDivLevel.beat)
  const beatMarkers = beats.map((beat, i) => {
    const xPos = getMarkerXPosition(beat)
    return makeBeatMarker(i, xPos, props.theme.primary, String(beat.time))
  })

  // Generate markers for subdivisions
  const subdivs = staffDivisions.filter(div => div.type !== SubDivLevel.beat)
  const subDivMarkers = subdivs.map(subdiv => {
    const xPos = getMarkerXPosition(subdiv)
    const length = subdiv.type === SubDivLevel.eighth ? 15 : 8
    return makeVertLineMarker(xPos, props.theme.light, length, 1, `${subdiv.time}`)
  })

  const handleBeatClick = (beatIdx: number) => {
    props.cycleBeatAccent(beatIdx)
  }

  return (
    <Wrapper>
      <SVGContainer height={elementHeight} width={`${elementWidth}px`}>
        {/* center line */}
        <line
          x1={0}
          y1={verticalCenter}
          x2={`${100}%`}
          y2={verticalCenter}
          style={{ stroke: props.theme.light, strokeWidth: 2 }}
        />

        {/* beat and subdiv markers */}
        {subDivMarkers}
        {beatMarkers}

        {/* end lines */}
        {makeVertLineMarker(0, props.theme.dark, endBarLength, 6)}
        {makeVertLineMarker(100, props.theme.dark, endBarLength, 6)}
      </SVGContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: ${`${elementWidth}px`};
`

const SVGContainer = styled.svg`
  width: 100%;
  height: 100%;
`
const BeatIconWrapper = styled.svg`
  z-index: 5;
  filter: drop-shadow(${props => props.theme.dropShadow});
  &:hover {
    filter: brightness(${props => props.theme.hoverBrightness})
      drop-shadow(${props => props.theme.hoverDropShadow});
  }
  &:active {
    filter: brightness(${props => 1 - (props.theme.hoverBrightness - 1)});
  }
`

export default withTheme(BeatStaff)
