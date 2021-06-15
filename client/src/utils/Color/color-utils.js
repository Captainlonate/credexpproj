import Color from './Color'
import { getValueBetween } from '../numbers'

/*
  Build a color spectrum, which is an array of 100 elements.
  Each index represents 1% of the distance from start to finish.
  The number of colors determines how many segments should be created.
  For instance:
    With 3 Colors:
      Color 1 (0) --------- Color 2 (50%) -------- Color 3 (100%)
      There are 3 colors and 2 segments between them.
  The segments are used to transition between each of the 2 colors.
  Note that the colors array expects to be passed actual Color() objects.
  The resulting array will contain strings, representing css rgb() values.
*/
export const buildSpectrumFromColors = (colors = []) => {
  if (colors.length === 0) {
    return [...new Array(100)].fill('rgb(0, 0, 0)')
  }

  if (colors.length === 1) {
    return [...new Array(100)].fill(colors[0].rgb)
  }

  const segmentSize = 100 / (colors.length - 1)

  return [...new Array(100)].map((el, idx) => {
    const percentWithinSegment = (idx % segmentSize) / segmentSize
    const color1Idx = Math.floor(idx / segmentSize)
    const color2Idx = color1Idx + 1
    const color1 = colors[color1Idx]
    const color2 = colors[color2Idx]

    return (
      new Color(
        getValueBetween(color1.red, color2.red, percentWithinSegment),
        getValueBetween(color1.green, color2.green, percentWithinSegment),
        getValueBetween(color1.blue, color2.blue, percentWithinSegment),
      ).rgb
    )
  })
}