using System;
using System.Collections.Generic;

namespace CreditExpert.Dtos
{
    public class SimulationResult
    {
      // The entire width or height of the board (diameter)
      public int BoardWidth { get; set; }
      // How many steps were simulated
      public int StepsSimulated { get; set; }
      // The Ant's initial direction
      public int InitialDirection { get; set; }
      // An ordered list of every direction the ant moved
      public int[] Moves { get; set; }
      // A mapping of direction (as an int) to direction (as a string)
      // 0 = "U", 1 = "R", 2 = "D", 3 = "L"
      public string[] Directions { get; set; }
      // The final completed board after all steps have been simulated
      public int[][] CompleteBoard { get; set; }

      public SimulationResult()
      {
        this.BoardWidth = 0;
        this.StepsSimulated = 0;
        // Initially start at direction 1 (which is "R" within this.Directions)
        this.InitialDirection = 1;
        this.Directions = new string[]{ "U", "R", "D", "L" };
        this.Moves = new int[0];
        this.CompleteBoard = null;
      }
    }
}
