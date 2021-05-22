import React from "react";
import styled from "styled-components";

const Nav = () => (
  //   Always use nav css, except when scrolling 100px down we want the black__navbar class
  <Container>
    <Logo
      src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
      alt="Netflix Logo"
    />
    <Avatar
      src="http://pngimg.com/uploads/netflix/netflix_PNG8.png"
      alt="Netflix Avatar"
    />
  </Container>
);

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  height: 30px;
  /* Navbar always stays on top of page */
  z-index: 1;

  /* Animations */
  transition-timing-function: ease-in;
  transition: all 0.5s;
`;

const Logo = styled.img`
  position: fixed;
  left: 20px;
  margin-top: -10px;
  width: 80px;
  object-fit: contain;
`;

const Avatar = styled.img`
  position: fixed;
  right: 20px;
  width: 30px;
  object-fit: contain;
`;

export default Nav;
