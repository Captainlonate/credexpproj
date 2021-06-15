import styled from 'styled-components'

export const DraggableArea = styled.div`
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`

// The four markers in the corners of the screen
// Appear as little colored squares
export const CornerMarker = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  z-index: 2;
`

export const CornerMarkerTL = styled(CornerMarker)`
  top: 0;
  left: 0;
`

export const CornerMarkerTR = styled(CornerMarker)`
  top: 0;
  right: 0;
`

export const CornerMarkerBL = styled(CornerMarker)`
  bottom: 0;
  left: 0;
`

export const CornerMarkerBR = styled(CornerMarker)`
  bottom: 0;
  right: 0;
`

// For centering the InfoBox and NoShape in the center of the screen
// but appears behind the draggable shape and floating UI (z-index: 2)
export const CenteredBackgroundLayer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InfoBox = styled.div`
  text-align: center;
  color: white;
  font-size: 3.5rem;
  // Pushed up to get out of the shape's way (so you can see both)
  padding-bottom: 14rem;
`

// The message to show when there is no shape selected yet
export const NoShape = styled.div`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  padding: 0 3rem;
`

export const DraggableContainer = styled.div`
  position: absolute;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  /* Cannot use display: none, because getBoundingClientRect will have all zero's */
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  border: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 4;

  & svg {
    width: 100%;
    height: 100%;
  }

  /* The white dot in the center of the container */
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -2px 0 0 -2px;
    border-radius: 50%;
  }
`