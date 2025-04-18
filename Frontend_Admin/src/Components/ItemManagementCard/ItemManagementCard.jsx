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

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleOptionsChange = (e) => {
    const options = e.target.value.split(",").map((opt) => opt.trim());
    setEditedItem({ ...editedItem, options });
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
    onSave(editedItem);
    setIsEditing(false);
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
      <td className="tdoptions">
        {isEditing ? (
          <input
            type="text"
            name="options"
            value={editedItem.options.join(", ")}
            onChange={handleOptionsChange}
            placeholder="Enter options (comma-separated)"
          />
        ) : editedItem.options.length > 0 ? (
          editedItem.options.join(", ")
        ) : (
          "No options"
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
          <button className="add-item-btn" onClick={onAdd}>
            <i className="bi bi-plus-circle" />
            <span className="text-add">Add New Item</span>
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default ItemManagementCard;
