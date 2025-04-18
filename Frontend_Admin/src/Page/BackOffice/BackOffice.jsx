import React from "react";
import Layout_4 from "../../Layout/Layout_4/Layout_4";
import { Routes, Route, useLocation } from "react-router-dom";
import UserRole from "../../Components/UserRole/UserRole";
import EmployeeManagement from "../../Components/EmployeeManagement/EmployeeManagement;";
import SalesReport from "../../Components/SalesReport/SalesReport";
import PaymentTaxSetting from "../../Components/PaymentTaxSetting/PaymentTaxSetting";
import "./BackOffice.css";

const BackOffice = () => {
  const location = useLocation();

  return (
    <Layout_4>
      <Routes>
        <Route path="/" element={<UserRole />} />
        <Route path="UserRole" element={<UserRole />} />
        <Route path="EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="PaymentTaxSetting" element={<PaymentTaxSetting />} />
        <Route path="SalesReport" element={<SalesReport />} />
      </Routes>
    </Layout_4>
  );
};

export default BackOffice;
