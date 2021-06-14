import {
  ShapesAndColorsPageWrapper,
} from './styles'
import FloatingUI from './FloatingUI'
import DraggableShape from './DraggableShape'

const ShapesAndColorsPage = () => {

  return (
    <ShapesAndColorsPageWrapper>
      <FloatingUI />
      <DraggableShape />
    </ShapesAndColorsPageWrapper>
  )
}

export default ShapesAndColorsPage
