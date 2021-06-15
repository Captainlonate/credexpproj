import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import ShapesBGImage from '../../../images/shapes_bg.png'
import SimulationBGImage from '../../../images/simulation_bg.png'

export const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    overflow: auto;
    justify-content: flex-start;
    padding: 2rem 0.5rem;
    text-align: center;
  }
`

export const Header = styled.h1`
  font-size: 5rem;
  margin-top: 0;
  color: white;

  @media screen and (max-width: 700px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 8vw;
  }
`

export const SubHeader = styled.h3`
  font-size: 2.5rem;
  margin-top: 0;
  color: white;

  @media screen and (max-width: 700px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 4vw;
  }
`

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 4rem;
  width: 40rem;
  height: 40rem;
  padding: 2rem;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  border: 4px solid ${(props) => props.theme.stormGreen};

  @media screen and (max-width: 975px) {
    font-size: 3rem;
    width: 30rem;
    height: 30rem;
  }

  @media screen and (max-width: 700px) {
    font-size: 2.5rem;
    width: 25rem;
    height: 25rem;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 5vw;
    width: 60vw;
    height: 60vw;
    margin-bottom: 3vw;
  }
`

export const LeftBox = styled(Box)`
  background-image: linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.75) ), url(${ShapesBGImage});
`

export const RightBox = styled(Box)`
  background-image: linear-gradient( rgba(0,0,0,0.4), rgba(0, 0, 0, 0.75) ), url(${SimulationBGImage});
`

export const BoxText = styled.h4`
  color: white;
`

const ButtonAndLinkStyles = css`
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.stormGreen};
  color: black;
  border-radius: 5px;
  padding: 0.5em;
  text-align: center;
  margin-bottom: 1.5em;
  cursor: pointer;
  text-transform: uppercase;
  display: block;
  font-size: 0.5em;
  text-decoration: none;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;

  &:hover {
    background-color: ${(props) => props.theme.stormGreenHighlight};
  }
`

export const BoxAnchor = styled.a`
  ${ButtonAndLinkStyles}
`

export const BoxLink = styled(Link)`
  ${ButtonAndLinkStyles}
`