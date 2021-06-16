import { useState } from 'react'
import { ShapesAndColorsPageWrapper, ErrorMessage, TopMiddle } from './styles'
import FloatingUI from './FloatingUI'
import FullScreenShapeDragger from './FullScreenShapeDragger'
import withColorsAndShapes from '../../../network/hoc/withColorsAndShapes'
import Color from '../../../utils/Color/Color'
import { findByLabel } from '../../../utils/array'
import { buildSpectrumFromColors } from '../../../utils/Color/color-utils'
import chroma from 'chroma-js'
import HomeButton from '../../HomeButton'

const convertColorsToSpectrum = (colorsList = []) => {
  const colors = colorsList.map((color) => new Color(...chroma(color.value).rgb()))
  return buildSpectrumFromColors(colors)
}

const ShapesAndColorsPage = ({ shapes, colors, fetching, error }) => {
  const [chosenShape, setChosenShape] = useState(null)
  const [colorSpectrum, setColorSpectrum] = useState([])
  
  const handleChooseColors = (newColorsList) => {
    setColorSpectrum(convertColorsToSpectrum(newColorsList))
  }

  const handleChooseShape = (newShape) => {
    setChosenShape(findByLabel(newShape.label, shapes))
  }

  return (
    <ShapesAndColorsPageWrapper>
      <TopMiddle>
        <HomeButton />
      </TopMiddle>
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
            <FullScreenShapeDragger shape={chosenShape} colorSpectrum={colorSpectrum} />
          </>
        )
      }
    </ShapesAndColorsPageWrapper>
  )
}

export default withColorsAndShapes(ShapesAndColorsPage)
