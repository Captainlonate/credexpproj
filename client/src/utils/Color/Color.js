class Color {
  constructor (red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  get rgb () {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }
}

export default Color