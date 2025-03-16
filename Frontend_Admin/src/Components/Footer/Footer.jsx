import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { tableNo } from "../../assets/assets";
import { useOrderContext } from "../../Context/OrderProvider";

const Footer = () => {
  const { selectedTable, setSelectedTable, addOrder } = useOrderContext();

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleOrder = () => {
    const now = new Date();
    const newOrder = {
      id: Date.now(),
      tableNo: selectedTable,
      date: now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      status: "Pending",
    };
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
