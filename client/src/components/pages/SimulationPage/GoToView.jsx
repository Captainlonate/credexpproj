import { useCallback } from 'react'
import styled from 'styled-components'
import ACTION_TYPES from './state/ant-actions'
import { useAntContext } from './state/ant-context'

const ButtonWrapper = styled.button`
  border-radius: 5px;
  background-color: ${(props) => props.theme.stormGreen};
  color: white;
  padding: .5rem 1rem;
  border: none;
  cursor: pointer;
`

const GoToView = ({ view, text = 'Back' }) => {
  const [, dispatchAntState] = useAntContext()
  const goToView = useCallback(() => {
    dispatchAntState({ type: ACTION_TYPES.CHANGE_VIEW, payload: view })
  }, [dispatchAntState, view])

  return (
    <ButtonWrapper onClick={goToView}>&lt; {text}</ButtonWrapper>
  )
}

export default GoToView
