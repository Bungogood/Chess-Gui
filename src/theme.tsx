import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${ props => props.theme.backgroundColor };
    color: ${ props => props.theme.textColor };
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    lightColor: string;
    darkColor: string;
    backgroundColor: string;
  }
}

export const lightTheme: DefaultTheme = {
	textColor: "#363C49",
	primaryColor: "#FFFFFF",
	secondaryColor: "#cacaca",
	tertiaryColor: "#DBDEE1",
	lightColor: "#DBDEE1",
	darkColor: "#cacaca",
  backgroundColor: "#F9F9FA"
};

export const darkTheme: DefaultTheme = {
  textColor: "#ABABAB",
	primaryColor: "#111418",
	secondaryColor: "#191F24",
	tertiaryColor: "#232A31",
	lightColor: "#232A31",
	darkColor: "#191F24",
	backgroundColor: "#38434F"
};
