import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Page/Home/Home";
import CreateOrder from "./Page/CreateOrder/CreateOrder";
import Orders from "./Page/Orders/Orders";
import OrderHistory from "./Page/OrderHistory/OrderHistory";
import Management from "./Page/Management/Management";
import Checkout from "./Page/Checkout/Checkout";
import BackOffice from "./Page/BackOffice/BackOffice";
import { OrderProvider } from "./Context/OrderProvider";

function App() {
  return (
    <div className="App">
      <OrderProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/Management/*" element={<Management />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/BackOffice/*" element={<BackOffice />} />
      </Routes>
      </OrderProvider>
    </div>
  );
}

export default App;
