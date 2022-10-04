import styled from "styled-components";
import ThemeButton from "./themeButton";

const StyledHeader = styled.header`
  background-color: ${props => props.theme.secondaryColor};
  // position: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
  text-align: center;
`

export const Header = (props: any) => {
  return (
    <StyledHeader>
      <p>Bungogood</p>
      <ThemeButton {...props}/>
    </StyledHeader>
  );
}

export default Header;
