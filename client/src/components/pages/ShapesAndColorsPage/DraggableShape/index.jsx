import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { DraggableArea } from './styles'
import { getValueBetween } from '../../../../utils/numbers'

const Square = styled.div`
  width: 10rem;
  height: 10rem;
  cursor: pointer;
`

const getColorDuringTransition = (color1, color2, percent) => (
  new Color(
    getValueBetween(color1.red, color2.red, percent),
    getValueBetween(color1.green, color2.green, percent),
    getValueBetween(color1.blue, color2.blue, percent),
  )
)

class Color {
  constructor (red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  get color () {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

const DraggableShape = () => {
  const shapeRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0, distance: 0 })
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  const color = getColorDuringTransition(new Color(255, 0, 0), new Color(0, 0, 255), position.distance)

  useEffect(() => {
    // 
    const shapeBounds = shapeRef.current.getBoundingClientRect()
    setPosition({
      x: (window.innerWidth / 2) - (shapeBounds.width / 2),
      y: (window.innerHeight / 2) - (shapeBounds.height / 2),
      distance: 0
    })
  }, [])

  return (
    <DraggableArea
      onMouseUp={() => void setDragging(false)}
      onMouseMove={(e) => {
        if (dragging)  {
          // Which edge of the shape should be considered
          const shapeBounds = shapeRef.current.getBoundingClientRect()
          console.log(shapeRef.current.getBoundingClientRect())
          const shapeX = (e.pageX < centerX) ? shapeBounds.left : shapeBounds.right
          const shapeY = (e.pageY < centerY) ? shapeBounds.top : shapeBounds.bottom
          //
          const percentX = Math.abs(shapeX - centerX) / centerX
          const percentY = Math.abs(shapeY - centerY) / centerY
          const percentToCorner = (percentX + percentY) / 2
          setPosition({
            x: e.pageX - (shapeBounds.width / 2),
            y: e.pageY - (shapeBounds.height / 2),
            distance: percentToCorner
          })
        }
      }}
    >
      <Square
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          backgroundColor: color.color
        }}
        onMouseDown={() => void setDragging(true)}
        ref={shapeRef}
      />
    </DraggableArea>
  )
}

export default DraggableShape
