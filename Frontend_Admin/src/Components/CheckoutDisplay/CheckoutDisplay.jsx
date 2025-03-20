import React, { useState } from "react";
import "./CheckoutDisplay.css";
import { tableNo } from "../../assets/assets";
import { employees } from "../../assets/assets"; // Import employees data
import CheckoutCard from "../CheckoutCard/CheckoutCard";

const CheckoutDisplay = () => {
  const [tableitems, setTableitems] = useState(tableNo);
  const [selectedOrderType, setSelectedOrderType] = useState("Dine-in"); // Default OrderType
  const [selectedStaffName, setSelectedStaffName] = useState(""); // Default StaffName

  // Define possible order types
  const orderTypes = ["Dine-in", "Takeaway", "Delivery"];

  // Get unique staff names from employees data
  const staffNames = [...new Set(employees.map((employee) => employee.name))];

  return (
    <div className="Checkout-Display">
      <div className="checkout-header">
        <h2>Checkout Tables</h2>
        <div className="checkout-filters">
          <div className="filter-group">
            <label htmlFor="order-type">Order Type: </label>
            <select
              id="order-type"
              value={selectedOrderType}
              onChange={(e) => setSelectedOrderType(e.target.value)}
            >
              {orderTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="staff-name">Staff Name: </label>
            <select
              id="staff-name"
              value={selectedStaffName}
              onChange={(e) => setSelectedStaffName(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="Checkout-grid">
        {tableitems.map((tableitem) => (
          <CheckoutCard
            key={tableitem.id}
            name={tableitem.name}
            orderType={selectedOrderType} // Pass selected OrderType
            staffName={selectedStaffName} // Pass selected StaffName
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutDisplay;
