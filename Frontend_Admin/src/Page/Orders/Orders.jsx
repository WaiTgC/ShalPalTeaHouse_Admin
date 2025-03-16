import React from "react";
import Layout_2 from "../../Layout/Layout_2/Layout_2";
import OrderCardDisplay from "../../Components/OrderCardDisplay/OrderCardDisplay";

const Orders = () => {
  return (
    <div>
      <Layout_2>
        <div className="create-order-content">
          <OrderCardDisplay />
        </div>
      </Layout_2>
    </div>
  );
};

export default Orders;
