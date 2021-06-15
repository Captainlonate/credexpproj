import { DraggableArea, DraggableContainer } from './styles'
import useColoredDraggableShape from './useColoredDraggableShape'

const SvgShape = ({ color, paths }) => (
  <svg style={{ fill: color }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    {
      paths.map((p, idx) => (<path key={idx} d={p}></path>))
    }
  </svg>
)

const DraggableShape = ({ colors, shape, colorSpectrum }) => {
  const shapeHook = useColoredDraggableShape()
  const { position, setDragging, onMouseMove, shapeRef } = shapeHook
  const rgbColor = colorSpectrum[Math.min(Math.floor(position.distance * 100), colorSpectrum.length - 1)]
  const shapeStyles = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    border: '1px solid black',
    fill: rgbColor
  }

  return (
    <DraggableArea onMouseUp={() => void setDragging(false)} onMouseMove={onMouseMove}>
      <DraggableContainer
        style={shapeStyles}
        onMouseDown={() => void setDragging(true)}
        ref={shapeRef}
      >
        {
          shape && (<SvgShape color={rgbColor} paths={shape.paths} />)
        }
      </DraggableContainer>
    </DraggableArea>
  )
}

export default DraggableShape
