import TYPES from './ant-actions'
import { processNewSimulationResults } from './ant-utils'

/*
  The enum of possible user interfaces (views) for the SimulationPage
*/
export const VIEWS = {
  // The interface use to make the network request to get a new max steps
  SET_STEPS: 'SET_STEPS',
  // When waiting for the server to respond
  LOADING: 'LOADING',
  // When viewing the running simulation
  SIMULATION: 'SIMULATION',
}

/*
  Initial state of the reducer
*/
export const initialAntState = {
  activeView: VIEWS.SET_STEPS,
  simulationResults: null,
  simulationData: null,
}

const antReducer = (state, { type, payload }) => {
  switch (type) {
    case TYPES.CHANGE_VIEW:
      return {
        ...state,
        activeView: payload
      }
    case TYPES.UPDATE_SIMULATION_RESULTS:
      return {
        ...state,
        ...processNewSimulationResults(payload)
      }
    default:
      return state
  }
}

export default antReducer