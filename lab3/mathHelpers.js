//  FUNCTIONS

// Returns square of the number
const square = (number) => Math.pow(number, 2);

// Returns square root of the number
const squareRoot = (number) => Math.sqrt(number);

// Returns the distance between two points
const distance = (x1, y1, x2, y2) => squareRoot((square(x2 - x1)) + (square(y2 - y1)));

// EXPORT FUNCTIONS

module.exports = { distance };