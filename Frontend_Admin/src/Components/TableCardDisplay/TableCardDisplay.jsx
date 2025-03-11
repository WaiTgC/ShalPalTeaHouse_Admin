import React, { useState } from "react";
import "./TableCardDisplay.css";
import TableCard from "../TableCard/TableCard";

const TableCardDisplay = () => {
  const [tableitems, setTableitems] = useState([
    { id: 1, name: "A1" },
    { id: 2, name: "A2" },
    { id: 3, name: "A3" },
    { id: 4, name: "A4" },
    { id: 5, name: "A5" },
    { id: 6, name: "A6" },
    { id: 7, name: "A7" },
    { id: 8, name: "A8" },
  ]);

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
