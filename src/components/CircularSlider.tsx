import React, { MouseEvent } from 'react'
import styled, { withTheme } from 'styled-components'
import { mapToRange, clamp, degToRad, polarToCartesian, makeArc } from '../utils/utils'
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
  isDragging: boolean
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
  private sliderHandleRef: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>()

  constructor(props: CircularSliderProps) {
    super(props)

    this.state = {
      isDragging: false,
      initialized: false
    }
  }

  static defaultProps = defaultProps

  componentWillMount() {
    document.addEventListener('mouseup', this.onMouseUp, false)
    document.addEventListener('touchend', this.onMouseUp, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('touchmove', this.onTouchMove, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp, false)
    document.removeEventListener('touchend', this.onMouseUp, false)
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('touchmove', this.onTouchMove, false)
  }

  componentDidMount() {
    // Render again after first render when refs are set
    this.setState({ initialized: true })
  }

  onMouseUp = (e: any) => {
    if (!this.state.isDragging) return
    e.stopPropagation()
    e.preventDefault()
    this.setState({ isDragging: false })
  }
  onMouseDown = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ isDragging: true })
  }
  onMouseMove = (e: any) => {
    if (!this.state.isDragging) return
    e.stopPropagation()
    e.preventDefault()
    if (!this.state.initialized) return
    const pos: Vector2D = { x: e.pageX, y: e.pageY }
    this.handleValueUpdate(pos)
  }
  onPathMouseDown = (e: MouseEvent) => {
    if (this.state.isDragging) return
    e.stopPropagation()
    e.preventDefault()
    const pos: Vector2D = { x: e.pageX, y: e.pageY }
    this.handleValueUpdate(pos)
  }
  onPathTouchStart = (e: any) => {
    if (this.state.isDragging) return
    e.stopPropagation()
    e.preventDefault()
    const pos: Vector2D = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    this.handleValueUpdate(pos)
  }
  onTouchMove = (e: TouchEvent) => {
    if (!this.state.isDragging) return
    e.stopPropagation()
    e.preventDefault()
    const pos: Vector2D = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    this.handleValueUpdate(pos)
  }

  handleValueUpdate = (pos: Vector2D) => {
    if (!this.state.initialized) return

    const rect = this.elementRef.current!.getBoundingClientRect()
    const center: Vector2D = {
      x: rect.left + window.scrollX + rect.width * 0.5,
      y: rect.top + window.scrollY + rect.height * 0.5
    }
    const mousePos: Vector2D = { x: pos.x, y: pos.y }
    const rel: Vector2D = { x: mousePos.x - center.x, y: mousePos.y - center.y }

    const atan2 = Math.atan2(rel.y, rel.x)
    const degrees = mapToRange(atan2, -Math.PI, Math.PI, 0, 360)
    const rotated = degrees - 270 < 0 ? degrees - 270 + 360 : degrees - 270
    const clamped = clamp(rotated, this.props.sliceAngle!, 360 - this.props.sliceAngle!)
    const mapped = mapToRange(clamped, this.props.sliceAngle!, 360 - this.props.sliceAngle!, 0, 100)
    this.props.setValue!(mapped)
  }

  getSliderHandlePosition = () => {
    if (!this.pathRef.current || !this.sliderHandleRef.current) return
    const arcLength = this.pathRef.current.getTotalLength()
    const mappedAngle = arcLength - mapToRange(this.props.value!, 0, 100, 0, arcLength)

    const pos = this.pathRef.current.getPointAtLength(mappedAngle)

    return { x: pos.x - this.props.thumbRadius!, y: pos.y - this.props.thumbRadius! }
  }

  render() {
    const { width, height, sliceAngle, radius, strokeWidth, thumbRadius, theme, value } = this.props

    const arcCenter: Vector2D = { x: width! * 0.5, y: height! * 0.5 }
    const arcRad = radius! - strokeWidth! / 2
    const arcStartAng = 180 + sliceAngle!
    const arcEndAng = 360 + 180 - sliceAngle!
    const arcStart = polarToCartesian(arcCenter.x, arcCenter.y, arcRad, arcEndAng - 0.01)
    const arcEnd = polarToCartesian(arcCenter.x, arcCenter.y, arcRad, arcStartAng)

    // The primary circular path everything is built on
    const arc = makeArc(
      width! * 0.5,
      height! * 0.5,
      radius! - strokeWidth! / 2,
      180 + sliceAngle!,
      360 + 180 - sliceAngle!
    )

    const arcLength = this.pathRef.current ? this.pathRef.current.getTotalLength() : 0
    const grabIconDims = getIconDimensions('grabDots', 15)

    return (
      <Wrapper {...this.props} ref={this.elementRef}>
        <SVGContainer viewBox={`0 0 ${width} ${height}`}>
          {/* Background fill */}
          <circle
            r={this.props.radius! - 0.5}
            cx={this.props.radius! + 0.25 + this.props.thumbRadius! / 2}
            cy={this.props.radius! + 0.25 + this.props.thumbRadius! / 2}
            fill={'white'}
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
            onClick={this.onPathMouseDown}
            onTouchStart={this.onPathTouchStart}
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
            onClick={this.onPathMouseDown}
            onTouchStart={this.onPathTouchStart}
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
            ref={this.sliderHandleRef}
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onMouseDown}
            x={this.state.initialized ? this.getSliderHandlePosition()!.x : 0}
            y={this.state.initialized ? this.getSliderHandlePosition()!.y : 0}
          >
            <circle r={thumbRadius} cx={thumbRadius} cy={thumbRadius} fill={theme!.primaryLight} />
            <svg x={thumbRadius! - grabIconDims.width / 2} y={thumbRadius! / 2}>
              <Icon icon="grabDots" size={15} fillColor={theme!.primary} />
            </svg>
          </svg>
        </SVGContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div<CircularSliderProps>`
  position: relative;
  z-index: 10;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  touch-action: none;
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
