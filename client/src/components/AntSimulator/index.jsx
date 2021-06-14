import { useEffect, useRef } from 'react'
import Simulator from './simulator/Simulator'
import { Canvas, CanvasContainer } from './styles'

const AntSimulator = ({ simulationData }) => {
  // The <canvas> needs a ref to it's container so that it
  // can programmatically resize itself
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  // This will hold a single instance of a Simulator class
  const simulatorRef = useRef(null)
  
  useEffect(() => {
    if (!simulatorRef.current) {
      simulatorRef.current = new Simulator({
        container: containerRef.current,
        canvas: canvasRef.current
      })
    }

    return () => {
      // Remove any window eventlisteners (like resize)
      simulatorRef.current.cleanUp()
    }
  }, [])
  
  useEffect(() => {
    if (simulatorRef.current && simulationData) {
      simulatorRef.current.setSimulationData(simulationData)
      simulatorRef.current.start()
    }
  }, [simulationData])

  return (
    <CanvasContainer ref={containerRef}>
      <Canvas width='200' height='200' ref={canvasRef} />
    </CanvasContainer>
  )
}

export default AntSimulator
