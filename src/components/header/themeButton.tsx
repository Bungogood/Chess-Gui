import styled from "styled-components";
import { darkTheme, lightTheme } from "../../theme";
import { ReactComponent as Sun } from '../../icons/sun.svg'

const Toggle = styled.button`
    cursor: pointer;
    border: none;
    background-color: ${props => props.theme.secondaryColor};
    float: right;
    &:focus {
        outline: none;
    }
    svg {
      fill: ${props => props.theme.textColor};
    }
`;

const ThemeButton = (props: any) => {

  const changeTheme = () => props.setTheme(props.theme === lightTheme ? darkTheme : lightTheme);
  
  const icon = <Sun/>;

  return (
    <Toggle onClick={changeTheme}>
      {icon}
    </Toggle>
  )
}

export default ThemeButton;