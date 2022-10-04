import { Dispatch, SetStateAction, useState } from 'react';
import { Chessboard } from "react-chessboard";
import { ChessInstance, ShortMove, Square } from 'chess.js'
import { useTheme } from 'styled-components'
import axios from 'axios';
import { Match } from './game';

export type ChessboardProps = {
  game: Match,
  setGame: Dispatch<SetStateAction<Match>>
  id?: number
};

const Board = ( props: ChessboardProps ) => {
  const theme = useTheme();

  const styles = {
    lightSquare: {
      backgroundColor:theme.lightColor
    },
    darkSquare: {
      backgroundColor:theme.darkColor
    }
  };
  
  const { game, setGame, id } = props;
  
  const [ squareStyles, setSquareStyles ] = useState({});

  const make_move = (move: ShortMove) => setGame(game => {
    const update = { ...game };
    console.log(move);
    update.move(move);
    update.future = [];
    return update;
  })

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length); 
    setGame(game => {
      const output: Match = { ...game };
      output.move(possibleMoves[randomIndex]);
      return output;
    });
  }

  function callAPI() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    
    // let data: { move: string};
    let move: any // { from_square: number, to_square: number }
    axios.post("/api/make_move", {
      "fen": game.fen()
    })
    .then(res => make_move(res.data.move))
    /*
    safeGameMutate((game: ChessInstance) => {
      game.move(data.move);
    });
    */
  }

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    let move: ShortMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    }
    
    let valid = game.move(move);

    if (valid === null) return false; // illegal move
    make_move(move);
    setSquareStyles({})
    // if (game.ai) setTimeout(callAPI, 200);
    // if game not over make ai move
    return true;
  }

  const removeHighlightSquare = (sourceSquare: Square) => {
    setSquareStyles({})
  }

  const highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) => {
    let highlightStyles = [...squaresToHighlight].reduce(
      (prev, sq) => {
        return {
          ...prev,
          ...{
            [sq]: {
              background:
                "radial-gradient(circle, #000000 25%, transparent 30%)",
              borderRadius: "25%"
            }
          }
        };
      },
      {}
    );

    setSquareStyles({ ...highlightStyles }) // ...squareStyles, 
  };

  const onMouseOverSquare = (square: Square) => {
    // get list of possible moves for this square
    let moves = game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight : Square[] = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };

  const onMouseOutSquare = (square: Square) => removeHighlightSquare(square);

  return <Chessboard
    id={id}
    position={game.fen()}
    onPieceDrop={onDrop}
    customSquareStyles={squareStyles}
    onMouseOverSquare={onMouseOverSquare}
    onMouseOutSquare={onMouseOutSquare}
    boardWidth={400}
    customDarkSquareStyle={styles.darkSquare}
    customLightSquareStyle={styles.lightSquare}
    boardOrientation="white"
    /*
    width={320}
    dropSquareStyle={dropSquareStyle}
    onDragOverSquare={onDragOverSquare}
    onSquareClick={onSquareClick}
    onSquareRightClick={onSquareRightClick}
    */
  />;
}

export default Board;
