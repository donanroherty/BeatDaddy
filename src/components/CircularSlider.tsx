import React, { MouseEvent } from 'react'
import styled, { withTheme } from 'styled-components'
import { mapToRange, clamp } from '../utils/utils'
import { ThemeInterface } from '../theme/theme'
import Icon from '../ui/Icon'
import { getIconDimensions } from '../ui/iconDefinitions'
import { Vector2D } from '../utils/Types'

interface CircularSliderProps {
  value?: number
  setValue?: (val: number) => void
  width?: number
  height?: number
  sliceAngle?: number
  radius?: number
  strokeWidth?: number
  thumbRadius?: number
  theme?: ThemeInterface
}

interface CircularSliderState {
  draggingThumbMarker: boolean
  initialized: boolean
}

const defaultProps: CircularSliderProps = {
  value: 75,
  setValue: (val: number) => {},
  width: 175,
  height: 175,
  sliceAngle: 20,
  radius: 80,
  strokeWidth: 15,
  thumbRadius: 15
}

class CircularSlider extends React.Component<CircularSliderProps, CircularSliderState> {
  private elementRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()
  private pathRef: React.RefObject<SVGPathElement> = React.createRef<SVGPathElement>()
  private thumbMarkerRef: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>()

  constructor(props: CircularSliderProps) {
    super(props)

    this.state = {
      draggingThumbMarker: false,
      initialized: false
    }
  }

  componentDidUpdate(prevProps: CircularSliderProps, prevState: CircularSliderState) {
    if (prevProps.value !== this.props.value) {
      // this.updateThumbMarkerPosition()
    }
  }

  componentWillMount() {
    document.addEventListener('mouseup', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClick, false)
  }

  componentDidMount() {
    // this.updateThumbMarkerPosition()
    this.setState({ initialized: true })
  }

  handleClick = (e: any) => {
    this.setState({ draggingThumbMarker: false })
  }

  static defaultProps = defaultProps

  handlePointerMove = (e: MouseEvent) => {
    if (!this.state.draggingThumbMarker) return
    if (!this.elementRef.current) return

    const rect = this.elementRef.current.getBoundingClientRect()

    const center: Vector2D = {
      x: rect.left + window.scrollX + rect.width * 0.5,
      y: rect.top + window.scrollY + rect.height * 0.5
    }
    const mousePos: Vector2D = { x: e.pageX, y: e.pageY }
    const rel: Vector2D = { x: mousePos.x - center.x, y: mousePos.y - center.y }

    const atan2 = Math.atan2(rel.y, rel.x)
    const degrees = mapToRange(atan2, -Math.PI, Math.PI, 0, 360)
    const rotated = degrees - 270 < 0 ? degrees - 270 + 360 : degrees - 270
    const clamped = clamp(rotated, this.props.sliceAngle!, 360 - this.props.sliceAngle!)
    const mapped = mapToRange(clamped, this.props.sliceAngle!, 360 - this.props.sliceAngle!, 0, 100)

    this.props.setValue!(mapped)
  }

  degToRad = (angleInDegrees: number) => (angleInDegrees - 90) * (Math.PI / 180.0)

  polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const a = this.degToRad(angleInDegrees)
    return {
      x: centerX + radius * Math.cos(a),
      y: centerY + radius * Math.sin(a)
    }
  }

  makeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const fullCircle = endAngle - startAngle === 360
    const start = this.polarToCartesian(x, y, radius, endAngle - 0.01)
    const end = this.polarToCartesian(x, y, radius, startAngle)
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

    const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}${
      fullCircle ? 'z' : ''
    }`

    return d
  }

  handleThumbMarkerClick = (e: any) => {
    console.log('click')
    this.setState({ draggingThumbMarker: true })
  }

  render() {
    const { width, height, sliceAngle, radius, strokeWidth, thumbRadius, theme, value } = this.props

    const arcCenter: Vector2D = {
      x: width! * 0.5,
      y: height! * 0.5
    }
    const arcRad = radius! - strokeWidth! / 2
    const arcStartAng = 180 + sliceAngle!
    const arcEndAng = 360 + 180 - sliceAngle!
    const arcStart = this.polarToCartesian(arcCenter.x, arcCenter.y, arcRad, arcEndAng - 0.01)
    const arcEnd = this.polarToCartesian(arcCenter.x, arcCenter.y, arcRad, arcStartAng)

    const arc = this.makeArc(
      width! * 0.5,
      height! * 0.5,
      radius! - strokeWidth! / 2,
      180 + sliceAngle!,
      360 + 180 - sliceAngle!
    )

    const arcLength = this.pathRef.current ? this.pathRef.current.getTotalLength() : 0

    const grabIconDims = getIconDimensions('grabDots', 15)

    const getThumbMarkerPosition = () => {
      if (!this.pathRef.current || !this.thumbMarkerRef.current) return

      const arcLength = this.pathRef.current.getTotalLength()
      const mappedAngle = arcLength - mapToRange(value!, 0, 100, 0, arcLength)
      const pos = this.pathRef.current.getPointAtLength(mappedAngle)

      const out: Vector2D = {
        x: pos.x - thumbRadius!,
        y: pos.y - thumbRadius!
      }

      return out
    }

    return (
      <Wrapper
        {...this.props}
        onMouseMove={this.handlePointerMove.bind(this)}
        id="circular-slider"
        ref={this.elementRef}
      >
        {/* Extends bounds of component to catch mouse events */}
        {/* <MouseCatcher /> */}
        <SVGContainer viewBox={`0 0 ${width} ${height}`}>
          {/* Background fill */}
          <circle
            r={this.props.radius! - 0.5}
            cx={this.props.radius! + 0.25 + this.props.thumbRadius! / 2}
            cy={this.props.radius! + 0.25 + this.props.thumbRadius! / 2}
            fill={'white'}
            onClick={e => console.log('click')}
            style={{
              userSelect: 'none'
            }}
          />

          {/* Main path */}
          <MainPath
            ref={this.pathRef}
            fill="transparent"
            stroke={this.props.theme!.primary}
            strokeWidth={strokeWidth}
            d={arc}
            style={{
              userSelect: 'none'
            }}
          />

          {/* Fill path */}
          <FillPath
            ref={this.pathRef}
            fill="transparent"
            stroke={theme!.primaryVeryLight}
            strokeWidth={strokeWidth! + 0.5}
            style={{
              strokeDasharray: arcLength,
              strokeDashoffset: (arcLength / 100) * this.props.value!,
              userSelect: 'none'
            }}
            d={arc}
          />

          {/* End cap */}
          <circle
            r={strokeWidth! / 2}
            cx={arcStart.x}
            cy={arcStart.y}
            fill={theme!.primaryVeryLight}
            style={{
              userSelect: 'none'
            }}
          />
          {/* Start cap */}
          <circle
            r={strokeWidth! / 2}
            cx={arcEnd.x}
            cy={arcEnd.y}
            fill={theme!.primary}
            style={{
              userSelect: 'none'
            }}
          />

          {/* Thumb marker */}
          <svg
            ref={this.thumbMarkerRef}
            onMouseDown={this.handleThumbMarkerClick}
            x={this.state.initialized ? getThumbMarkerPosition()!.x : 0}
            y={this.state.initialized ? getThumbMarkerPosition()!.y : 0}
          >
            <circle r={thumbRadius} cx={thumbRadius} cy={thumbRadius} fill={theme!.primaryLight} />

            <svg x={thumbRadius! - grabIconDims.width / 2} y={thumbRadius! / 2}>
              <Icon icon="grabDots" size={15} fillColor={theme!.primary} />
            </svg>
          </svg>
        </SVGContainer>
        )
      </Wrapper>
    )
  }
}

const Wrapper = styled.div<CircularSliderProps>`
  position: relative;
  z-index: 10;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`
const MouseCatcher = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
const SVGContainer = styled.svg`
  position: relative;
`

const MainPath = styled.path`
  user-select: none;
`
const FillPath = styled.path`
  user-select: none;
`

CircularSlider.defaultProps = defaultProps
export default withTheme(CircularSlider)
