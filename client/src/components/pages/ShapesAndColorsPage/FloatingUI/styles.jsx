import styled from 'styled-components'

export const FloatingUIShell = styled.div`
  position: fixed;
  top: 2vw;
  left: 2vw;
  padding: 1vw;
  z-index: 5;
  min-width: 40vw;
`

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ControlLabel= styled.div`
  font-size: 2vw;
  color: white;
  padding-bottom: 1vw;
`

export const ControlSection = styled.div`
  padding: 1vw 0;
`