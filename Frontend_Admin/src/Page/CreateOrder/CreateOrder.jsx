import React from "react";
import Layout_1 from "../../Layout/Layout_1/Layout_1";

import CardDisplay from "../../Components/CardDisplay/CardDisplay";

const CreateOrder = () => {
  return (
    <div>
      <Layout_1>
        <div className="create-order-content">
          <CardDisplay />
        </div>
      </Layout_1>
    </div>
  );
};

export default CreateOrder;
