import React from "react";
import "./Navbar_1.css";
import { NavLink } from "react-router-dom";

const Navbar_1 = () => {
  return (
    <div className="nav1_container">
      <nav className="navbar1">
        <ul className="nav1-list">
          <li className="nav1-item">
            <NavLink
              to="/Management/TableManagement"
              className={({ isActive }) =>
                isActive ? "nav1-link active" : "nav1-link"
              }
            >
              Table Management
            </NavLink>
          </li>
          <li className="nav1-item">
            <NavLink
              to="/Management/ItemManagement"
              className={({ isActive }) =>
                isActive ? "nav1-link active" : "nav1-link"
              }
            >
              Item Management
            </NavLink>
          </li>
          <li className="nav1-item">
            <NavLink
              to="/Management/CategoryManagement"
              className={({ isActive }) =>
                isActive ? "nav1-link active" : "nav1-link"
              }
            >
              Category Management
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar_1;
