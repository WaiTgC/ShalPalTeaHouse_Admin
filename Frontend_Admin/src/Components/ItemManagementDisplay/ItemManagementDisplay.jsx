import React, { useState } from "react";
import ItemManagementCard from "../ItemManagementCard/ItemManagementCard";
import "./ItemManagementDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";

const ItemManagementDisplay = () => {
  const { items, addItem, updateItem, deleteItem } = useOrderContext();
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemOptions, setNewItemOptions] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);

  const closeAlert = () => {
    setShowAlertBox(false);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemCategory("");
    setNewItemOptions("");
    setNewItemImage(null);
  };

  const handleAddItem = () => {
    setShowAlertBox(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewItemImage(imageUrl);
    }
  };

  function handleAlertBoxSubmit() {
    if (newItemName && newItemPrice && newItemCategory) {
      const optionsArray = newItemOptions
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt);
      const newItem = {
        _id: Date.now().toString(),
        name: newItemName.trim(),
        image: newItemImage,
        price: newItemPrice.trim(),
        category: newItemCategory.trim(),
        options: optionsArray,
      };
      addItem(newItem);
      closeAlert();
      alert("Item added successfully!");
    } else {
      alert("Please fill in all required fields (name, price, and category).");
    }
  }

  function handleAlertBoxCancel() {
    closeAlert();
  }

  const handleSave = (updatedItem) => {
    updateItem(updatedItem);
    alert("Item saved successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
      alert("Item deleted successfully!");
    }
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
              <th>Options</th>
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
                onSave={handleSave}
                showAddButton={index === items.length - 1}
                onAdd={handleAddItem}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showAlertBox && (
        <div className="custom-alert-box-item">
          <div className="alert-box-content-item">
            <i onClick={closeAlert} className="bi bi-x-lg" />
            <div className="inputalign">
              <div className="inputcontainer">
                <h3>Enter Item Name</h3>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name"
                  className="alert-box-input-item"
                />
              </div>
              <div className="inputcontainer">
                <h3>Enter Category Name</h3>
                <input
                  type="text"
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  placeholder="Enter category"
                  className="alert-box-input-item"
                />
              </div>
              <div className="inputcontainer">
                <h3>Enter Price</h3>
                <input
                  type="text"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  placeholder="Enter price (e.g., 50 B)"
                  className="alert-box-input-item"
                />
              </div>
              <div className="inputcontainer">
                <h3>Enter Options</h3>
                <input
                  type="text"
                  value={newItemOptions}
                  onChange={(e) => setNewItemOptions(e.target.value)}
                  placeholder="Enter options (comma-separated)"
                  className="alert-box-input-item"
                />
              </div>
              <div className="photo-upload">
                {newItemImage ? (
                  <img
                    src={newItemImage}
                    alt="Preview"
                    className="photo-preview"
                  />
                ) : (
                  <label className="upload-link">
                    <h3 className="upload-photo-text">Upload Photo</h3>
                    <span className="Click-upload-photo"> Click here </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="alert-box-buttons-item">
              <button onClick={handleAlertBoxSubmit}>Confirm</button>
              <button onClick={handleAlertBoxCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemManagementDisplay;
