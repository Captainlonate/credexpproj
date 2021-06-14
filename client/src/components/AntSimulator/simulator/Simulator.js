import {
  moveAnt,
  makeEmptyBoard,
  calculateSpeedWithinBounds
} from './simulator-utils'
import Timer from './Timer'

const BLACK = '#000000'
const WHITE = '#ffffff'
const RED = '#ff0000'
const LINES = '#00a67d'

class BoardDrawer {
  constructor ({ canvas, container }) {
    // DOM Elements
    this.container = container
    this.canvas = canvas
    this._ctx = canvas.getContext('2d')
    // Simulation Logic
    this.resetLogic()
    // Animation and Execution
    this.timer = new Timer(5)
    this.resetTime()
    this.running = false
    // Resizing the canvas
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  // Reset all the values that have something to do with the board, ants,
  // moves, steps, etc. This is useful for restarting with new results
  resetLogic = () => {
    this.board = null
    this.boardSize = 0
    this.currentStep = 0
    this.totalSteps = 0
    this.ants = []
    this.moveList = []
  }

  // Reset all the values that have something to do with timers or animations
  resetTime = () => {
    this.deltaTime = 0
    this.timeLastUpdate = 0
    this.timer.reset()
  }

  // After calling setSimulationData() to initialize the simulation,
  // then call start() to kick off the simulation animations
  start = () => {
    this.running = true
    this.resetTime()
    this.loopIfRunning(0)
  }

  /*
    This is the infinite animation loop that is in charge of
    these things:
      1) Keeping track of how much time has passed
      2) Updating the ants positions, and redrawing the board
        if enough time has passed
      3) Keeping this loop running, as long as there is more
        to do
  */
  loopIfRunning = (timestamp) => {
    if (this.running) {
      // How much time has passed
      this.deltaTime = timestamp - this.timeLastUpdate
      this.timeLastUpdate = timestamp

      // Has enough time passed to update the board again
      if (this.timer.updateAndCheck(this.deltaTime)) {
        this.updateCellsAndAnts()
        this.drawAnts()
        this.drawGridLines()
        this.drawStepCount()
      }

      window.requestAnimationFrame(this.loopIfRunning)
    }
  }

  /*
    This will be called after enough time has passed.
    update() is in charge of flipping tiles, moving ants,
    and stopping the loop if all the steps have been completed
  */
  updateCellsAndAnts = () => {
    for (let ant of this.ants) {
      // Flip the tile
      this.board[ant.y][ant.x] = !this.board[ant.y][ant.x]
      // Draw just that one tile (no need to draw the entire board again)
      this.drawOneCell(ant.x, ant.y)
      // Move the ant
      const nextDirection = this.moveList[this.currentStep]
      moveAnt[nextDirection](ant)
    }

    // Check if done animating
    this.currentStep++
    if (this.currentStep >= this.totalSteps) {
      this.resetTime()
      this.running = false
    }
  }

  /*
    setSimulationData is used to initialize the Simulator class
    before running the simulation. All of the required data
    that the simulation needs to run should be passed in.
    Example:
      simulationData = {
        ants: [{ x, y, direction }, ...],
        boardWidth: 50, 
        allMoves: ['D', 'L', ...],
      }
  */
  setSimulationData = (simulationData) => {
    this.resetLogic()
    this.resetTime()
    this.running = false

    this.ants = simulationData.ants.map(({ x, y, direction }) => ({ x, y, direction }))
    this.board = makeEmptyBoard({ boardWidth: simulationData.boardWidth })
    this.boardSize = simulationData.boardWidth
    this.totalSteps = simulationData.allMoves.length
    this.moveList = [...simulationData.allMoves]

    // Determine how fast the steps should run
    const speed = calculateSpeedWithinBounds(this.moveList.length, 60, 3, 10000)
    this.timer.setDuration(speed)

    this.handleResize()
  }

  /*
    This will be called by the animation loop, or when
    a resize event occurs. It does not change the state
    of anything. It simply draws the canvas according to
    the current state.
    Three things must be drawn:
      1) The board, with the white and black squares
      2) The ants, wherever they are in whatever direction
      3) The grid lines
      4) The text for the current step count
  */
  clearAndDrawEverything = () => {
    this.clearCanvas()

    // Only draw anything if there is a board to draw
    if (this.board) {
      this.drawBoard()
      this.drawAnts()
      this.drawGridLines()
      this.drawStepCount()
    }
  }

  // Clear the canvas with the background color
  clearCanvas = () => {
    this._ctx.fillStyle = WHITE
    this._ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  // Draws the black and white squares of the board, on the canvas
  drawBoard = () => {
    for (let yIdx = 0; yIdx < this.board.length; yIdx++) {
      for (let xIdx = 0; xIdx < this.board[yIdx].length; xIdx++) {
        this.drawOneCell(xIdx, yIdx)
      }
    }
  }

  drawOneCell = (xIdx, yIdx) => {
    this._ctx.fillStyle = (this.board[yIdx][xIdx]) ? BLACK : WHITE
    this._ctx.fillRect(
      this.cellSize * xIdx,
      this.cellSize * yIdx,
      this.cellSize,
      this.cellSize
    )
  }

  // Draws the ants on the canvas
  drawAnts = () => {
    this._ctx.fillStyle = RED
    for (const ant of this.ants) {
      this._ctx.fillRect(
        (this.cellSize * ant.x) + (this.cellSize * 0.1),
        (this.cellSize * ant.y) + (this.cellSize * 0.1),
        this.cellSize * 0.8,
        this.cellSize * 0.8
      )
    }
  }

  // Draws the grid lines, on the canvas
  drawGridLines = () => {
    // If the cell size is too small, then the grid lines will literally
    // just fill the grid and it will be one solid color
    // In that case, just don't draw grid lines unless there is enough room.
    if (this.cellSize < 6) {
      return
    }
    // If the cells are still pretty small, then use white lines so it's not distracting
    // But if the cells are huge, the big white cells need to be separated with a color
    this._ctx.strokeStyle = (this.cellSize < 12) ? WHITE : LINES
    this._ctx.lineWidth = 1
    this._ctx.beginPath()
    // this._ctx.strokeStyle = WHITE
    for (let rowIdx = 0; rowIdx <= this.board.length; rowIdx++) {
      // Horizontal Lines
      this._ctx.moveTo(0, this.cellSize * rowIdx)
      this._ctx.lineTo(this.canvasWidth, this.cellSize * rowIdx)
      // Vertical Lines
      this._ctx.moveTo(this.cellSize * rowIdx, 0)
      this._ctx.lineTo(this.cellSize * rowIdx, this.canvasHeight)
    }
    this._ctx.stroke()
  }

  // Draw the step counter text at the top left
  drawStepCount = () => {
    // Draw the colored square behind the text
    const text = `${this.currentStep} / ${this.totalSteps}`
    this._ctx.fillStyle = '#666666'
    this._ctx.fillRect(
      0,
      0,
      this._ctx.measureText(text).width * 2,
      this.textFontSize * 2
    )
    // Draw the text
    this._ctx.font = `${this.textFontSize}px Arial`
    this._ctx.fillStyle = RED
    this._ctx.textAlign = 'left'
    this._ctx.textBaseline = 'top'
    this._ctx.fillText(
      text,
      this.textOffset,
      this.textOffset
    )
  }

  // Invoked when a window resize event occurs
  handleResize = () => {
    this.calculateAndResizeCanvas()
    this.clearAndDrawEverything()
  }

  /*
    Contains all of the logic and math for sizing and positioning the
    canvas, as well as the visible area within the canvas.
    The visible area is the 'board', and it is a square (even sides).
    The sections using devicePixelRatio and _ctx.scale() are intended
    for making the canvas appear sharper, on higher resolution displays.
    This function is also responsible for calculating how many pixels
    each grid cell should take up.
  */
  calculateAndResizeCanvas = () => {
    const { width: containerWidth, height: containerHeight } = this.container.getBoundingClientRect()

    // The canvas will be a square. It's constrained by the size of it's container element.
    // If the container is wide, then it will fill the height, or visa versa.
    let smallestContainerSide = Math.floor(Math.min(containerWidth, containerHeight))

    if (this.board) {
      this.cellSize = Math.floor(smallestContainerSide / this.boardSize)
      smallestContainerSide = (this.cellSize * this.boardSize)
    }

    this.canvasWidth = smallestContainerSide
    this.canvasHeight = smallestContainerSide

    // Consider the devicePixelRatio to fix high resolution displays
    this.canvas.width = smallestContainerSide * window.devicePixelRatio
    this.canvas.height = smallestContainerSide * window.devicePixelRatio

    this.canvas.style.width = smallestContainerSide + 'px'
    this.canvas.style.height = smallestContainerSide + 'px'

    this.textOffset = this.canvasWidth * 0.01
    this.textFontSize = this.canvasWidth * 0.02

    // Need to scale the canvas back up
    this._ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  /*
    If this Simulator class needs to be "deleted" or removed, it's not
    enough to simply let it be garbage collected.
    This class attaches an eventListener to the window, which will never
    go away until it's removed here. Also, the infinite loop will not
    stop running, since the function invokes itself forever, as long
    as this.running is true.
    So be sure to call this when it's time to stop using the Simulator.
    (Such as the return function of useEffect(), or componentWillUnmount)
  */
  cleanUp = () => {
    this.running = false
    window.removeEventListener('resize', this.handleResize)
  }
}

export default BoardDrawer
