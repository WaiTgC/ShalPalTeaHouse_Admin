import React from "react";
import "./OrderCard.css";

const OrderCard = ({
  tableNo,
  itemName,
  itemPrice,
  date,
  time,
  status,
  onClick,
}) => {
  console.log("OrderCard props:", {
    tableNo,
    itemName,
    itemPrice,
    date,
    time,
    status,
  }); // Debug log

  return (
    <div className="order-card" onClick={onClick}>
      <div className="order-details">
        <span className="order-table">Table: {tableNo || "N/A"}</span>

        <span className="order-date-time">
          {date} | {time}
        </span>

        <span className="order-status">{status}</span>
      </div>
    </div>
  );
};

export default OrderCard;
