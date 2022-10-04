import { Match } from "../game";

type GameHistoryProps = {
  game: Match
};

/**
 * should be able to click to undo
 * 
 * on click undo to that move adding all to future
 */
const GameHistory = ( { game }: GameHistoryProps ) => {
  return (
    <p>{game.pgn().split(/\n/).pop()}</p>
  );
}

export default GameHistory;
