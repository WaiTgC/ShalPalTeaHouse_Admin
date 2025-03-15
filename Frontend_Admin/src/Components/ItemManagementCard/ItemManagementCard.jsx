import React, { useState } from "react";

const ItemManagementCard = ({
  index,
  item,
  onDelete,
  onSave,
  showAddButton = false,
  onAdd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  // Debug logs to check if props are received
  console.log("onSave prop:", onSave);
  console.log("onDelete prop:", onDelete);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedItem({ ...editedItem, image: imageUrl });
    }
  };

  const handleSave = () => {
    if (!editedItem.name || !editedItem.price) {
      alert("Please fill in all fields before saving.");
      return;
    }
    console.log("Saving item:", editedItem); // Debug log
    onSave(editedItem); // Update item in parent state
    setIsEditing(false); // Exit editing mode
  };

  return (
    <tr>
      <td>{index}.</td>
      <td className="tdname">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleChange}
            placeholder="Enter Item Name"
          />
        ) : (
          editedItem.name
        )}
      </td>
      <td className="tdprice">
        {isEditing ? (
          <input
            type="text"
            name="price"
            value={editedItem.price}
            onChange={handleChange}
            placeholder="Enter Price"
          />
        ) : (
          editedItem.price
        )}
      </td>
      <td className="tdphoto">
        {editedItem.image ? (
          <img src={editedItem.image} alt="Item" width="50" height="50" />
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
        <button className="delete-btn" onClick={() => onDelete(item._id)}>
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

export default ItemManagementCard;
