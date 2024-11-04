import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/connect-pairs">Connect pairs</Link>
          </li>
          <li>
            <Link to="/catch-dots">Catch dots</Link>
          </li>
          {/* Add more links for other captcha components */}
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
