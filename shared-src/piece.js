export default class Piece {
  colour = 'White'
  type = 'King'
  currentSquare = { row: 1, column: 5 }
  validMoves = [ { row: 1, column: 4 }, { row: 1, column: 6 }, { row: 2, column: 4 }, { row: 2, column: 5 }, { row: 2, column: 6 } ]
}
