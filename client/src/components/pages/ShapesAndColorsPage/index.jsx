import { useState } from 'react'
import {
  ShapesAndColorsPageWrapper,
  ErrorMessage,
} from './styles'
import FloatingUI from './FloatingUI'
import DraggableShape from './DraggableShape'
import withColorsAndShapes from '../../../network/hoc/withColorsAndShapes'
import Color from '../../../utils/Color/Color'
import { buildSpectrumFromColors } from '../../../utils/Color/color-utils'
import chroma from 'chroma-js'

const ShapesAndColorsPage = ({ shapes, colors, fetching, error }) => {
  const [chosenShape, setChosenShape] = useState(null)
  const [colorSpectrum, setColorSpectrum] = useState([])
  
  const handleChooseColors = (newColorsList) => {
    const colors = newColorsList.map((color) => new Color(...chroma(color.value).rgb()))
    const spectrum = buildSpectrumFromColors(colors)
    setColorSpectrum(spectrum)
  }

  const handleChooseShape = (newShape) => {
    const shape = shapes.find(({ label }) => label === newShape.label)
    setChosenShape(shape)
  }

  return (
    <ShapesAndColorsPageWrapper>
      {
        error && (<ErrorMessage>{error}</ErrorMessage>)
      }
      {
        !fetching && (
          <>
            <FloatingUI
              shapes={shapes}
              colors={colors}
              onChooseShape={handleChooseShape}
              onChooseColors={handleChooseColors}
            />

            <DraggableShape shape={chosenShape} colorSpectrum={colorSpectrum} />
          </>
        )
      }
    </ShapesAndColorsPageWrapper>
  )
}

export default withColorsAndShapes(ShapesAndColorsPage)
