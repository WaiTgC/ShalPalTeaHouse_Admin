import React, { useState } from "react";
import "./TableCardDisplay.css";
import TableCard from "../TableCard/TableCard";
import { tableNo } from "../../assets/assets";

const TableCardDisplay = () => {
  const [tableitems, setTableitems] = useState(tableNo);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableName, setNewTableName] = useState("");

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

  const handleAddTable = () => {
    if (!newTableName.trim()) {
      console.error("Table name cannot be empty");
      return;
    }

    const newTable = {
      id: Date.now(), // Unique ID based on timestamp
      name: newTableName.trim(),
    };

    setTableitems((prevItems) => [...prevItems, newTable]);
    console.log(`Added table: ${newTableName}`);
    setNewTableName(""); // Clear input
    setShowAddModal(false); // Close modal
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewTableName(""); // Reset input on close
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
        <div className="tablecard add-table-card" onClick={openAddModal}>
          <div className="add-table-content">
            <i className="bi bi-plus-circle" />
            <span className="text-add">Add New Table</span>
          </div>
        </div>
        {showAddModal && (
          <div className="alert-overlay-add-table">
            <div className="alert-box-add-table">
              <i onClick={closeAddModal} className="bi bi-x-lg"></i>
              <h3 className="table-number-text-">Enter New Table Number</h3>
              <input
                type="text"
                className="alert-box-input-table" /* Updated to match your CSS if needed */
                placeholder="Input Table Number"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
              />

              <div className="alert-box-buttons">
                <button onClick={handleAddTable}>Confirm</button>
                <button onClick={closeAddModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCardDisplay;
