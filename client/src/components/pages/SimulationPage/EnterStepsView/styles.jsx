import styled from 'styled-components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StepInput = styled.input`
  font-size: 2rem;
  width: 12rem;
  height: 3rem;
  border-radius: 5px;
  border: none;
  color: ${(props) => props.theme.stormGreen};
  padding: 0 1rem;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const RunButton = styled.button`
  padding: 0 1.5rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  height: 3rem;
  font-size: 1.75rem;
  margin-left: 1rem;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.stormGreen};
  color: ${(props) => props.theme.inverted};

  &:hover {
    background-color: ${(props) => props.theme.stormGreenHighlight};
  }
`

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 1.5rem;
  font-style: italic;
  margin-top: 2rem;
`