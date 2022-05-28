// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js


// const { Chess } = require("./chess")

startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

var state = {
  game: new Chess(),
  board: null
}

// var board = null
// var game = new Chess()
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

function updateStatus () {
  var status = ''

  var moveColor = state.game.turn() === 'w' ? 'White' : 'Black'

  if (state.game.in_checkmate()) { // checkmate?
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  } else if (state.game.in_draw()) { // draw?
    status = 'Game over, drawn position'
  } else { // game still on
    status = moveColor + ' to move'
    if (state.game.in_check()) { // check?
      status += ', ' + moveColor + ' is in check'
    }
   }

  $status.html(status)
  $pgn.html(state.game.pgn().split(/\n/).pop())
  $fen.val(state.game.fen())
}


function removeGreySquares () {
  $('#myBoard .square-55d63').css('background', '')
}

function greySquare (square) {
  var $square = $('#myBoard .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

function onDragStart (source, piece) {
  // do not pick up pieces if the game is over
  if (state.game.game_over()) return false

  // or if it's not that side's turn
  if ((state.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (state.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  removeGreySquares()

  // see if the move is legal
  var move = make_move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  /*
  var move = state.game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  */

  // illegal move
  if (move === null) return 'snapback'

  $.post('make_move', {"fen": state.game.fen()}, (data) => {console.log(data); make_move(data.move)})
}

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  var moves = state.game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the square they moused over
  greySquare(square)

  // highlight the possible squares for this piece
  for (const move of moves){
    greySquare(move.to)
  }
}

function onMouseoutSquare (square, piece) {
  removeGreySquares()
}

function onSnapEnd () {
  state.board.position(state.game.fen())
}

function make_move(move) {
  var out = state.game.move(move, { sloppy: true });
  state.board.position(state.game.fen())
  updateStatus()
  return out;
}

function reset(fen) {
  state.board.position(fen)
  state.game.load(fen)
  console.log(state.game.validate_fen(fen), fen)
  updateStatus()
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
}
state.board = Chessboard('myBoard', config)
// $('#startBtn').on('click', board.start)
$('#startBtn').on('click', () => reset(startFen))
$('#clearBtn').on('click', () => reset($fen.val()))
reset(startFen)
