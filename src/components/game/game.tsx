import { Dispatch, SetStateAction } from 'react';
import { ChessInstance, Move } from "chess.js";
import Board, { ChessboardProps } from './board';
import styled from 'styled-components';

export interface Match extends ChessInstance {
  future: Move[];
  ai: boolean;
}

const Container = styled.div`
  text-align: center;
  padding: 25px 25px;
  flex: 1;
`

export const Game = ( props: ChessboardProps ) => {

  const { game, setGame } = props;

  return (
    <Container id="game">
      <Board game={game} setGame={setGame} />
    </Container>
  );
}

export default Game;
