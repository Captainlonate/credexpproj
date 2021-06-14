import { halfInt } from '../../../../utils/numbers'

/*
  Takes the raw simulations results from the server, and processes
  them into the format needed to run a simulation (by the Simulator class)

  simulationResults is what comes back from the server
  It's expected to have these properties:
    {
      boardWidth: The the minimum dimension of the simulation board (which
        is a square, so this would be the length of all sides)
      initialDirection: The starting direction of the ants
      moves: An array of ints (0, 1, 2, 3). Each represents a direction
        which can be translated using the property 'directions'
      directions: An array of strings: ['U', 'R', 'D', 'L']. The ints from
        'moves' can be used as an index in 'directions' to understand which direction.
    }
*/
export const processNewSimulationResults = (simulationResults) => ({
  // The raw server response containing the simulation results
  simulationResults,
  // The processed simulation results intended for the Simulator class
  simulationData: {
    // The size of the board (number of units wide is same as tall, it's a square)
    boardWidth: simulationResults.boardWidth,
    // Transform each number (0,1,2,3) into the direction letter ('U','R','D','L')
    allMoves: simulationResults.moves.map((idx) => simulationResults.directions[idx]),
    // Make only one ant, and start it in the center of the board
    // If using multiple ants, it's important to make sure the board size is big enough
    // Maybe just make sure it's X units bigger, assuming it starts X units away
    // from the center
    ants: [{
      direction: simulationResults.directions[simulationResults.initialDirection],
      x: halfInt(simulationResults.boardWidth),
      y: halfInt(simulationResults.boardWidth)
    }]
  },
})
