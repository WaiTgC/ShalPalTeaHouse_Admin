import React from "react";
import "./Card.css";
import { useOrderContext } from "../../Context/OrderProvider";

const Card = ({ name, price, image }) => {
  const { addOrder, selectedTable } = useOrderContext();

  const handleCardClick = () => {
    const now = new Date();
    const newOrder = {
      id: Date.now(),
      tableNo: selectedTable, // Now a string like "A1"
      itemName: name,
      itemPrice: price,
      date: now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    console.log("Order from Card:", newOrder);
    addOrder(newOrder);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {image ? (
        <img src={image} alt={name} className="card-image" />
      ) : (
        <div className="card-image"></div>
      )}
      <div className="card-details">
        <span className="card-name">{name}</span>
        <span className="card-price">{price}</span>
      </div>
    </div>
  );
};

export default Card;
