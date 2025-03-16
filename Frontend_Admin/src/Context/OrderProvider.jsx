import React, { createContext, useState, useContext } from "react";
import { tableNo } from "../assets/assets";
import { menuItems } from "../assets/assets";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState("A1"); // Use string "A1" instead of object

  const addOrder = (order) => {
    setOrders((prevOrders) => {
      const newOrders = [...prevOrders, { ...order, status: "New" }];
      console.log("New orders:", newOrders); // Debug log
      return newOrders;
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  const cancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        selectedTable,
        setSelectedTable,
        tableNo,
        menuItems,
        updateOrderStatus,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
