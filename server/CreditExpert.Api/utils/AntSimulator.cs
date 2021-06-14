using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CreditExpert.Dtos;

namespace CreditExpert.Api
{
  public enum Directions
  {
    Up = 0,
    Right,
    Down,
    Left
  }

  public static class BoardColor
  {
    public const int BLACK = 1;
    public const int WHITE = 0;
  }

  public class Ant
  {
    public int x { get; set; }
    public int y { get; set; }
    public Directions direction { get; set; }

    public Ant(int x = 0, int y = 0)
    {
      this.x = x;
      this.y = y;
      this.direction = Directions.Right;
    }
  }

  public class AntSimulator
  {
    public int boardSize { get; set; }
    public Directions[] directions { get; set; }
    public int[][] board { get; set; }
    public List<Directions> simulatedMoves { get; set; }

    public AntSimulator(int boardSize = 25)
    {
      this.directions = new Directions[]{
        Directions.Up,
        Directions.Right,
        Directions.Down,
        Directions.Left
      };
      this.simulatedMoves = new List<Directions>();
      // The board's width & height must be odd, so that there is a perfect center square
      this.boardSize = ((boardSize % 2) == 0) ? boardSize + 1 : boardSize;
      // Initialize the board with all white
      this.board = new int[this.boardSize][];
      for (int rowIdx = 0; rowIdx < this.boardSize; rowIdx++) {
        this.board[rowIdx] = new int[this.boardSize];
        for (int colIdx = 0; colIdx < this.boardSize; colIdx++) {
          this.board[rowIdx][colIdx] = BoardColor.WHITE;
        } 
      }
    }

    private Directions RotateLeft(Directions currentDirection)
    {
      int currentDirectionInt = (int) currentDirection;

      if (currentDirectionInt - 1 < 0) {
        return this.directions[this.directions.Length - 1];
      }

      return this.directions[currentDirectionInt - 1];
    }

    private Directions RotateRight(Directions currentDirection)
    {
      int currentDirectionInt = (int) currentDirection;
  
      if (currentDirectionInt + 1 >= this.directions.Length) {
        return this.directions[0];
      }

      return this.directions[currentDirectionInt + 1];
    }

    private (int deltaX, int deltaY) MoveForward(Directions currentDirection)
    {
      switch (currentDirection)
      {
        case Directions.Up:
          return (0, -1);
        case Directions.Right:
          return (1, 0);
        case Directions.Down:
          return (0, 1);
        case Directions.Left:
          return (-1, 0);
        default:
          return (0, 0);
      }
    }

    public void Run(int stepsToRun)
    {
      // The ant will begin at the center of the board (the board is a square x-by-x)
      int centerOfBoard = Convert.ToInt32(Math.Floor((double) this.boardSize / 2.0));

      // ant will help keep track of the ant's location and direction at any point
      Ant ant = new Ant(centerOfBoard, centerOfBoard);

      for (int stepIdx = 0; stepIdx < stepsToRun; stepIdx++) {
        // Figure out what color the cell originally was (before flipping and moving the ant)
        bool cellWasWhite = this.board[ant.y][ant.x] == BoardColor.WHITE;

        // Flip the color of the square the ant is currently standing on
        this.board[ant.y][ant.x] = cellWasWhite ? BoardColor.BLACK : BoardColor.WHITE;

        // Rotate the ant either clockwise or counter-clockwise
        if (cellWasWhite) {
          ant.direction = RotateRight(ant.direction);
        } else {
          ant.direction = RotateLeft(ant.direction);
        }

        // Move the ant "forward" (based on it's current direction)
        (int deltaX, int deltaY) = MoveForward(ant.direction);
        ant.x += deltaX;
        ant.y += deltaY;

        // Keep track of every move the ant makes by storing what direction
        // the ant moved this time
        this.simulatedMoves.Add(ant.direction);
      }
    }

    public void DumpToConsole()
    {
      for (int rowIdx = 0; rowIdx < this.boardSize; rowIdx++) {
        Console.Write("[");
        for (int colIdx = 0; colIdx < this.boardSize; colIdx++) {
          Console.Write(this.board[rowIdx][colIdx] == BoardColor.WHITE ? "W, " : "B, ");
        } 
        Console.Write("],\n");
      }
    }
    
    /*
      The board size must be large enough to contain all the moves the ant makes
      Yet, small enough to remain easy to view (500x500 grid would be very small)
      This is based on the # of steps to simulate.
      The board size really seems to increase fast after 10,000 or so.
      Maybe there is a formula for this?
    */
    public static int GetBoardSizeForSteps(int stepsToRun)
    {
      int boardSize = 0;

      if (stepsToRun <= 100) {
        boardSize = 9;
      } else if (stepsToRun <= 250) {
        boardSize = 15;
      } else if (stepsToRun <= 1200) {
        boardSize = 25;
      } else if (stepsToRun <= 2000) {
        boardSize = 35;
      } else if (stepsToRun <= 5000) {
        boardSize = 51;
      } else if (stepsToRun <= 10000) {
        boardSize = 61;
      } else if (stepsToRun <= 12000) {
        boardSize = 121;
      } else if (stepsToRun <= 13000) {
        boardSize = 151;
      } else if (stepsToRun <= 20000) {
        boardSize = 500;
      } else {
        throw new Exception("Steps to run may not exceed 20,000");
      }

      return boardSize;
    }
  }
}