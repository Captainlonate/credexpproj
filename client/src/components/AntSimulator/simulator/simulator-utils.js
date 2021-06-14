/*
  Create an empty board which defaults all of the cells to false
  The reason for 'false', is because the server returns a completeBoard,
  which also uses the notation:
    false = white
    true = black
  Such that a cell which is true, should be colored 'black'
*/
export const makeEmptyBoard = ({ boardWidth = 10 }) => (
  [...new Array(boardWidth)].map(() => [...new Array(boardWidth)].fill(false))
)

/*
  Helper function for moving an ant based on the direction
  For instance, if the ant should move "Up" ('U'):
    moveAnt['U'](antObject)
    Will result in the antObject.y value being decreased
  The server gives directions back as single letters (U, R, D, L),
  which is the reason for the keys in thsi object.
*/
export const moveAnt = {
  U: (ant) => ant.y--,
  R: (ant) => ant.x++,
  D: (ant) => ant.y++,
  L: (ant) => ant.x--,
}

/*
  Calculate how often a frame should be updated if the goal is to
  iterate through 'numberOfFrames' over an 'idealDuration' amount of ms.
  However, don't let the numbers get too crazy. Therefor, prevent
  the speed from being faster than 'maxPerSec', or slower than 'minPerSec'.
  If this is the case, the speed will be clipped by these bounds.
*/
export const calculateSpeedWithinBounds = (numberOfFrames, maxPerSec = 60, minPerSec = 2, idealDuration = 10000) => {
  const idealSpeed = idealDuration / numberOfFrames
  return Math.max(
    (1000 / maxPerSec), // Not too fast
    Math.min((1000 / minPerSec), idealSpeed) // Not too slow
  )
}