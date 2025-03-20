import React, { useState } from "react";
import "./CheckoutCard.css";
import { assets } from "../../assets/assets";
import { useOrderContext } from "../../Context/OrderProvider";

const CheckoutCard = ({ name, orderType, staffName }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    items: [],
    subtotal: "0.00",
    vat: "0.00",
    grandTotal: "0.00",
    dateTime: "N/A",
  }); // Store invoice data for display
  const { getInProcessOrders, completeOrder } = useOrderContext();

  const tableOrders = getInProcessOrders(name);

  const handleCardClick = () => {
    if (tableOrders.length === 0 && !hasCheckedOut) {
      alert(`No "In Process" orders found for Table ${name}.`);
      return;
    }
    if (tableOrders.length > 0 && !hasCheckedOut) {
      // Calculate and store invoice data before checkout
      const allItems = tableOrders.reduce((acc, order) => {
        return [...acc, ...order.items];
      }, []);
      const items = getTableItems(allItems);
      const totalAmount = getTotalAmount(allItems);
      const vatRate = 0.07;
      const subtotal = parseFloat(totalAmount);
      const vat = (subtotal * vatRate).toFixed(2);
      const grandTotal = (subtotal + parseFloat(vat)).toFixed(2);
      const firstOrder = tableOrders[0];
      const dateTime = firstOrder
        ? `${firstOrder.date} | ${firstOrder.time}`
        : "N/A";

      setInvoiceData({
        items,
        subtotal: subtotal.toFixed(2),
        vat,
        grandTotal,
        dateTime,
      });
    }
    setShowModal(true);
  };

  const handleCheckout = () => {
    console.log(`Checking out for table ${name}`);
    // Move each order to history
    tableOrders.forEach((order) => {
      completeOrder(order, orderType, staffName);
    });
    setHasCheckedOut(true); // Hide the Checkout button
    // Modal stays open, and invoice data is already stored
  };

  const handlePrint = () => {
    console.log(`Printing receipt for table ${name}`);
    window.print();
    alert("No item to check out"); // Show alert
    setShowModal(false); // Close modal
    setHasCheckedOut(false); // Reset for next order
    setInvoiceData({
      items: [],
      subtotal: "0.00",
      vat: "0.00",
      grandTotal: "0.00",
      dateTime: "N/A",
    }); // Reset invoice data
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setHasCheckedOut(false);
    setInvoiceData({
      items: [],
      subtotal: "0.00",
      vat: "0.00",
      grandTotal: "0.00",
      dateTime: "N/A",
    });
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

  const getTotalAmount = (items) => {
    const tableItems = getTableItems(items);
    return tableItems
      .reduce((sum, item) => sum + parseFloat(item.amount), 0)
      .toFixed(2);
  };

  // Use invoiceData if hasCheckedOut is true, otherwise calculate from tableOrders
  const displayItems = hasCheckedOut
    ? invoiceData.items
    : getTableItems(
        tableOrders.reduce((acc, order) => [...acc, ...order.items], [])
      );
  const displaySubtotal = hasCheckedOut
    ? invoiceData.subtotal
    : getTotalAmount(
        tableOrders.reduce((acc, order) => [...acc, ...order.items], [])
      );
  const displayVat = hasCheckedOut
    ? invoiceData.vat
    : (parseFloat(displaySubtotal) * 0.07).toFixed(2);
  const displayGrandTotal = hasCheckedOut
    ? invoiceData.grandTotal
    : (parseFloat(displaySubtotal) + parseFloat(displayVat)).toFixed(2);
  const displayDateTime = hasCheckedOut
    ? invoiceData.dateTime
    : tableOrders[0]
    ? `${tableOrders[0].date} | ${tableOrders[0].time}`
    : "N/A";

  return (
    <>
      <div className="checkout-card" onClick={handleCardClick}>
        <h3>{name}</h3>
      </div>
      {showModal && (
        <div className="invoice-overlay" onClick={handleCloseModal}>
          <div className="invoice-box" onClick={(e) => e.stopPropagation()}>
            <div className="invoice-header">
              <img src={assets.logo} alt="logo" />
              <h6>
                Ek Thaksin 5 Alley, Lak Hok, Mueang Pathum Thani District,
                Pathum Thani 12000
              </h6>
            </div>
            <hr className="green-hr" />
            <div className="invoice-content">
              <p>
                <span>TableNo:</span>
                <span>{name}</span>
              </p>
              <p>
                <span>Order type:</span>
                <span>{orderType}</span>
              </p>
              <p>
                <span>Date and Time:</span>
                <span>{displayDateTime}</span>
              </p>
              <p>
                <span>Staff Name:</span>
                <span>{staffName || "Not Selected"}</span>
              </p>
              <hr className="green-hr" />
              <div className="invoice-items">
                {displayItems.length > 0 ? (
                  <table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Items</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {index + 1}. {item.itemName}
                          </td>
                          <td>{item.itemPrice} B</td>
                          <td>{item.qty}</td>
                          <td>{item.amount} B</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items to display.</p>
                )}
              </div>
              <hr className="green-hr" />
              <div className="invoice-total">
                <p>
                  Subtotal: <span>{displaySubtotal} B</span>
                </p>
                <p>
                  Vat (7%): <span>{displayVat} B</span>
                </p>
                <p>
                  Total: <span>{displayGrandTotal} B</span>
                </p>
              </div>
            </div>
            <div className="payment">
              <p>Thank You and See You Again</p>
              <div className="Qr"></div>
            </div>
            <div className="invoice-buttons">
              {!hasCheckedOut && tableOrders.length > 0 && (
                <button
                  className="invoice-btn checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              )}
              <button className="invoice-btn print-btn" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutCard;
