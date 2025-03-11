import React from "react";
import Blank_white from "../../Components/Blank_white/Blank_white";
import Header from "../../Components/Header/Header";
import Navbar_2 from "../../Components/Navbar/Navbar_2/Navbar_2";

import "./Layout_4.css";

const Layout_4 = ({ children }) => {
  return (
    <div className="Layout_4">
      <Blank_white />
      <Header />
      <Navbar_2 />
      {children}
    </div>
  );
};

export default Layout_4;
