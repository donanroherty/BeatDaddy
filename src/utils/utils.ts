// Simple timer.  Useful for benchmarking code blocks
export const timer = (name: string) => {
  var start = new Date()
  return {
    stop: function() {
      var end = new Date()
      var time = end.getTime() - start.getTime()
      console.log('Timer:', name, 'finished in', time, 'ms')
    }
  }
}

// Clamps a number between min and max
export const clamp = (val: number, min: number, max: number) => {
  return val < min ? min : val > max ? max : val
}

// Returns num within range A  mapped to be within range B
export const mapToRange = (
  num: number,
  inRangeA: number,
  inRangeB: number,
  outRangeA: number,
  outRangeB: number
) => {
  return ((num - inRangeA) / (inRangeB - inRangeA)) * (outRangeB - outRangeA) + outRangeA
}

export const degToRad = (angleInDegrees: number) => (angleInDegrees - 90) * (Math.PI / 180.0)

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const a = degToRad(angleInDegrees)
  return {
    x: centerX + radius * Math.cos(a),
    y: centerY + radius * Math.sin(a)
  }
}

export const makeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const fullCircle = endAngle - startAngle === 360
  const start = polarToCartesian(x, y, radius, endAngle - 0.01)
  const end = polarToCartesian(x, y, radius, startAngle)
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}${
    fullCircle ? 'z' : ''
  }`

  return d
}
