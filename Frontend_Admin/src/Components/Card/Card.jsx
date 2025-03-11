import React from "react";
import "./Card.css";

const Card = ({ name, price }) => {
  return (
    <div className="card">
      <div className="card-image"></div>
      <div className="card-details">
        <span className="card-name">Name: {name}</span>
        <span className="card-price">Price: {price}</span>
      </div>
    </div>
  );
};

export default Card;
