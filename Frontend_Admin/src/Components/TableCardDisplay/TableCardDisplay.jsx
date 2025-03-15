import React, { useState } from "react";
import "./TableCardDisplay.css";
import TableCard from "../TableCard/TableCard";
import { tableNo } from "../../assets/assets";

const TableCardDisplay = () => {
  const [tableitems, setTableitems] = useState(tableNo);

  const handleDelete = (name) => {
    const tableToDelete = tableitems.find((table) => table.name === name);
    if (tableToDelete) {
      setTableitems(
        tableitems.filter((table) => table.id !== tableToDelete.id)
      );
      console.log(`Deleted table: ${name}`);
    } else {
      console.error(`Table with name ${name} not found`);
    }
  };

  return (
    <div className="table-card-display">
      <div className="table-card-grid">
        {tableitems.map((tableitem) => (
          <TableCard
            key={tableitem.id}
            name={tableitem.name}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TableCardDisplay;
