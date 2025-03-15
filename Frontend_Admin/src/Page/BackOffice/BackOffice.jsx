import React from "react";
import Layout_4 from "../../Layout/Layout_4/Layout_4";
import { Routes, Route, useLocation } from "react-router-dom";
import UserRole from "../../Components/UserRole/UserRole";
import EmployeeManagement from "../../Components/EmployeeManagement/EmployeeManagement;";
import TaxConfiguration from "../../Components/Tax Configuration/TaxConfig";
import PaymentSetting from "../../Components/PaymentSetting/PaymentSetting";
import SalesReport from "../../Components/SalesReport/SalesReport";

const BackOffice = () => {
  const location = useLocation();

  return (
    <Layout_4>
      <Routes>
        <Route path="/" element={<UserRole />} />
        <Route path="UserRole" element={<UserRole />} />
        <Route path="EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="TaxConfiguration" element={<TaxConfiguration />} />
        <Route path="PaymentSetting" element={<PaymentSetting />} />
        <Route path="SalesReport" element={<SalesReport />} />
      </Routes>
    </Layout_4>
  );
};

export default BackOffice;
