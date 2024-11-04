import React from "react";
import Container from "./components/Container";
import TopMenu from "./components/TopMenu";

const HomePage = () => {
  return (
    <Container>
      <TopMenu />
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <p>Click on the links above to play the games</p>
    </Container>
  );
};

export default HomePage;
