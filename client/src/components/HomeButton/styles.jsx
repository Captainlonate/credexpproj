import styled from 'styled-components'

export const HomeButtonWrapper = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.stormGreen};
  color: white;
  padding: 0.75rem;
  cursor: pointer;
  border: none;
  
  & > svg {
    width: 100%;
    height: 100%;
    fill: #ffffff;
  }
  
  &:hover {
    background-color: ${(props) => props.theme.stormGreenHighlight};
  }
`