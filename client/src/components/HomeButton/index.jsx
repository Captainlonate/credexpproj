import { useHistory } from "react-router-dom"
import { HomeButtonWrapper } from './styles'
import SvgShape from '../SvgShape'

// The SVG path to draw a house
const houseSvgPath = "M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z"

const HomeButton = () => {
  const history = useHistory()

  return (
    <HomeButtonWrapper onClick={() => void history.push("/")}>
      <SvgShape color='#ffffff' paths={[houseSvgPath]} />
    </HomeButtonWrapper>
  )
}

export default HomeButton
