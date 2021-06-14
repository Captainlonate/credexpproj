import theme from '../../theme/theme'
import { ThemeProvider } from 'styled-components'
import Routes from '../Routes'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
  <Routes />
)

const AppWithTheme = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)

export default AppWithTheme
