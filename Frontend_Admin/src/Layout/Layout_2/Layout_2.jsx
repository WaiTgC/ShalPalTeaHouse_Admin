import React from "react";
import Blank_white from "../../Components/Blank_white/Blank_white";
import Header from "../../Components/Header/Header";
import Blank_black from "../../Components/Blank_black/Blank_black";

import "./Layout_2.css";

const Layout_2 = ({ children }) => {
  return (
    <div className="Layout_2">
      <Blank_white />
      <Header />
      <Blank_black />
      {children}
    </div>
  );
};

export default Layout_2;
