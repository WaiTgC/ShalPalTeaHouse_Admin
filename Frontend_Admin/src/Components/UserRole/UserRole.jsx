import React, { useState } from "react";
import "./UserRole.css";

const UserRole = () => {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [permissions, setPermissions] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
  });

  const [showAlertBox, setShowAlertBox] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [roles, setRoles] = useState(["Admin", "Editor", "Viewer"]); // State to store roles dynamically

  const handleAddRole = () => {
    setShowAlertBox(true); // Show custom alert box
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prev) => ({ ...prev, [name]: checked }));
  };

  const closeAlert = () => {
    setShowAlertBox(false);
    setNewRoleName(""); // Clear input field on close
  };

  const handleAlertBoxSubmit = () => {
    if (newRoleName.trim() === "") {
      alert("Please enter a role name.");
      return;
    }
    // Add the new role to the roles array
    setRoles((prevRoles) => [...prevRoles, newRoleName]);
    setSelectedRole(newRoleName); // Optionally set the new role as selected
    setShowAlertBox(false); // Close the alert box
    setNewRoleName(""); // Clear the input field
  };

  const handleAlertBoxCancel = () => {
    setShowAlertBox(false); // Close the alert box
    setNewRoleName(""); // Clear the input field
  };

  return (
    <div className="UserRole-Content-Container">
      <div className="UserRole-Card">
        <div className="UserRole-content">
          <div className="role-choose-container">
            <select
              className="form-select"
              value={selectedRole}
              onChange={handleRoleChange}
              aria-label="Select Role"
            >
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="permission-button-container">
            <h4>Permissions</h4>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="view"
                id="view"
                checked={permissions.view}
                onChange={handlePermissionChange}
              />
              <label className="form-check-label" htmlFor="view">
                View
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="create"
                id="create"
                checked={permissions.create}
                onChange={handlePermissionChange}
              />
              <label className="form-check-label" htmlFor="create">
                Create
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="edit"
                id="edit"
                checked={permissions.edit}
                onChange={handlePermissionChange}
              />
              <label className="form-check-label" htmlFor="edit">
                Edit
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="delete"
                id="delete"
                checked={permissions.delete}
                onChange={handlePermissionChange}
              />
              <label className="form-check-label" htmlFor="delete">
                Delete
              </label>
            </div>
          </div>
        </div>

        <div className="Add-Confirm">
          <button className="add-newrole" onClick={handleAddRole}>
            <i className="bi bi-plus-circle" />
            <span className="text-add">Add New Role</span>
          </button>

          <button className="btn btn-success">Confirm</button>
        </div>

        {showAlertBox && (
          <div className="custom-alert-box-role">
            <div className="alert-box-role">
              <i onClick={closeAlert} className="bi bi-x-lg" />
              <h3>Enter Role Name</h3>
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
                className="alert-box-input-role"
              />
              <div className="alert-box-buttons-role">
                <button onClick={handleAlertBoxSubmit}>Confirm</button>
                <button onClick={handleAlertBoxCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRole;
