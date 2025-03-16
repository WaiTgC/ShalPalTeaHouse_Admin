import React, { useState } from "react";
import OrderCard from "../OrderCard/OrderCard";
import "./OrderCardDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderCardDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const { orders, updateOrderStatus, cancelOrder } = useOrderContext();
  const [selectedTableOrder, setSelectedTableOrder] = useState(null);

  // Group orders by tableNo
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.tableNo]) {
      acc[order.tableNo] = {
        tableNo: order.tableNo,
        items: [],
        date: order.date,
        time: order.time,
        status: order.status,
      };
    }
    acc[order.tableNo].items.push({
      id: order.id,
      itemName: order.itemName, // No default here, filter later
      itemPrice: order.itemPrice, // Keep as is, handle in getTableItems
      status: order.status,
    });
    if (order.status === "In Process") {
      acc[order.tableNo].status = "In Process";
    }
    return acc;
  }, {});

  const tableOrders = Object.values(groupedOrders);

  const handleCardClick = (tableOrder) => {
    setSelectedTableOrder(tableOrder);
    setShowModal(true);
  };

  const handleSendOrder = (orderId) => {
    if (selectedTableOrder) {
      updateOrderStatus(orderId, "In Process");
      setSelectedTableOrder(null);
      setShowModal(false);
    }
  };

  const handleCancelOrder = () => {
    if (selectedTableOrder) {
      selectedTableOrder.items.forEach((item) => cancelOrder(item.id));
      setSelectedTableOrder(null);
      setShowModal(false);
    }
  };

  const handleEditOrder = () => {
    alert("Edit Order functionality to be implemented!");
    setSelectedTableOrder(null);
    setShowModal(false);
  };

  const closeAlert = () => {
    setShowModal(false);
    setSelectedTableOrder(null);
  };

  const getTableItems = (items) => {
    // Filter out items with missing or invalid itemName or itemPrice
    const validItems = items.filter(
      (item) => item.itemName && !isNaN(parseFloat(item.itemPrice))
    );

    const itemMap = validItems.reduce((acc, item) => {
      const key = `${item.itemName}-${item.itemPrice}`;
      if (!acc[key]) {
        const price = parseFloat(item.itemPrice) || 0; // Fallback to 0 if invalid (though filtered)
        acc[key] = {
          itemName: item.itemName,
          itemPrice: price.toFixed(2), // Convert to string with 2 decimals
          qty: 0,
          ids: [],
          status: item.status,
        };
      }
      acc[key].qty += 1;
      acc[key].ids.push(item.id);
      return acc;
    }, {});
    return Object.values(itemMap).map((item) => ({
      ...item,
      amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2),
    }));
  };

  // Calculate total amount for all items
  const getTotalAmount = (items) => {
    const tableItems = getTableItems(items);
    const total = tableItems.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className="order-display">
      <h2>Orders</h2>
      {tableOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-grid">
          {tableOrders.map((tableOrder) => (
            <OrderCard
              key={tableOrder.tableNo}
              tableNo={tableOrder.tableNo}
              itemName={tableOrder.items.length + " item(s)"}
              itemPrice=""
              date={tableOrder.date}
              time={tableOrder.time}
              status={tableOrder.status}
              onClick={() => handleCardClick(tableOrder)}
            />
          ))}
        </div>
      )}
      {showModal && selectedTableOrder && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Table No. {selectedTableOrder.tableNo}</h3>
              <i onClick={closeAlert} className="bi bi-x-lg" />
            </div>
            {selectedTableOrder.items.every(
              (item) => item.status === "In Process"
            ) ? (
              <>
                <p>All orders for this table are now being processed.</p>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTableItems(selectedTableOrder.items).map(
                      (item, index) => (
                        <tr key={index}>
                          <td>
                            {index + 1}. {item.itemName}
                          </td>
                          <td>{item.itemPrice} B</td>
                          <td>{item.qty}</td>
                          <td>{item.amount} B</td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "left" }}>
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong>
                          {getTotalAmount(selectedTableOrder.items)} B
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="modal-buttons">
                  <button
                    className="modal-btn edit-btn"
                    onClick={handleEditOrder}
                  >
                    Edit Order
                  </button>
                  <button
                    className="modal-btn cancel-btn"
                    onClick={handleCancelOrder}
                  >
                    Cancel All Orders
                  </button>
                </div>
              </>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTableItems(selectedTableOrder.items).map(
                      (item, index) => (
                        <tr key={index}>
                          <td className="index-item">
                            {index + 1}. {item.itemName}
                          </td>
                          <td className="index-item">{item.itemPrice} B</td>
                          <td className="index-item">{item.qty}</td>
                          <td className="index-item">{item.amount} B</td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <strong>Total</strong>
                      </td>
                      <td></td>
                      <td></td>
                      <td style={{ textAlign: "center" }}>
                        <strong>
                          {getTotalAmount(selectedTableOrder.items)} B
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="modal-buttons">
                  {selectedTableOrder.items.some(
                    (item) => item.status === "New"
                  ) && (
                    <>
                      <button
                        className="modal-btn cancel-btn"
                        onClick={handleCancelOrder}
                      >
                        Cancel Orders
                      </button>
                      <button
                        className="modal-btn send-btn"
                        onClick={() =>
                          selectedTableOrder.items
                            .filter((item) => item.status === "New")
                            .forEach((item) => handleSendOrder(item.id))
                        }
                      >
                        Send Orders
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCardDisplay;
