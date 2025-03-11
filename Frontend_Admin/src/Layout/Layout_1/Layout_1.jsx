import React from "react";
import Blank_white from "../../Components/Blank_white/Blank_white";
import Header from "../../Components/Header/Header";
import Blank_black from "../../Components/Blank_black/Blank_black";
import Footer from "../../Components/Footer/Footer";
import "./Layout_1.css";

const Layout_1 = ({ children }) => {
  return (
    <div className="layout_1">
      <Blank_white />
      <Header />
      <Blank_black />
      {children}
      <Footer />
    </div>
  );
};

export default Layout_1;
