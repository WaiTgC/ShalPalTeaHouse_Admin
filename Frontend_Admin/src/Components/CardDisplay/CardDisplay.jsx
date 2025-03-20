import React from "react";
import Card from "../Card/Card";
import "./CardDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";

const CardDisplay = () => {
  const { items } = useOrderContext();

  return (
    <div className="card-display">
      <div className="card-grid">
        {items.map((item) => (
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
