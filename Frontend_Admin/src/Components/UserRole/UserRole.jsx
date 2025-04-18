import React, { useState, useEffect, useCallback } from "react";
import "./UserRole.css";

// Mock initial roles and permissions (replace with API data in a real app)
const initialRolesPermissions = {
  Admin: {
    login: true,
    createOrder: true,
    orderManagement: true,
    tableManagement: true,
    itemManagement: true,
    category: true,
    checkout: true,
    userRoleManagement: true,
    employeeManagement: true,
    paymentTaxSetting: true,
    salesReport: true,
    devices: true,
    setReceipt: true,
  },
  Manager: {
    login: true,
    createOrder: true,
    orderManagement: true,
    tableManagement: true,
    itemManagement: true,
    category: true,
    checkout: true,
    userRoleManagement: false,
    employeeManagement: true,
    paymentTaxSetting: false,
    salesReport: true,
    devices: false,
    setReceipt: false,
  },
  Cashier: {
    login: true,
    createOrder: true,
    orderManagement: true,
    tableManagement: false,
    itemManagement: false,
    category: false,
    checkout: true,
    userRoleManagement: false,
    employeeManagement: false,
    paymentTaxSetting: false,
    salesReport: false,
    devices: false,
    setReceipt: false,
  },
  Viewer: {
    login: true,
    createOrder: false,
    orderManagement: false,
    tableManagement: false,
    itemManagement: false,
    category: false,
    checkout: false,
    userRoleManagement: false,
    employeeManagement: false,
    paymentTaxSetting: false,
    salesReport: true,
    devices: false,
    setReceipt: false,
  },
};

// Define all possible permissions based on the image
const allPermissions = [
  { key: "login", label: "Log in" },
  { key: "createOrder", label: "Create Order" },
  { key: "orderManagement", label: "Order Management" },
  { key: "tableManagement", label: "Table Management" },
  { key: "itemManagement", label: "Item Management" },
  { key: "category", label: "Category" },
  { key: "checkout", label: "Checkout" },
  { key: "userRoleManagement", label: "User Role and Management" },
  { key: "employeeManagement", label: "Employee Management" },
  { key: "paymentTaxSetting", label: "Payment and Tax Setting" },
  { key: "salesReport", label: "Sales Report" },
  { key: "devices", label: "Devices" },
  { key: "setReceipt", label: "Set Receipt" },
];

const UserRole = () => {
  const [rolesPermissions, setRolesPermissions] = useState(
    initialRolesPermissions
  );
  const [availableRoles, setAvailableRoles] = useState(
    Object.keys(initialRolesPermissions)
  );
  const [selectedRole, setSelectedRole] = useState(availableRoles[0] || "");
  const [currentPermissions, setCurrentPermissions] = useState({});
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [addRoleError, setAddRoleError] = useState("");
  const [isDirty, setIsDirty] = useState(false); // Track unsaved changes

  // Effect to load permissions when selectedRole changes
  useEffect(() => {
    if (selectedRole && rolesPermissions[selectedRole]) {
      setCurrentPermissions({ ...rolesPermissions[selectedRole] });
      setIsDirty(false); // Reset dirty state on role change
    } else {
      setCurrentPermissions({}); // Handle case where role might not exist initially
    }
  }, [selectedRole, rolesPermissions]);

  const handleRoleChange = (event) => {
    if (isDirty) {
      if (
        !window.confirm(
          "You have unsaved changes. Are you sure you want to switch roles? Changes will be lost."
        )
      ) {
        return; // User cancelled switching
      }
    }
    setSelectedRole(event.target.value);
  };

  const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setCurrentPermissions((prev) => ({ ...prev, [name]: checked }));
    setIsDirty(true); // Mark changes as unsaved
  };

  const handleSaveChanges = () => {
    if (!selectedRole) return;
    console.log(
      `Saving permissions for role: ${selectedRole}`,
      currentPermissions
    );
    setRolesPermissions((prev) => ({
      ...prev,
      [selectedRole]: { ...currentPermissions },
    }));
    setIsDirty(false);
    alert(`Permissions for ${selectedRole} saved successfully!`);
  };

  // --- Add Role Modal Logic ---
  const handleAddRoleClick = () => {
    setNewRoleName("");
    setAddRoleError("");
    setIsAddRoleModalOpen(true);
  };

  const closeAddRoleModal = () => {
    setIsAddRoleModalOpen(false);
  };

  const handleNewRoleNameChange = (e) => {
    setNewRoleName(e.target.value);
    if (addRoleError) setAddRoleError(""); // Clear error on typing
  };

  const handleAddRoleSubmit = () => {
    const trimmedName = newRoleName.trim();
    if (trimmedName === "") {
      setAddRoleError("Role name cannot be empty.");
      return;
    }
    if (rolesPermissions[trimmedName]) {
      setAddRoleError(`Role "${trimmedName}" already exists.`);
      return;
    }

    // Add the new role with default (no) permissions
    const defaultPermissions = allPermissions.reduce((acc, perm) => {
      acc[perm.key] = false; // Start with no permissions for new roles
      return acc;
    }, {});

    console.log(`Adding new role: ${trimmedName}`);
    setRolesPermissions((prev) => ({
      ...prev,
      [trimmedName]: defaultPermissions,
    }));
    setAvailableRoles((prev) => [...prev, trimmedName]);
    setSelectedRole(trimmedName); // Select the newly added role
    closeAddRoleModal();
    alert(`Role "${trimmedName}" added successfully!`);
  };

  // --- Delete Role Logic ---
  const handleDeleteRole = () => {
    if (!selectedRole || availableRoles.length <= 1) {
      alert("Cannot delete the only role or no role is selected.");
      return;
    }
    if (selectedRole === "Admin") {
      alert("Cannot delete the default Admin role.");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete the role "${selectedRole}"? This action cannot be undone.`
      )
    ) {
      console.log(`Deleting role: ${selectedRole}`);
      const updatedRolesPermissions = { ...rolesPermissions };
      delete updatedRolesPermissions[selectedRole];
      setRolesPermissions(updatedRolesPermissions);

      const updatedAvailableRoles = availableRoles.filter(
        (role) => role !== selectedRole
      );
      setAvailableRoles(updatedAvailableRoles);

      setSelectedRole(updatedAvailableRoles[0] || "");
      setIsDirty(false);
      alert(`Role "${selectedRole}" deleted successfully!`);
    }
  };

  return (
    <div className="user-role-management-container ">
      <h3>User Role Management</h3>
      <div className="user-role-controls">
        {/* Role Selection */}
        <div className="role-selection-group">
          <label htmlFor="roleSelect">Select Role:</label>
          <select
            id="roleSelect"
            className="form-select"
            value={selectedRole}
            onChange={handleRoleChange}
            aria-label="Select Role"
          >
            {availableRoles.length === 0 && (
              <option disabled>No roles available</option>
            )}
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button
            onClick={handleDeleteRole}
            className="delete-role-button"
            disabled={
              !selectedRole ||
              availableRoles.length <= 1 ||
              selectedRole === "Admin"
            }
            title={
              selectedRole === "Admin"
                ? "Cannot delete Admin role"
                : "Delete selected role"
            }
          >
            Delete Role
          </button>
        </div>

        {/* Permissions */}
        <div className="permissions-group">
          <h4>Function Permission for {selectedRole || "..."}</h4>
          {selectedRole ? (
            <div className="permissions-checkboxes">
              {allPermissions.map((perm) => (
                <div className="form-check" key={perm.key}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={perm.key}
                    id={`perm-${perm.key}`}
                    checked={currentPermissions[perm.key] || false}
                    onChange={handlePermissionChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`perm-${perm.key}`}
                  >
                    {perm.label}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p>Select a role to view or edit permissions.</p>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="user-role-actions">
        <button className="add-new-role-button" onClick={handleAddRoleClick}>
          <span>+ Add New Role</span>
        </button>
        <button
          className="save-changes-button"
          onClick={handleSaveChanges}
          disabled={!isDirty || !selectedRole}
        >
          Save Changes
        </button>
      </div>
      {/* Add Role Modal */}
      {isAddRoleModalOpen && (
        <div className="modal-overlay-role">
          <div className="modal-content-role">
            <button
              onClick={closeAddRoleModal}
              className="modal-close-button-role"
              aria-label="Close modal"
            >
              ×
            </button>
            <h3>Add New Role</h3>
            <div className="form-group-role">
              <label htmlFor="newRoleNameInput">Role Name:</label>
              <input
                id="newRoleNameInput"
                type="text"
                value={newRoleName}
                onChange={handleNewRoleNameChange}
                placeholder="Enter unique role name"
                className="form-input-role"
                autoFocus
              />
            </div>
            {addRoleError && (
              <p className="error-message-role">{addRoleError}</p>
            )}
            <div className="modal-actions-role">
              <button
                onClick={handleAddRoleSubmit}
                className="confirm-button-role"
              >
                Confirm
              </button>
              <button
                onClick={closeAddRoleModal}
                className="cancel-button-role"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRole;
