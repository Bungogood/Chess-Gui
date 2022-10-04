import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.secondaryColor};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
`

export const Footer = () => {
  return (
    <StyledFooter>
      <p>Footer</p>
    </StyledFooter>
  );
}

export default Footer;
