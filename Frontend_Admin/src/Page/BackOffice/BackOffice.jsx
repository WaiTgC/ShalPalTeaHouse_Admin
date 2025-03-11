import React from "react";
import Layout_4 from "../../Layout/Layout_4/Layout_4";
import { Routes, Route, useLocation } from "react-router-dom";
import UserRole from "../../Components/UserRole/UserRole";
import EmployeeManagement from "../../Components/EmployeeManagement/EmployeeManagement;";
import TaxConfiguration from "../../Components/Tax Configuration/TaxConfig";
import PaymentSetting from "../../Components/PaymentSetting/PaymentSetting";
import SalesReport from "../../Components/SalesReport/SalesReport";

const Management = () => {
  const location = useLocation();
  console.log("Current location:", location.pathname);

  return (
    <Layout_4>
      <Routes>
        <Route path="/Management/UserRole" element={<UserRole />} />
        <Route
          path="/Management/EmployeeManagement"
          element={<EmployeeManagement />}
        />
        <Route
          path="/Management/TaxConfiguration"
          element={<TaxConfiguration />}
        />
        <Route path="/Management/PaymentSetting" element={<PaymentSetting />} />
        <Route path="/Management/SalesReport" element={<SalesReport />} />
      </Routes>
    </Layout_4>
  );
};

export default Management;
