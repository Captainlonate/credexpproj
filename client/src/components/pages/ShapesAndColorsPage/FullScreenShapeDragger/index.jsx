import {
  DraggableArea,
  DraggableContainer,
  NoShape,
  CornerMarkerTL,
  CornerMarkerTR,
  CornerMarkerBL,
  CornerMarkerBR,
  CenteredBackgroundLayer,
  InfoBox
} from './styles'
import useDraggableShape from './useDraggableShape'
import SvgShape from '../../../SvgShape'

const RGB_WHITE = 'rgb(255, 255, 255)'

/*
  
*/
const FullScreenShapeDragger = ({ shape, colorSpectrum = [] }) => {
  // Manages the logic for dragging a shape around
  const { position, setDragging, onMouseMove, shapeRef } = useDraggableShape()
  // Determine the color of the shape by comparing the distance from center to the color spectrum
  const rgbColor = colorSpectrum[Math.min(Math.floor(position.distance * 100), colorSpectrum.length - 1)]
  // The colors of the corner markers will be the final color in the spectrum
  const finalColor = (colorSpectrum.length > 0 ) ? colorSpectrum[colorSpectrum.length - 1] : RGB_WHITE

  return (
    <DraggableArea onMouseUp={() => void setDragging(false)} onMouseMove={onMouseMove}>
      {/* The four squares in the corners that indicate the final
      color and where the user should be trying to drag the shape */}
      <CornerMarkerTL style={{ backgroundColor: finalColor }} />
      <CornerMarkerTR style={{ backgroundColor: finalColor }} />
      <CornerMarkerBL style={{ backgroundColor: finalColor }} />
      <CornerMarkerBR style={{ backgroundColor: finalColor }} />
      {/* The visual indicator of the distance traveled */}
      <CenteredBackgroundLayer>
        {
          !shape
            ? (
              <NoShape>
                Choose a shape & color, then drag it to the corners.
                <br /><br />
                Distance is measured from the shape's center.
              </NoShape>
            )
            : (
              <InfoBox>{Math.round(position.distance * 100)}%</InfoBox>
            )
        }
      </CenteredBackgroundLayer>
      <DraggableContainer
        style={{ top: position.y, left: position.x }}
        onMouseDown={() => void setDragging(true)}
        ref={shapeRef}
        isVisible={!!shape}
      >
        {
          shape && (<SvgShape color={rgbColor} paths={shape.paths} />)
        }
      </DraggableContainer>
    </DraggableArea>
  )
}

export default FullScreenShapeDragger
