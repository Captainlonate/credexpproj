// Returns true if number is within the min/max range (inclusive)
export const isValidRange = (min, max) => (number) => (
  number >= min && number <= max
)
