import React from "react";
import Blank_white from "../../Components/Blank_white/Blank_white";
import Header from "../../Components/Header/Header";
import Navbar_1 from "../../Components/Navbar/Navbar_1/Navbar_1";

import "./Layout_3.css";

const Layout_3 = ({ children }) => {
  return (
    <div className="Layout_3">
      <Blank_white />
      <Header />
      <Navbar_1 />
      {children}
    </div>
  );
};

export default Layout_3;
