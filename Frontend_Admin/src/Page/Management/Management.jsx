import React from "react";
import Layout_3 from "../../Layout/Layout_3/Layout_3";
import { Routes, Route } from "react-router-dom";
import TableManagement from "../../Components/TableManagement/TableManagement";
import ItemManagement from "../../Components/ItemManagement/ItemManagement";
import CategoryManagement from "../../Components/CategoryManagement/CategoryManagement";

const Management = () => {
  return (
    <Layout_3>
      <Routes>
        <Route path="/" element={<ItemManagement />} />
        <Route path="TableManagement" element={<TableManagement />} />
        <Route path="ItemManagement" element={<ItemManagement />} />
        <Route path="CategoryManagement" element={<CategoryManagement />} />
      </Routes>
    </Layout_3>
  );
};

export default Management;
