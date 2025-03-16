import React from "react";
import "./OrderCard.css";

const OrderCard = ({ tableNo, itemName, itemPrice, date, time, status }) => {
  return (
    <div className="order-card">
      <div className="order-details">
        <span className="order-table">Table: {tableNo}</span>
        <span className="order-item">Item: {itemName || "N/A"}</span>
        <span className="order-price">Price: {itemPrice || "N/A"}</span>
        <span className="order-date">Date: {date}</span>
        <span className="order-time">Time: {time}</span>
        <span className="order-status">Status: {status}</span>
      </div>
    </div>
  );
};

export default OrderCard;
