import { useEffect, useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { ChessInstance } from "chess.js";
import styled from 'styled-components';
import GameHistory from './gameHistory';
import Controls from './controls';
import { Match } from '../game';

type ChessboardProps = {
  game: Match
  setGame: Dispatch<SetStateAction<Match>>
};

const Text = styled.p`
  display: inline;
`

const Container = styled.div`
  background-color: ${props => props.theme.primaryColor};
  border-radius: 25px;
  text-align: center;
  padding: 25px 20px;
  flex: 1;
`

const Button = styled.button`
  cursor: pointer;
  height: 30px;
  width: 75px;   
  // border-radius: 20%;
  
  border-radius: 10px;
  border: none;
  margin-left: 5px;
  background-color: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.textColor};
  // transition: all .5s ease;
`;

const LoadButton = Button

export const Sidebar = ( props: ChessboardProps ) => {

  const { game, setGame } = props;

  const [ status, setStatus ] = useState("");
  const [ fen, setFen ] = useState(game.fen());
  const [ aiStatus, setAIStatus ] = useState("");

  useEffect(() => {setAIStatus(game.ai ? "On" : "Off")}, [game.ai])

  useEffect(() => {
    let newStatus = ''
    let moveColor = game.turn() === 'w' ? 'White' : 'Black'
    
    if (game.in_checkmate()) { // checkmate?
      newStatus = 'Game over, ' + moveColor + ' is in checkmate.'
    } else if (game.in_draw()) { // draw?
      newStatus = 'Game over, drawn position'
    } else { // game still on
      newStatus = moveColor + ' to move'
      if (game.in_check()) { // check?
        newStatus += ', ' + moveColor + ' is in check'
      }
    }
    setStatus(newStatus)
    setFen(game.fen())
  }, [game.fen()])

  const loadFen = () => setGame(game => {
    const output = { ...game };
    if (fen != game.fen() && output.load(fen)) return output;
    return game;
  });
  
  const toggleAI = () => setGame(game => ({
    ...game,
    ai: !game.ai
  }));

  return (
    <Container id="sidebar">
      <label>Status:</label>
      <Text>{status}</Text>
      <label>AI:</label>
      <Button onClick={toggleAI}>{aiStatus}</Button>
      <label>Fen:</label>
      <input type="text" value={fen} onChange={e => setFen(e.target.value)} />
      <LoadButton onClick={loadFen}>Load</LoadButton>
      <label>History:</label>
      <GameHistory game={game}/>
      <Controls setGame={setGame}/>
    </Container>
  );
}

export default Sidebar;
