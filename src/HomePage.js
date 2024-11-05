import React from "react";
import Container from "./components/Container";
import TopMenu from "./components/TopMenu";

const HomePage = () => {
  return (
    <Container>
      <TopMenu />
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <p>Welcome to the home page</p>
      <p>Click on the links above to play the games</p>
    </Container>
  );
};

export default HomePage;
