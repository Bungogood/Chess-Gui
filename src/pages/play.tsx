import { useState } from "react";
import { Chess } from "chess.js";
import { Header, Nav, Game, Match, Sidebar, Footer } from "../components"
import styled from "styled-components";

const Main = styled.main`
  margin-top: 10px;
  display: flex;
`;

export const Play = (props: any) => {  
  const [game, setGame] = useState<Match>({
    ...new Chess(),
    future: [],
    ai: true
  });

  return (
    <>
      <Header {...props}/>
      <Main>
        <Game game={game} setGame={setGame} />
        <Sidebar game={game} setGame={setGame} />
      </Main>
      <Footer/>
    </>
  );
}

export default Play;
