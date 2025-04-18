import React, { useState } from "react";
import CategoryManagementCard from "../CategoryManagementCard/CategoryManagementCard";
import "./CategoryManagementDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";

const CategoryManagementDisplay = () => {
  const { items, addItem, updateItem, deleteItem } = useOrderContext();
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Extract unique category names from items
  const uniqueCategoryNames = [
    ...new Set(items.map((item) => item.category.trim())),
  ];

  const closeAlert = () => {
    setShowAlertBox(false);
  };

  function handleAddCategory() {
    setShowAlertBox(true);
  }

  function handleAlertBoxSubmit() {
    if (newCategoryName) {
      const trimmed = newCategoryName.trim().toLowerCase();
      const alreadyExists = uniqueCategoryNames.some(
        (cat) => cat.toLowerCase() === trimmed
      );

      if (alreadyExists) {
        alert("Category already exists!");
        return;
      }

      // Add a placeholder item for the new category
      const newCategoryItem = {
        _id: Date.now().toString(),
        name: `Placeholder for ${newCategoryName.trim()}`,
        image: null,
        price: "0",
        category: newCategoryName.trim(),
      };

      addItem(newCategoryItem); // Update OrderProvider's items
      setShowAlertBox(false);
      setNewCategoryName("");
      alert("Category added successfully!");
    } else {
      alert("Please enter a category name.");
    }
  }

  function handleAlertBoxCancel() {
    setShowAlertBox(false);
    setNewCategoryName("");
  }

  const handleEdit = (id) => {
    alert(`Edit category with ID: ${id}`);
  };

  const handleSave = (updatedCategory) => {
    console.log("Received updated Category:", updatedCategory);
    updateItem(updatedCategory);
    alert("Category saved successfully!");
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
      alert("Category deleted successfully!");
    }
  };

  return (
    <div className="category-management-container">
      <div className="table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {uniqueCategoryNames.map((categoryName, index) => {
              const firstItem = items.find(
                (item) =>
                  item.category.trim().toLowerCase() ===
                  categoryName.toLowerCase()
              );

              return (
                <CategoryManagementCard
                  key={firstItem._id}
                  index={index + 1}
                  category={firstItem}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  showAddButton={index === uniqueCategoryNames.length - 1}
                  onAdd={handleAddCategory}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {showAlertBox && (
        <div className="custom-alert-box">
          <div className="alert-box-content">
            <i onClick={closeAlert} className="bi bi-x-lg" />
            <h3>Enter Category Name</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="alert-box-input"
            />
            <div className="alert-box-buttons">
              <button onClick={handleAlertBoxSubmit}>Confirm</button>
              <button onClick={handleAlertBoxCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagementDisplay;
