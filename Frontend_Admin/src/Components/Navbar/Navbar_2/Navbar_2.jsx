import React from "react";
import "./Navbar_2.css";
import { NavLink } from "react-router-dom";

const Navbar_2 = () => {
  return (
    <div className="nav2_container">
      <nav className="navbar2">
        <ul className="nav2-list">
          <li className="nav2-item">
            <NavLink
              to="/BackOffice/UserRole"
              className={({ isActive }) =>
                isActive ? "nav2-link active" : "nav2-link"
              }
            >
              User Role & Management
            </NavLink>
          </li>
          <li className="nav2-item">
            <NavLink
              to="/BackOffice/EmployeeManagement"
              className={({ isActive }) =>
                isActive ? "nav2-link active" : "nav2-link"
              }
            >
              Employee Management
            </NavLink>
          </li>
          <li className="nav2-item">
            <NavLink
              to="/BackOffice/TaxConfiguration"
              className={({ isActive }) =>
                isActive ? "nav2-link active" : "nav2-link"
              }
            >
              Tax Configuration
            </NavLink>
          </li>
          <li className="nav2-item">
            <NavLink
              to="/BackOffice/PaymentSetting"
              className={({ isActive }) =>
                isActive ? "nav2-link active" : "nav2-link"
              }
            >
              PaymentSetting
            </NavLink>
          </li>
          <li className="nav2-item">
            <NavLink
              to="/BackOffice/SalesReport"
              className={({ isActive }) =>
                isActive ? "nav2-link active" : "nav2-link"
              }
            >
              Sales Report
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar_2;
