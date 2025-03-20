import React from "react";
import Layout_2 from "../../Layout/Layout_2/Layout_2";
import OrderHistoryDisplay from "../../Components/OrderHistoryDisplay/OrderHistoryDisplay";

const OrderHistory = () => {
  return (
    <Layout_2>
      <div className="create-orderhistory-content">
        <OrderHistoryDisplay />
      </div>
    </Layout_2>
  );
};

export default OrderHistory;
