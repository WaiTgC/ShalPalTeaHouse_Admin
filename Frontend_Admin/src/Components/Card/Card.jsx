import React from "react";
import "./Card.css";

const Card = ({ name, price, image }) => {
  return (
    <div className="card">
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
