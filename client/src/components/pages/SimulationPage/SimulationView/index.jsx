import { VIEWS } from '../state/ant-reducer'
import AntSimulator from '../../../AntSimulator'
import GoToView from '../GoToView'
import { useAntContext } from '../state/ant-context'
import {
  SimulationViewWrapper,
  BackButtonBar,
  CanvasSection
} from './styles'

const SimulationView = () => {
  const [antState] = useAntContext()

  return (
    <SimulationViewWrapper>
      <BackButtonBar>
        <GoToView view={VIEWS.SET_STEPS} text='Start Over' />
      </BackButtonBar>
      <CanvasSection>
        <AntSimulator simulationData={antState.simulationData} />
      </CanvasSection>
    </SimulationViewWrapper>
  )
}

export default SimulationView
