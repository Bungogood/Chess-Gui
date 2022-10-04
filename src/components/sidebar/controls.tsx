import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Match } from "../game";

type ControlsProps = {
  setGame: Dispatch<SetStateAction<Match>>
}

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit,minmax(4rem,1fr));
  grid-auto-flow: column;
`

const Button = styled.button`
  cursor: pointer;
  height: 30px;
  width: 70px;
  border-radius: 10px;
  border: none;
  margin-left: 5px;
  background-color: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.textColor};
`;

const Controls = ({ setGame }: ControlsProps) => {

  const undo = () => setGame(game => {
    const update = { ...game };
    let move = update.undo();
    if (move == null) return game;
    update.future.push(move);
    return update;
  });

  const redo = () => setGame(game => {
    const update = { ...game };
    let move = update.future.pop();
    if (move == null) return game;
    update.move(move);
    return update;
  });

  const first = () => setGame(game => {
    const update = { ...game };
    let move = update.undo();
    if (move == null) return game;
    while (move != null) {
      update.future.push(move);
      move = update.undo();
    }
    return update;
  });

  const last = () => setGame(game => {
    console.log(game.history());
    const update = { ...game };
    let move = update.future.pop();
    if (move == null) return game;
    while (move != null) {
      update.move(move);
      move = update.future.pop();
    }
    return update;
  });

  return (
    <Container>
      <Button onClick={first}>first</Button>
      <Button onClick={undo}>undo</Button>
      <Button onClick={redo}>redo</Button>
      <Button onClick={last}>last</Button>
    </Container>
  )
}

export default Controls;
