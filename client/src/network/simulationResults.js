/*
  Make a network request to the server to fetch some simulation results.
  The endpoint expects ?steps=<number>, which is how many moves the ant
  makes during the simulation.

  The server should return:
  {
    boardWidth: number - size of the grid,
    completeBoard: Array of arrays, of either 0 or 1
      0 means white, 1 means black
    directions: ['U', 'R', 'D', 'L']
    moves: [2, 3, 0, 1, 0, ...] Array of ints, moves that represent
      directions. Each is an index within 'directions' array.
    stepsSimulated: number - should be the same as what was passed to
      the server in the parameter ?steps=<number>
  }

  returns {
    data: null or the object described above if no error,
    error: Null or a string if there was an error
  }
*/
export const getSimulationResults = async (stepCount) => {
  let results = { data: null, error: null }

  try {
    const serverResponse = await fetch(`${process.env.REACT_APP_API_URL}?steps=${stepCount}`)
    results.data = await serverResponse.json()
  } catch (ex) {
    console.log('Could not fetch simulation results', ex.message)
    results.error = ex.message
  }

  return results
}