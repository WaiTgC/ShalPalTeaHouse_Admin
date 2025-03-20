import React, { createContext, useState, useContext } from "react";
import { tableNo } from "../assets/assets";
import { menuItems } from "../assets/assets";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]); // New state for order history
  const [pendingItems, setPendingItems] = useState({});
  const [selectedTable, setSelectedTable] = useState("A1");
  const [cardClickCounts, setCardClickCounts] = useState({});
  const [items, setItems] = useState(menuItems);
  const [tableitems, setTableitems] = useState(tableNo);

  const addOrder = (tableNo, newItems) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.tableNo === tableNo && order.status === "New"
      );
      const now = new Date();
      if (existingOrderIndex !== -1) {
        const existingItems = prevOrders[existingOrderIndex].items;
        const uniqueNewItems = newItems.filter(
          (newItem) => !existingItems.some((item) => item.id === newItem.id)
        );
        const updatedOrder = {
          ...prevOrders[existingOrderIndex],
          items: [...existingItems, ...uniqueNewItems],
        };
        const newOrders = [...prevOrders];
        newOrders[existingOrderIndex] = updatedOrder;
        console.log("Updated existing order:", newOrders);
        return newOrders;
      } else {
        const newOrder = {
          id: Date.now(),
          tableNo,
          items: newItems,
          status: "New",
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
        const newOrders = [...prevOrders, newOrder];
        console.log("New orders:", newOrders);
        return newOrders;
      }
    });
    setCardClickCounts((prev) => {
      const newCounts = { ...prev };
      Object.keys(newCounts).forEach((key) => {
        if (key.startsWith(`${tableNo}_`)) {
          delete newCounts[key];
        }
      });
      console.log(
        "Card click counts reset for table after addOrder:",
        tableNo,
        newCounts
      );
      return newCounts;
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      const order = updatedOrders.find((order) => order.id === orderId);
      if (order && newStatus === "In Process") {
        clearPendingItems(order.tableNo);
      }
      return updatedOrders;
    });
  };

  const cancelOrder = (orderId) => {
    setOrders((prevOrders) => {
      const orderToCancel = prevOrders.find((order) => order.id === orderId);
      if (orderToCancel) {
        setCardClickCounts((prev) => {
          const newCounts = { ...prev };
          orderToCancel.items.forEach((item) => {
            const key = `${orderToCancel.tableNo}_${item.itemName}`;
            delete newCounts[key];
          });
          return newCounts;
        });
        clearPendingItems(orderToCancel.tableNo);
      }
      return prevOrders.filter((order) => order.id !== orderId);
    });
  };

  const completeOrder = (order, orderType, staffName) => {
    // Move order to history with additional details
    const completedOrder = {
      ...order,
      status: "Completed",
      orderType,
      staffName,
      completedAt: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setOrderHistory((prevHistory) => [...prevHistory, completedOrder]);
    // Remove from active orders
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    clearPendingItems(order.tableNo);
  };

  const removeOrderItem = (orderId, itemId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.filter((item) => item.id !== itemId);
          return { ...order, items: updatedItems };
        }
        return order;
      })
    );
  };

  const addPendingItem = (item) => {
    setPendingItems((prevItems) => {
      const tableItems = prevItems[item.tableNo] || [];
      const newItems = { ...prevItems, [item.tableNo]: [...tableItems, item] };
      console.log("Pending items updated:", newItems);
      return newItems;
    });
  };

  const removePendingItem = (itemName, tableNo) => {
    setPendingItems((prevItems) => {
      const tableItems = prevItems[tableNo] || [];
      const index = tableItems.findIndex(
        (item) => item.itemName === itemName && item.status === "New"
      );
      if (index !== -1) {
        const newTableItems = [...tableItems];
        newTableItems.splice(index, 1);
        const newItems = { ...prevItems, [tableNo]: newTableItems };
        console.log("Removed item from pending:", itemName, newItems);
        return newItems;
      }
      return prevItems;
    });
  };

  const clearPendingItems = (tableNo) => {
    setPendingItems((prevItems) => {
      const newItems = { ...prevItems, [tableNo]: [] };
      console.log("Pending items cleared for table:", tableNo, newItems);
      return newItems;
    });
  };

  const updateCardClickCount = (cardName, tableNo) => {
    const key = `${tableNo}_${cardName}`;
    setCardClickCounts((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const decreaseCardClickCount = (cardName, tableNo) => {
    const key = `${tableNo}_${cardName}`;
    setCardClickCounts((prev) => {
      const currentCount = prev[key] || 0;
      if (currentCount > 0) {
        const newCount = currentCount - 1;
        console.log(`Decreased count for ${key} to ${newCount}`);
        return {
          ...prev,
          [key]: newCount > 0 ? newCount : undefined,
        };
      }
      return prev;
    });
  };

  const resetCardCounts = (tableNo) => {
    setCardClickCounts((prev) => {
      const newCounts = { ...prev };
      Object.keys(newCounts).forEach((key) => {
        if (key.startsWith(`${tableNo}_`)) {
          delete newCounts[key];
        }
      });
      console.log("Card click counts reset for table:", tableNo, newCounts);
      return newCounts;
    });
  };

  const addItem = (newItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, _id: (prevItems.length + 1).toString() },
    ]);
  };

  const updateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const addTable = (newTableName) => {
    if (!newTableName.trim()) {
      console.error("Table name cannot be empty");
      return;
    }
    const newTable = {
      id: Date.now(),
      name: newTableName.trim(),
    };
    setTableitems((prevItems) => [...prevItems, newTable]);
    console.log(`Added table: ${newTableName}`);
  };

  const deleteTable = (id) => {
    setTableitems((prevItems) => prevItems.filter((item) => item.id !== id));
    console.log(`Deleted table with id: ${id}`);
  };

  const getTableOrders = (tableNo) => {
    return orders.filter(
      (order) => order.tableNo === tableNo && order.status === "New"
    );
  };

  const getInProcessOrders = (tableNo) => {
    return orders.filter(
      (order) => order.tableNo === tableNo && order.status === "In Process"
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderHistory, // Expose order history
        addOrder,
        updateOrderStatus,
        cancelOrder,
        completeOrder, // Expose completeOrder function
        removeOrderItem,
        selectedTable,
        setSelectedTable,
        tableNo,
        menuItems,
        pendingItems,
        addPendingItem,
        removePendingItem,
        clearPendingItems,
        cardClickCounts,
        updateCardClickCount,
        decreaseCardClickCount,
        resetCardCounts,
        items,
        addItem,
        updateItem,
        deleteItem,
        tableitems,
        addTable,
        deleteTable,
        getTableOrders,
        getInProcessOrders,
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
