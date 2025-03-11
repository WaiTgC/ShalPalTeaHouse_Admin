import React, { useState } from "react";
import ItemManagementCard from "../ItemManagementCard/ItemManagementCard";
import "./ItemManagementDisplay.css";

const ItemManagementDisplay = () => {
  const [items, setItems] = useState([
    {
      _id: "1",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "2",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "3",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "4",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "5",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "6",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "7",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "8",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "9",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "10",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
  ]);

  const handleAddItem = () => {
    const name = prompt("Enter item name:");
    const price = prompt("Enter item price:");

    if (name && price) {
      const newItem = {
        _id: (items.length + 1).toString(),
        name,
        image: null,
        price,
        category: "Burmese Specials",
      };
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit item with ID: ${id}`);
  };

  const handleSave = (updatedItem) => {
    console.log("Received updated item:", updatedItem); // Debug log
    setItems(
      items.map((item) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id); // Debug log
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className="item-management-container">
      <div className="table-container">
        <table className="item-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Photo</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <ItemManagementCard
                key={item._id}
                index={index + 1}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSave}
                showAddButton={index === items.length - 1}
                onAdd={handleAddItem}
              />
            ))}
            {/* Add New Item row as the last row */}
            {/* <tr>
              <td colSpan="6"></td> 
              <td colSpan="3" className="sidebar">
                <button className="add-item-btn" onClick={handleAddItem}>
                  ➕ Add New Item
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemManagementDisplay;
