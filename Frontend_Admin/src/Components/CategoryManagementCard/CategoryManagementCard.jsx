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

  const handleSave = () => {
    if (!editedCategory.category) {
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
      <td style={{ width: 110 }}>{index}.</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="category"
            value={editedCategory.category} // Updated variable name
            onChange={handleChange}
            placeholder="Enter Category Name" // Updated placeholder
          />
        ) : (
          editedCategory.category // Updated variable name
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
          Delete
        </button>
      </td>
      <td className="actions" style={{ border: "none" }}>
        {showAddButton ? (
          <button className="add-category-btn" onClick={onAdd}>
            <i className="bi bi-plus-circle" />
            <span className="text-add">Add New Category</span>
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default CategoryManagementCard;
