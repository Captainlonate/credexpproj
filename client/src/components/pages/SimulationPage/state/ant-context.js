import { createContext, useContext, useReducer } from 'react'
import antReducer, { initialAntState } from './ant-reducer'

export const AntContext = createContext({})

// Access the data within the state using this hook
export const useAntContext = () => useContext(AntContext)

const AntProvider = ({ children }) => {
  return (
    <AntContext.Provider value={useReducer(antReducer, initialAntState)}>
      {children}
    </AntContext.Provider>
  )
}

export default AntProvider
