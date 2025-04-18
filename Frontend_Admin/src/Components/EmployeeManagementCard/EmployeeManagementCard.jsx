import React, { useState, useEffect } from "react";

const EmployeeManagementCard = ({ index, employee, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });
  const [isToggled, setIsToggled] = useState(employee.status === "On");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync editedEmployee with employee prop when it changes
  useEffect(() => {
    setEditedEmployee({ ...employee });
    setIsToggled(employee.status === "On");
  }, [employee]);

  const handleChange = (e) => {
    setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsToggled((prev) => {
      const newToggled = !prev;
      const newStatus = newToggled ? "On" : "Off";
      const updatedEmployee = { ...editedEmployee, status: newStatus };
      setEditedEmployee(updatedEmployee);
      onSave(updatedEmployee);
      return newToggled;
    });
  };

  const handleSave = () => {
    if (
      !editedEmployee.name ||
      !editedEmployee.shift ||
      !editedEmployee.email ||
      !editedEmployee.phone
    ) {
      alert(
        "Please fill in all required fields (Name, Shift, Email, Phone) before saving."
      );
      return;
    }
    onSave(editedEmployee);
    setIsEditing(false);
  };

  const toggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  return (
    <>
      <tr>
        <td>{index}.</td>
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
            <span onClick={toggleAdvanced} style={{ cursor: "pointer" }}>
              {editedEmployee.name}
            </span>
          )}
        </td>
        {/* Removed employeeId from main row */}
        <td>
          {isEditing ? (
            <input
              type="text"
              name="position"
              value={editedEmployee.position || ""}
              onChange={handleChange}
              placeholder="Enter Position"
            />
          ) : (
            editedEmployee.position || "N/A"
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="shift"
              value={editedEmployee.shift}
              onChange={handleChange}
              placeholder="Enter Shift"
            />
          ) : (
            editedEmployee.shift
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={editedEmployee.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          ) : (
            editedEmployee.email
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedEmployee.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
            />
          ) : (
            editedEmployee.phone
          )}
        </td>
        <td>
          {isEditing ? (
            <select
              name="status"
              value={editedEmployee.status}
              onChange={handleChange}
            >
              <option value="On">On</option>
              <option value="Off">Off</option>
            </select>
          ) : (
            <label className="switch">
              <input
                type="checkbox"
                checked={isToggled}
                onChange={handleToggle}
              />
              <span className="slider round"></span>
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
          <button className="delete-btn" onClick={() => onDelete(employee._id)}>
            Delete
          </button>
        </td>
      </tr>
      {showAdvanced && (
        <tr>
          <td colSpan="9">
            {" "}
            <div className="advanced-details">
              <p>
                <strong>Employee ID:</strong>{" "}
                {editedEmployee.employeeId || "N/A"}
              </p>
              <p>
                <strong>Start Date:</strong> {editedEmployee.startDate || "N/A"}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {editedEmployee.dateOfBirth || "N/A"}
              </p>
              <p>
                <strong>ID Card Number:</strong>{" "}
                {editedEmployee.idCardNumber || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {editedEmployee.gender || "N/A"}
              </p>
              {editedEmployee.profileImage && (
                <p>
                  <strong>Profile Image:</strong>
                  <img
                    src={editedEmployee.profileImage}
                    alt="Profile"
                    style={{ width: "50px", height: "50px" }}
                  />
                </p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default EmployeeManagementCard;
