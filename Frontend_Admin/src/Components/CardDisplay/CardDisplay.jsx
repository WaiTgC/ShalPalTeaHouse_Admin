import React from "react";
import Card from "../Card/Card";
import "./CardDisplay.css";
import { menuItems } from "../../assets/assets";

const CardDisplay = () => {
  return (
    <div className="card-display">
      <div className="card-grid">
        {menuItems.map((item) => (
          <Card
            key={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;
