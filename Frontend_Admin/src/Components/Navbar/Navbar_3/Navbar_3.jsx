import React from "react";
import "./Navbar_3.css";
import { NavLink } from "react-router-dom";
import { useOrderContext } from "../../../Context/OrderProvider";

const Navbar_3 = () => {
  const { items } = useOrderContext();

  const uniqueCategories = [
    ...new Set(items.map((item) => item.category.trim())),
  ].filter((category) => category !== "Most Ordered");

  console.log("Items in Navbar_3:", items);
  console.log("Unique categories in Navbar_3:", uniqueCategories);

  const formatCategoryForRoute = (category) => {
    return category.replace(/\s+/g, "");
  };

  const formatCategoryForDisplay = (category) => {
    return category.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="nav3_container">
      <nav className="navbar3">
        <ul className="nav3-list">
          <li className="nav3-item">
            <NavLink
              to="/CreateOrder/MostOrdered"
              className={({ isActive }) =>
                isActive ? "nav3-link active" : "nav3-link"
              }
            >
              Most Ordered
            </NavLink>
          </li>
          {uniqueCategories.map((category) => {
            const routeCategory = formatCategoryForRoute(category);
            const displayCategory = formatCategoryForDisplay(routeCategory);
            return (
              <li key={routeCategory} className="nav3-item">
                <NavLink
                  to={`/CreateOrder/${routeCategory}`}
                  className={({ isActive }) =>
                    isActive ? "nav3-link active" : "nav3-link"
                  }
                >
                  {displayCategory}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar_3;
