import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ConnectPairsCaptcha from "./ConnectPairsCaptcha";
import BirdGame from "./BirdGame";

import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/connect-pairs" element={<ConnectPairsCaptcha />} />
        <Route path="/catch-dots" element={<BirdGame />} />
        {/* Add more routes for other captcha components */}
      </Routes>
    </Router>
  );
}

export default App;
