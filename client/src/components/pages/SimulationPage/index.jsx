import { SimulationPageWrapper, } from './common-styles'
import AntProvider, { useAntContext } from './state/ant-context'
import ACTION_TYPES from './state/ant-actions'
import { VIEWS } from './state/ant-reducer'
import LoadingView from './LoadingView'
import EnterStepsView from './EnterStepsView/index'
import SimulationView from './SimulationView/index'
import { getSimulationResults } from '../../../network/simulationResults'

const SimulationPage = () => {
  const [antState, dispatchAntState] = useAntContext()

  const handleSubmitSteps = async (newMax) => {
    // First, change to the loading view
    dispatchAntState({ type: ACTION_TYPES.CHANGE_VIEW, payload: VIEWS.LOADING })
    // Make the network request to run and fetch the simulation results from the server
    const simulationResults = await getSimulationResults(newMax)
    // Once the server responds, check for an error
    if (simulationResults.error) {
      console.log('There was an error fetching the results.', simulationResults.error)
      dispatchAntState({ type: ACTION_TYPES.CHANGE_VIEW, payload: VIEWS.SET_STEPS })
    } else {
      // Store and process the new simulation results
      dispatchAntState({ type: ACTION_TYPES.UPDATE_SIMULATION_RESULTS, payload: simulationResults.data })
      // Then, change to the Simulation Runner View (to begin running the simulation)
      dispatchAntState({ type: ACTION_TYPES.CHANGE_VIEW, payload: VIEWS.SIMULATION })
    }
  }

  return (
    <SimulationPageWrapper>
      {
        (antState.activeView === VIEWS.SET_STEPS) && (
          <EnterStepsView onSubmit={handleSubmitSteps} />
        )
      }
      {
        (antState.activeView === VIEWS.LOADING) && (
          <LoadingView text='Fetching Simulation Results...' />
        )
      }
      {
        (antState.activeView === VIEWS.SIMULATION) && (<SimulationView />)
      }
    </SimulationPageWrapper>
  )
}

const SimulationPageWithState = () => (
  <AntProvider>
    <SimulationPage />
  </AntProvider>
)

export default SimulationPageWithState
