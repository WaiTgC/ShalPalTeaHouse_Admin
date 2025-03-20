import React, { useState } from "react";

const EmployeeManagementCard = ({
  index,
  employee,
  onDelete,
  onSave,
  showAddButton = false,
  onAdd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  const handleChange = (e) => {
    setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (
      !editedEmployee.name ||
      !editedEmployee.Role ||
      !editedEmployee.Section ||
      !editedEmployee.Phone
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }
    console.log("Saving employee:", editedEmployee);
    onSave(editedEmployee);
    setIsEditing(false);
  };

  return (
    <tr>
      <td style={{ width: 110 }}>{index}.</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedEmployee.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        ) : (
          editedEmployee.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="Role"
            value={editedEmployee.Role}
            onChange={handleChange}
            placeholder="Enter Role"
          />
        ) : (
          editedEmployee.Role
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="Section"
            value={editedEmployee.Section}
            onChange={handleChange}
            placeholder="Enter Section"
          />
        ) : (
          editedEmployee.Section
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="Phone"
            value={editedEmployee.Phone}
            onChange={handleChange}
            placeholder="Enter Phone"
          />
        ) : (
          editedEmployee.Phone
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
        <button className="delete-btn" onClick={() => onDelete(employee._id)}>
          Delete
        </button>
      </td>
      <td className="actions" style={{ border: "none" }}>
        {showAddButton ? (
          <button className="add-employee-btn" onClick={onAdd}>
            <i className="bi bi-plus-circle" />
            <span className="text-add">Add New Employee</span>
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default EmployeeManagementCard;
