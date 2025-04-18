import React, { useState } from "react";
import OrderHistoryCard from "../OrderHistoryCard/OrderHistoryCard";
import "./OrderHistoryDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderHistoryCardDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const { orderHistory, tableNo } = useOrderContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterTable, setFilterTable] = useState("All");
  const [filterDate, setFilterDate] = useState(null);
  const [dateInput, setDateInput] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Handle date selection from calendar
  const handleDateSelect = (day) => {
    if (day) {
      const newFilterDate = {
        day,
        month: currentMonth + 1,
        year: currentYear,
      };
      setFilterDate(newFilterDate);
      setDateInput(`${day}-${newFilterDate.month}-${newFilterDate.year}`);
      setShowCalendarModal(false);
    }
  };

  // Handle manual date input with flexible parsing
  const handleDateInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setDateInput(value);

    const currentYearNow = new Date().getFullYear();
    let day = null;
    let month = null;
    let year = null;

    // Split input by spaces, hyphens, or any separator
    const parts = value.split(/[\s-]+/).filter(Boolean);

    for (const part of parts) {
      // Check if it's a number (could be day or year)
      if (!isNaN(part)) {
        const num = parseInt(part);
        if (num >= 1 && num <= 31 && !day) {
          day = num; // Assume it's a day if not already set
        } else if (num >= 2000 && num <= currentYearNow + 10) {
          year = num; // Assume it's a year
        } else if (num >= 1 && num <= 12 && !month) {
          month = num; // Assume it's a month if no month yet
        }
      } else {
        // Check if it's a month name (full or partial)
        const matchedMonth = months.findIndex((m) =>
          m.toLowerCase().startsWith(part)
        );
        if (matchedMonth !== -1) {
          month = matchedMonth + 1;
        }
      }
    }

    // Set filterDate based on what was parsed
    if (day || month || year) {
      setFilterDate({
        day: day || null,
        month: month || null,
        year: year || null,
      });
    } else {
      setFilterDate(null); // Clear filter if nothing valid is parsed
    }
  };

  // Handle month selection
  const handleMonthChange = (e) => {
    setCurrentMonth(parseInt(e.target.value));
  };

  // Handle year selection
  const handleYearChange = (e) => {
    setCurrentYear(parseInt(e.target.value));
  };

  // Generate years for the dropdown (e.g., from 2000 to current year + 10)
  const currentYearNow = new Date().getFullYear();
  const years = [];
  for (let i = 2000; i <= currentYearNow + 10; i++) {
    years.push(i);
  }

  // Filter orders by table and date
  const filteredOrders = orderHistory.filter((order) => {
    const matchesTable = filterTable === "All" || order.tableNo === filterTable;

    let matchesDate = true;
    if (filterDate) {
      const [orderDay, orderMonthStr, orderYear] = order.date.split(" ");
      const orderMonth =
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].indexOf(orderMonthStr) + 1;
      const orderDayNum = parseInt(orderDay);
      const orderYearNum = parseInt(orderYear);

      if (filterDate.day && filterDate.month && filterDate.year) {
        // Full date filter
        matchesDate =
          orderDayNum === filterDate.day &&
          orderMonth === filterDate.month &&
          orderYearNum === filterDate.year;
      } else if (filterDate.month && filterDate.year) {
        // Month and year filter
        matchesDate =
          orderMonth === filterDate.month && orderYearNum === filterDate.year;
      } else if (filterDate.month) {
        // Month only filter
        matchesDate = orderMonth === filterDate.month;
      } else if (filterDate.year) {
        // Year only filter
        matchesDate = orderYearNum === filterDate.year;
      }
    }

    return matchesTable && matchesDate;
  });

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
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

  const handleTableFilterChange = (e) => {
    setFilterTable(e.target.value);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="order-history-display">
      <div className="order-history-header">
        <h2>Order History</h2>
        <div className="d-flex align-items-center">
          <div className="table-filter mr-3">
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
          <div className="date-filter d-flex align-items-center">
            <span
              className="calendar-icon input-group-text"
              style={{
                width: "42px",
                cursor: "pointer",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              onClick={() => setShowCalendarModal(true)}
            >
              <i className="bi bi-calendar"></i>
            </span>
            <input
              type="text"
              value={dateInput}
              onChange={handleDateInputChange}
              placeholder="e.g., April, 2021, 07-04-2021"
              className="date-input form-control"
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <p>
          No order history for{" "}
          {filterTable === "All" ? "any table" : `Table ${filterTable}`}{" "}
          {filterDate
            ? filterDate.day && filterDate.month && filterDate.year
              ? `on ${filterDate.day}-${filterDate.month}-${filterDate.year}`
              : filterDate.month && filterDate.year
              ? `in ${months[filterDate.month - 1]} ${filterDate.year}`
              : filterDate.month
              ? `in ${months[filterDate.month - 1]}`
              : filterDate.year
              ? `in ${filterDate.year}`
              : ""
            : ""}
          .
        </p>
      ) : (
        <div className="order-history-grid">
          {filteredOrders.map((order) => (
            <OrderHistoryCard
              key={order.id}
              tableNo={order.tableNo}
              date={order.date}
              time={order.time}
              onClick={() => handleCardClick(order)}
            />
          ))}
        </div>
      )}
      {showCalendarModal && (
        <div
          className="calendar-overlay"
          onClick={() => setShowCalendarModal(false)}
        >
          <div className="calendar-box" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-header">
              <select
                value={currentMonth}
                onChange={handleMonthChange}
                className="month-select"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={currentYear}
                onChange={handleYearChange}
                className="year-select"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="calendar-days">
              <div className="calendar-day">S</div>
              <div className="calendar-day">M</div>
              <div className="calendar-day">T</div>
              <div className="calendar-day">W</div>
              <div className="calendar-day">T</div>
              <div className="calendar-day">F</div>
              <div className="calendar-day">S</div>
            </div>
            <div className="calendar-grid">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-date ${day ? "active" : ""}`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day || ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showModal && selectedOrder && (
        <div className="viewhistory-overlay">
          <div className="viewhistory-box">
            <div className="viewhistory-header">
              <h3>Table No. {selectedOrder.tableNo}</h3>
              <i onClick={closeModal} className="bi bi-x-lg" />
            </div>
            <p>Order Type: {selectedOrder.orderType}</p>
            <p>Staff Name: {selectedOrder.staffName || "Not Selected"}</p>
            <p>Paid via: {selectedOrder.paymentMethod || "Cash"}</p>
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
                {getTableItems(selectedOrder.items).map((item, index) => (
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
              <tfoot>
                <tr>
                  <td colSpan="3" style={{ textAlign: "left" }}>
                    <strong>Total:</strong>
                  </td>
                  <td>
                    <strong>{getTotalAmount(selectedOrder.items)} B</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="viewhistory-buttons">
              <button className="viewhistory-btn view-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryCardDisplay;
