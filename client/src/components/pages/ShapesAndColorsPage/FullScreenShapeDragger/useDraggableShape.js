import { useState, useEffect, useRef } from 'react'

/*
  A hook that contains all of the logic for dragging a shape, and
  calculating the distance it's traveled from the center of the window.
*/
const useDraggableShape = () => {
  const shapeRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0, distance: 0 })
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const onMouseMove = (e) => {
    if (dragging && shapeRef.current)  {
      const shapeBounds = shapeRef.current.getBoundingClientRect()
      // Option 1) Using the closest edge
      // const shapeX = (e.pageX < centerX) ? shapeBounds.left : shapeBounds.right
      // const shapeY = (e.pageY < centerY) ? shapeBounds.top : shapeBounds.bottom
      // Option 2) Using the center of the shape
      const shapeX = shapeBounds.left + (shapeBounds.width / 2)
      const shapeY = shapeBounds.top + (shapeBounds.height / 2)
      // Determine how close the shape is to a corner (furthest point from center)
      const percentX = Math.abs(shapeX - centerX) / centerX
      const percentY = Math.abs(shapeY - centerY) / centerY
      const percentToCorner = (percentX + percentY) / 2
      // Update the position and distance of the shape
      setPosition({
        x: e.pageX - (shapeBounds.width / 2),
        y: e.pageY - (shapeBounds.height / 2),
        distance: Math.min(Math.max(0, percentToCorner), 1)
      })
    }
  }

  useEffect(() => {
    // Position the shape in the center of the screen to start
    const shapeBounds = shapeRef.current.getBoundingClientRect()
    console.log(shapeRef.current, shapeBounds, (window.innerWidth / 2) - (shapeBounds.width / 2))
    setPosition({
      x: (window.innerWidth / 2) - (shapeBounds.width / 2),
      y: (window.innerHeight / 2) - (shapeBounds.height / 2),
      distance: 0
    })
  }, [])

  console.log(position)

  return {
    // Need to assign this to a dom element
    shapeRef,
    // The shape's position and % distance traveled (0 to 1.0)
    position,
    // Accepts true or false, whether or not to respond to mouse move events
    setDragging,
    // Bind to onMouseMove of the element with the shapeRef
    onMouseMove
  }
}

export default useDraggableShape
