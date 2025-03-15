import React, { useState } from "react";
import CategoryManagementCard from "../CategoryManagementCard/CategoryManagementCard";
import "./CategoryManagementDisplay.css";
import { menuItems } from "../../assets/assets";

const CategoryManagementDisplay = () => {
  const [categories, setCategories] = useState(menuItems);

  // ➕ Extract unique category names
  const uniqueCategoryNames = [
    ...new Set(categories.map((item) => item.category.trim())),
  ];

  const [showAlertBox, setShowAlertBox] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const closeAlert = () => {
    setShowAlertBox(false);
  };

  function handleAddCategory() {
    setShowAlertBox(true); // Show custom alert box instead of prompt
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

      const newCategory = {
        _id: (categories.length + 1).toString(),
        name: "",
        image: null,
        price: "",
        category: newCategoryName.trim(),
      };

      setCategories([...categories, newCategory]);
      setShowAlertBox(false); // Close alert box
      setNewCategoryName(""); // Reset input
      alert("Category added successfully!"); // Optional success alert
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
    setCategories(
      categories.map((cat) =>
        cat._id === updatedCategory._id ? { ...cat, ...updatedCategory } : cat
      )
    );
    alert("Category saved successfully!");
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    if (window.confirm("Are you sure you want to delete this item?")) {
      setCategories(categories.filter((cat) => cat._id !== id));
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
              const firstItem = categories.find(
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
