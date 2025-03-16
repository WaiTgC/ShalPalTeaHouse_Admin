import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../Context/OrderProvider";

const Footer = () => {
  const { selectedTable, setSelectedTable, addOrder, tableNo } =
    useOrderContext();

  const handleTableChange = (e) => {
    const newTable = e.target.value;
    setSelectedTable(newTable);
    console.log("Table changed to:", newTable);
  };

  const handleOrder = () => {
    const now = new Date();
    const newOrder = {
      id: Date.now(),
      tableNo: selectedTable, // Now a string like "A1"
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
    console.log("Order from Footer:", newOrder);
    addOrder(newOrder);
  };

  return (
    <div className="footer">
      <div className="tableNumberShow">
        <span>Table Number: </span>
        <select
          value={selectedTable}
          onChange={handleTableChange}
          className="table-select"
        >
          {tableNo.map((table) => (
            <option key={table.id} value={table.name}>
              {table.name}
            </option>
          ))}
        </select>
      </div>
      <Link to="/Orders">
        <button className="gotoOrder" onClick={handleOrder}>
          Order
        </button>
      </Link>
    </div>
  );
};

export default Footer;
