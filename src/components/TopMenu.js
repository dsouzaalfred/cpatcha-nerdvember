import React from "react";
import { NavLink } from "react-router-dom";

const TopMenu = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-start items-center">
        <NavLink
          to="/connect-pairs"
          className={({ isActive }) =>
            isActive ? "mr-4 text-cyan-50 font-bold" : "mr-4 text-cyan-50"
          }
        >
          Connect pairs
        </NavLink>
        <NavLink
          to="/catch-dots"
          className={({ isActive }) =>
            isActive ? "mr-4 text-cyan-50 font-bold" : "mr-4 text-cyan-50"
          }
        >
          Catch dots
        </NavLink>
      </div>
    </nav>
  );
};

export default TopMenu;
