import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const Header = styled.h1`
  font-size: 6vw;
  margin-top: 0;
  color: white;
`

export const SubHeader = styled.h3`
  font-size: 3vw;
  margin-top: 0;
  color: white;
`

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 40vw;
  height: 40vw;
  position: relative;
  font-size: 3vw;
  padding: 2vw;
`

export const LeftBox = styled(Box)`
  background-color: red;
`

export const RightBox = styled(Box)`
  background-color: #005ec9;
`

export const BoxText = styled.h4`
  color: white;
`

const ButtonAndLinkStyles = css`
  width: 100%;
  border: none;
  background-color: white;
  color: black;
  border-radius: 5px;
  padding: 1vw;
  text-align: center;
  margin-bottom: 2vw;
  cursor: pointer;
  text-transform: uppercase;
  display: block;
  font-size: 2vw;
  text-decoration: none;
`

export const BoxAnchor = styled.a`
  ${ButtonAndLinkStyles}
`

export const BoxLink = styled(Link)`
  ${ButtonAndLinkStyles}
`