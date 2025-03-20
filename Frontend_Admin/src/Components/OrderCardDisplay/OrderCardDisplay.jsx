import React, { useState } from "react";
import OrderCard from "../OrderCard/OrderCard";
import "./OrderCardDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderCardDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { orders, updateOrderStatus, cancelOrder, removeOrderItem, tableNo } =
    useOrderContext();
  const [selectedTableOrder, setSelectedTableOrder] = useState(null);
  const [filterTable, setFilterTable] = useState("All"); // State for table filter

  console.log("Current orders in OrderCardDisplay:", orders);

  // Sort orders: "New" first, then "In Process"
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === "New" && b.status === "In Process") return -1;
    if (a.status === "In Process" && b.status === "New") return 1;
    return 0;
  });

  // Filter orders based on selected table
  const filteredOrders = sortedOrders.filter((order) => {
    if (filterTable === "All") return true;
    return order.tableNo === filterTable;
  });

  const handleCardClick = (tableOrder) => {
    setSelectedTableOrder(tableOrder);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleSendOrder = (orderId) => {
    if (selectedTableOrder) {
      updateOrderStatus(orderId, "In Process");
      setSelectedTableOrder(null);
      setShowModal(false);
      setIsEditing(false);
    }
  };

  const handleCancelOrder = () => {
    if (selectedTableOrder) {
      cancelOrder(selectedTableOrder.id);
      setSelectedTableOrder(null);
      setShowModal(false);
      setIsEditing(false);
    }
  };

  const handleEditOrder = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteItem = (orderId, itemId) => {
    removeOrderItem(orderId, itemId);
    const updatedOrder = orders.find((order) => order.id === orderId);
    if (updatedOrder.items.length === 0) {
      setSelectedTableOrder(null);
      setShowModal(false);
      setIsEditing(false);
    } else {
      setSelectedTableOrder(updatedOrder);
    }
  };

  const closeAlert = () => {
    setShowModal(false);
    setSelectedTableOrder(null);
    setIsEditing(false);
  };

  const getTableItems = (items) => {
    const validItems = items.filter(
      (item) => item.itemName && !isNaN(parseFloat(item.itemPrice))
    );

    const itemMap = validItems.reduce((acc, item) => {
      const key = `${item.itemName}-${item.itemPrice}`;
      if (!acc[key]) {
        const price = parseFloat(item.itemPrice) || 0;
        acc[key] = {
          itemName: item.itemName,
          itemPrice: price.toFixed(2),
          qty: 0,
          ids: [],
          status: item.status,
        };
      }
      acc[key].qty += 1;
      acc[key].ids.push(item.id);
      return acc;
    }, {});

    const groupedItems = Object.values(itemMap).map((item) => ({
      ...item,
      amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2),
    }));
    console.log("Grouped items:", groupedItems);
    return groupedItems;
  };

  const getTotalAmount = (items) => {
    const tableItems = getTableItems(items);
    const total = tableItems.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    return total.toFixed(2);
  };

  const handleTableFilterChange = (e) => {
    setFilterTable(e.target.value);
  };

  return (
    <div className="order-display">
      <div className="order-header">
        <h2>Orders</h2>
        <div className="table-filter">
          <span>Filter by Table: </span>
          <select
            value={filterTable}
            onChange={handleTableFilterChange}
            className="table-select"
          >
            <option value="All">All Tables</option>
            {tableNo.map((table) => (
              <option key={table.id} value={table.name}>
                {table.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <p>
          No orders for{" "}
          {filterTable === "All" ? "any table" : `Table ${filterTable}`}.
        </p>
      ) : (
        <div className="order-grid">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              tableNo={order.tableNo}
              itemName={`${order.items.length} item(s)`}
              itemPrice=""
              date={order.date}
              time={order.time}
              status={order.status}
              onClick={() => handleCardClick(order)}
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
            {selectedTableOrder.status === "In Process" ? (
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
                    className="modal-btn cancel-btn"
                    onClick={handleCancelOrder}
                  >
                    Checkout
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
                            {isEditing && (
                              <i
                                className="bi bi-x delete-item"
                                onClick={() =>
                                  handleDeleteItem(
                                    selectedTableOrder.id,
                                    item.ids[0]
                                  )
                                }
                              />
                            )}
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
                  {isEditing ? (
                    <button
                      className="modal-btn save-btn"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="modal-btn send-btn"
                        onClick={() => handleSendOrder(selectedTableOrder.id)}
                      >
                        Send Orders
                      </button>
                      <button
                        className="modal-btn edit-btn"
                        onClick={handleEditOrder}
                      >
                        Edit Orders
                      </button>
                      <button
                        className="modal-btn cancel-btn"
                        onClick={handleCancelOrder}
                      >
                        Cancel Orders
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
