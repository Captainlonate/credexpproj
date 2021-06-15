// You have an integer and you want half of it, as an integer
export const halfInt = (number) => Math.floor(number / 2)

/*
  Imagine you have a range of values from value1 to value2,
  and you want to find the value that is some percentage
  along the spectrum.
  Example:
    10 ------- 20
    percent == 0.0 would return 10
    percent == 0.5 would return 15
    percent == 1.0 would return 20
*/
export const getValueBetween = (value1, value2, percent) => (
  value1 + ((value2 - value1) * percent)
)

export const twoDecimalPlaces = (num) => Math.round(num * 100) / 100