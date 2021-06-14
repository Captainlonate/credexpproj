/*
  The purpose of Timer is to keep track of an accumulated time
  value (this.counter), and each time counter is updated, check
  if it has exceeded some threshold time (this.duration).

  Example:
    const t = new Timer({ duration: 100 })
    t.updateAndCheck(40) // false, counter is 40, out of 100
    t.updateAndCheck(40) // false, counter is 80, out of 100
    t.updateAndCheck(40) // true, and counter resets to 0
*/
class Timer {
  constructor (movesPerSecond = 1) {
    this.counter = 0
    this.duration = SECOND / movesPerSecond
  }

  updateAndCheck (deltaTime) {
    this.counter += deltaTime
    if (this.counter > this.duration) {
      this.counter = 0
      return true
    }
    return false
  }

  setDuration (newDuration) {
    this.duration = newDuration
  }

  reset () {
    this.counter = 0
  }
}

// number of ms in a second
export const SECOND = 1000

export default Timer