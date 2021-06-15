import styled from 'styled-components'

export const CenteredWithinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const SectionHeaderText = styled.h2`
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  color: ${(props) => props.theme.inverted};
  text-align: center;
`

export const SimulationPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
`

export const TopRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`