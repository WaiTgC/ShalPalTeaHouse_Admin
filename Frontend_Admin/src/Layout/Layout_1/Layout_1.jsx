import React from "react";
import Blank_white from "../../Components/Blank_white/Blank_white";
import Header from "../../Components/Header/Header";
import Navbar_3 from "../../Components/Navbar/Navbar_3/Navbar_3";
import Footer from "../../Components/Footer/Footer";
import "./Layout_1.css";

const Layout_1 = ({ children }) => {
  return (
    <div className="layout_1">
      <Blank_white />
      <Header />
      <Navbar_3 />
      {children}
      <Footer />
    </div>
  );
};

export default Layout_1;
