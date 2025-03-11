import React from "react";
import Card from "../Card/Card";
import "./CardDisplay.css";

const CardDisplay = () => {
  // Mock data for testing
  const items = [
    { id: 1, name: "Item 1", price: "$5.00" },
    { id: 2, name: "Item 2", price: "$7.50" },
    { id: 3, name: "Item 3", price: "$3.00" },
    { id: 4, name: "Item 4", price: "$10.00" },
    { id: 5, name: "Item 5", price: "$6.50" },
    { id: 6, name: "Item 6", price: "$4.00" },
    { id: 7, name: "Item 7", price: "$8.00" },
    { id: 8, name: "Item 8", price: "$9.00" },
  ];

  return (
    <div className="card-display">
      <div className="card-grid">
        {items.map((item) => (
          <Card key={item.id} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;
