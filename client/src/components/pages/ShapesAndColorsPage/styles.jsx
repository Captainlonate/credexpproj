import styled from 'styled-components'

export const ShapesAndColorsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const TopMiddle = styled.div`
  position: absolute;
  top: 1vw;
  left: 20vw;
  z-index: 10;
`

export const ErrorMessage = styled.h3`
  color: red;
`