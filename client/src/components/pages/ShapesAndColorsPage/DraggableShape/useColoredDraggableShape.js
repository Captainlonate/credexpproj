import { useState, useEffect, useRef } from 'react'

const useColoredDraggableShape = () => {
  const shapeRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0, distance: 0 })
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const onMouseMove = (e) => {
    if (dragging && shapeRef.current)  {
      // Which edge of the shape should be considered
      const shapeBounds = shapeRef.current.getBoundingClientRect()
      // console.log(shapeRef.current.getBoundingClientRect())
      const shapeX = (e.pageX < centerX) ? shapeBounds.left : shapeBounds.right
      const shapeY = (e.pageY < centerY) ? shapeBounds.top : shapeBounds.bottom
      //
      const percentX = Math.abs(shapeX - centerX) / centerX
      const percentY = Math.abs(shapeY - centerY) / centerY
      const percentToCorner = (percentX + percentY) / 2
      setPosition({
        x: e.pageX - (shapeBounds.width / 2),
        y: e.pageY - (shapeBounds.height / 2),
        distance: Math.min(Math.max(0, percentToCorner), 1)
      })
    }
  }

  useEffect(() => {
    // 
    const shapeBounds = shapeRef.current.getBoundingClientRect()
    setPosition({
      x: (window.innerWidth / 2) - (shapeBounds.width / 2),
      y: (window.innerHeight / 2) - (shapeBounds.height / 2),
      distance: 0
    })
  }, [])

  return {
    shapeRef,
    dragging,
    position,
    setDragging,
    setPosition,
    onMouseMove
  }
}

export default useColoredDraggableShape
