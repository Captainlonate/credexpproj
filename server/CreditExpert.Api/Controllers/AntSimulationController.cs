using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CreditExpert.Dtos;

namespace CreditExpert.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AntSimulationController : ControllerBase
  {
    private readonly ILogger<AntSimulationController> _logger;

    public AntSimulationController(ILogger<AntSimulationController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    public SimulationResult Get(int steps = 100)
    {
      // Determine the initial board size
      int boardSize = AntSimulator.GetBoardSizeForSteps(steps);
      Console.WriteLine("Simulating {0} steps with a boardSize of {1}.", steps, boardSize);
      // Run the simulation
      AntSimulator simulator = new AntSimulator(boardSize: boardSize);
      simulator.Run(stepsToRun: steps);
      // Convert each Direction to integer
      int[] Moves = simulator.simulatedMoves.Select(value => (int) value).ToArray();
      // Give back the Simulation Results
      return new SimulationResult(){
        StepsSimulated = steps,
        BoardWidth = simulator.boardSize,
        InitialDirection = (int) Directions.Right,
        CompleteBoard = simulator.board,
        Moves = Moves
      };
    }
  }
}
