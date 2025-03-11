import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="tableNumberShow">
        <span>Table Number: A1</span>
      </div>
      <Link to="/Orders">
        <button className="gotoOrder"> Order</button>
      </Link>
    </div>
  );
};

export default Footer;
