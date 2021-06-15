import { useState, useEffect } from 'react'
import { getAllColors } from '../colors'
import { getAllShapes } from '../shapes'

// Higher Order Component that provides the child with shapes
// and colors after making a network request to get them
const withColorsAndShapes = (WrappedComponent) => (props) => {
  const [data, setData] = useState({
    shapes: null,
    colors: null,
    fetching: true,
    error: null
  })

  useEffect(() => {
    const getData = async () => {
      const colorResults = await getAllColors()
      const shapeResults = await getAllShapes()

      if (colorResults.error) {
        setData({ ...data, error: colorResults.error })
      } else if (shapeResults.error) {
        setData({ ...data, error: shapeResults.error })
      } else {
        setData({
          shapes: shapeResults.data,
          colors: colorResults.data,
          fetching: false,
          error: null
        })
      }
    }

    getData()
  }, [])

  return (
    <WrappedComponent {...props} {...data} />
  )
}

export default withColorsAndShapes
