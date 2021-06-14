import SimulationPage from '../pages/SimulationPage'
import HomePage from '../pages/HomePage'
import ShapesAndColorsPage from '../pages/ShapesAndColorsPage'
import { Switch, Route, Redirect } from 'react-router-dom'

export const RouteUrls = {
  shapes: '/shapes',
  simulation: '/simulation',
  home: '/'
}

const Routes = () => {
  return (
    <Switch>
      <Route exact path={RouteUrls.shapes}>
        <ShapesAndColorsPage />
      </Route>
      <Route exact path={RouteUrls.simulation}>
        <SimulationPage />
      </Route>
      <Route exact path={RouteUrls.home}>
        <HomePage />
      </Route>
      <Redirect to={RouteUrls.home} />
    </Switch>
  )
}

export default Routes