import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import Dropdown from "../Slider/Slider";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Dropdown />

      <div
        className="logotext"
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <h2>SHAL PAL</h2>
        <span>Tea House</span>
      </div>

      <Link className="logo">
        <img src={assets.logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Header;
