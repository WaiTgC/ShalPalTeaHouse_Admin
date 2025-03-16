import React from "react";
import OrderCard from "../OrderCard/OrderCard";
import "./OrderCardDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";

const OrderDisplay = () => {
  const { orders } = useOrderContext();

  return (
    <div className="order-display">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              tableNo={order.tableNo}
              itemName={order.itemName}
              itemPrice={order.itemPrice}
              date={order.date}
              time={order.time}
              status={order.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDisplay;
