import styled from 'styled-components'

export const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const Canvas = styled.canvas`
  border: 2px solid ${(props) => props.theme.stormGreen};
  box-shadow: 1px 2px 7px black;
`