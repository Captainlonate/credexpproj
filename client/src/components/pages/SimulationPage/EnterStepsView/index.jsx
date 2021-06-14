import { useState, useCallback } from 'react'
import { CenteredWithinContainer, SectionHeaderText } from '../common-styles'
import { isValidRange } from '../../../../utils/validation'
import {
  FormWrapper,
  InputWrapper,
  StepInput,
  RunButton,
  ErrorMessage
} from './styles'

// Used to validate the number field
const isValidStepValue = isValidRange(1, 20000)

/*
  The UI that the user sees when they are being prompted
  to enter a number and start running the simulation.
*/
const EnterStepsView = ({ onSubmit }) => {
  const [number, setNumber] = useState(1)
  const [errorMessage, setErrorMessage] = useState(null)

  const validateBeforeSubmit = useCallback(() => {
    if (isValidStepValue(number)) {
      setErrorMessage(null)
      onSubmit(number)
    } else {
      setErrorMessage('Must be between 1 and 20,000')
    }
  }, [number, setErrorMessage, onSubmit])

  return (
    <CenteredWithinContainer>
      <FormWrapper>
        <SectionHeaderText>Enter the number of steps to simulate (1 to 20,000)</SectionHeaderText>
        <InputWrapper>
          <StepInput
            type='number'
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          />
          <RunButton onClick={validateBeforeSubmit}>SIMULATE</RunButton>
        </InputWrapper>
        {
          errorMessage && (<ErrorMessage>{errorMessage}</ErrorMessage>)
        }
      </FormWrapper>
    </CenteredWithinContainer>
  )
}

export default EnterStepsView
