import styled from 'styled-components'

export const DraggableArea = styled.div`
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`

export const DraggableContainer = styled.div`
  width: 10rem;
  height: 10rem;
  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
  }
`