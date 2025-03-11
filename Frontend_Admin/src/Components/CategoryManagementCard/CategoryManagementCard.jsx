import React, { useState } from "react";

const CategoryManagementCard = ({
  index,
  category, // Changed from 'item' to 'category'
  onDelete,
  onSave,
  showAddButton = false,
  onAdd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({ ...category }); // Changed from 'editedItem' to 'editedCategory'

  // Debug logs to check if props are received
  console.log("onSave prop:", onSave);
  console.log("onDelete prop:", onDelete);

  const handleChange = (e) => {
    setEditedCategory({ ...editedCategory, [e.target.name]: e.target.value }); // Updated variable name
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedCategory({ ...editedCategory, image: imageUrl }); // Updated variable name
    }
  };

  const handleSave = () => {
    if (!editedCategory.name || !editedCategory.price) {
      // Updated variable name
      alert("Please fill in all fields before saving.");
      return;
    }
    console.log("Saving category:", editedCategory); // Updated log message
    onSave(editedCategory); // Update category in parent state
    setIsEditing(false); // Exit editing mode
  };

  return (
    <tr>
      <td>{index}.</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedCategory.name} // Updated variable name
            onChange={handleChange}
            placeholder="Enter Category Name" // Updated placeholder
          />
        ) : (
          editedCategory.name // Updated variable name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="price"
            value={editedCategory.price} // Updated variable name
            onChange={handleChange}
            placeholder="Enter Price" // Kept as is, adjust if not needed for categories
          />
        ) : (
          editedCategory.price // Updated variable name
        )}
      </td>
      <td>
        {editedCategory.image ? ( // Updated variable name
          <img
            src={editedCategory.image}
            alt="Category"
            width="50"
            height="50"
          /> // Updated alt text
        ) : (
          <label className="upload-btn">
            <input type="file" onChange={handleFileChange} hidden />
            Upload photo
          </label>
        )}
      </td>
      <td className="actions">
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </td>
      <td className="actions">
        <button className="delete-btn" onClick={() => onDelete(category._id)}>
          {" "}
          // Updated prop name Delete
        </button>
      </td>
      <td className="actions">
        {showAddButton ? (
          <button className="add-category-btn" onClick={onAdd}>
            {" "}
            // Updated class name ➕ Add New Category // Updated button text
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default CategoryManagementCard;
