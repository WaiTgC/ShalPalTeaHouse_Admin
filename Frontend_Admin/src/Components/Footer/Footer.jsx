import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { tableNo } from "../../assets/assets";

const Footer = () => {
  const [selectedTable, setSelectedTable] = useState("A1"); // Default to A1

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
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
        <button className="gotoOrder">Order</button>
      </Link>
    </div>
  );
};

export default Footer;
