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
