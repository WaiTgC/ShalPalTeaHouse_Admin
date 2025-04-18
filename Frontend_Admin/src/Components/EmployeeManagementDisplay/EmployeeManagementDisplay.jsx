import React, { useState, useEffect } from "react";
import EmployeeManagementCard from "../EmployeeManagementCard/EmployeeManagementCard";
import "./EmployeeManagementDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";

const EmployeeManagementDisplay = () => {
  const { employeeList, addEmployee, updateEmployee, deleteEmployee } =
    useOrderContext();
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    shift: "Morning",
    email: "",
    phone: "",
    pinCode: "",
    status: "On",
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    name: "",
    position: "",
    startDate: "",
    dateOfBirth: "",
    pinCode: "",
    idCardNumber: "",
    gender: "Male",
    profileImage: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // console.log(
    //   "Employee list updated from context:",
    //   JSON.stringify(employeeList, null, 2)
    // );
  }, [employeeList]);

  const validateNewEmployeeForm = () => {
    const newErrors = {};
    if (!newEmployee.name.trim()) newErrors.name = "Employee Name is required";
    if (!newEmployee.employeeId.trim())
      newErrors.employeeId = "Employee ID is required";
    if (!newEmployee.email.trim())
      newErrors.email = "Email Address is required";
    if (!newEmployee.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!newEmployee.pinCode.trim()) newErrors.pinCode = "Pin Code is required";

    console.log(
      "Validation errors for Add New Employee:",
      JSON.stringify(newErrors, null, 2)
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAdvancedSettingsForm = () => {
    const newErrors = {};
    if (!advancedSettings.name.trim())
      newErrors.name = "Employee Name is required";
    if (!advancedSettings.position.trim())
      newErrors.position = "Job Position is required";
    if (!advancedSettings.startDate)
      newErrors.startDate = "Start Date is required";
    if (!advancedSettings.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!advancedSettings.pinCode.trim())
      newErrors.pinCode = "Pin Code is required";
    if (!advancedSettings.idCardNumber.trim())
      newErrors.idCardNumber = "ID Card Number is required";

    console.log(
      "Validation errors for Advanced Settings:",
      JSON.stringify(newErrors, null, 2)
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeAlert = () => {
    console.log("Closing Add New Employee form");
    setShowAlertBox(false);
    setNewEmployee({
      name: "",
      employeeId: "",
      shift: "Morning",
      email: "",
      phone: "",
      pinCode: "",
      status: "On",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const closeAdvancedSettings = () => {
    console.log("Closing Advanced Settings form");
    setShowAdvancedSettings(false);
    setAdvancedSettings({
      name: "",
      position: "",
      startDate: "",
      dateOfBirth: "",
      pinCode: "",
      idCardNumber: "",
      gender: "Male",
      profileImage: null,
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleAddEmployee = () => {
    console.log("Opening Add New Employee form");
    setShowAlertBox(true);
  };

  const handleAdvancedSettings = () => {
    console.log("Opening Advanced Settings form");
    setShowAdvancedSettings(true);
  };

  const handleAlertBoxSubmit = () => {
    console.log(
      "Submitting Add New Employee form with data:",
      JSON.stringify(newEmployee, null, 2)
    );

    const isValid = validateNewEmployeeForm();
    console.log("Is Add New Employee form valid?", isValid);
    if (!isValid) {
      console.log("Validation failed for Add New Employee form");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    const phoneExists = employeeList.some(
      (emp) => emp.phone === newEmployee.phone.trim()
    );
    if (phoneExists) {
      console.log("Phone number already exists:", newEmployee.phone);
      setErrors({
        ...errors,
        phone: "An employee with this phone number already exists!",
      });
      setIsSubmitting(false);
      return;
    }

    const idExists = employeeList.some(
      (emp) => emp.employeeId === newEmployee.employeeId.trim()
    );
    if (idExists) {
      console.log("Employee ID already exists:", newEmployee.employeeId);
      setErrors({
        ...errors,
        employeeId: "An employee with this ID already exists!",
      });
      setIsSubmitting(false);
      return;
    }

    const newEmployeeData = {
      _id: Date.now().toString(),
      name: newEmployee.name.trim(),
      employeeId: newEmployee.employeeId.trim(),
      shift: newEmployee.shift,
      email: newEmployee.email.trim(),
      phone: newEmployee.phone.trim(),
      pinCode: newEmployee.pinCode.trim(),
      status: newEmployee.status,
    };

    console.log(
      "Adding new employee to context:",
      JSON.stringify(newEmployeeData, null, 2)
    );
    addEmployee(newEmployeeData);
    console.log(
      "Employee added, new employeeList should be:",
      JSON.stringify([...employeeList, newEmployeeData], null, 2)
    );

    closeAlert();
    alert("Employee added successfully!");
    setIsSubmitting(false);
  };

  const handleAdvancedSettingsNameChange = (e) => {
    const name = e.target.value;
    setAdvancedSettings({ ...advancedSettings, name });

    const employee = employeeList.find(
      (emp) => emp.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (employee) {
      console.log(
        "Found employee to pre-populate:",
        JSON.stringify(employee, null, 2)
      );
      setAdvancedSettings({
        name: employee.name,
        position: employee.position || "",
        startDate: employee.startDate || "",
        dateOfBirth: employee.dateOfBirth || "",
        pinCode: employee.pinCode || "",
        idCardNumber: employee.idCardNumber || "",
        gender: employee.gender || "Male",
        profileImage: employee.profileImage || null,
      });
      setErrors({});
    } else {
      console.log("No employee found for name:", name);
      setAdvancedSettings({
        name,
        position: "",
        startDate: "",
        dateOfBirth: "",
        pinCode: "",
        idCardNumber: "",
        gender: "Male",
        profileImage: null,
      });
      setErrors({ name: "Employee with this name does not exist!" });
    }
  };

  const handleAdvancedSettingsSubmit = () => {
    console.log(
      "Submitting Advanced Settings form with data:",
      JSON.stringify(advancedSettings, null, 2)
    );

    const isValid = validateAdvancedSettingsForm();
    console.log("Is Advanced Settings form valid?", isValid);
    if (!isValid) {
      console.log("Validation failed for Advanced Settings form");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    const employeeToUpdate = employeeList.find(
      (emp) =>
        emp.name.toLowerCase() === advancedSettings.name.trim().toLowerCase()
    );
    if (!employeeToUpdate) {
      console.log("Employee not found:", advancedSettings.name);
      setErrors({ ...errors, name: "Employee with this name does not exist!" });
      setIsSubmitting(false);
      return;
    }

    const updatedEmployeeData = {
      ...employeeToUpdate,
      position: advancedSettings.position.trim(),
      pinCode: advancedSettings.pinCode.trim(),
      startDate: advancedSettings.startDate,
      dateOfBirth: advancedSettings.dateOfBirth,
      idCardNumber: advancedSettings.idCardNumber.trim(),
      gender: advancedSettings.gender,
      profileImage: advancedSettings.profileImage,
    };

    console.log(
      "Updating employee with advanced settings:",
      JSON.stringify(updatedEmployeeData, null, 2)
    );
    updateEmployee(updatedEmployeeData);

    closeAdvancedSettings();
    alert("Advanced settings saved successfully!");
    setIsSubmitting(false);
  };

  const handleAlertBoxCancel = () => {
    console.log("Canceling Add New Employee form");
    closeAlert();
  };

  const handleAdvancedSettingsCancel = () => {
    console.log("Canceling Advanced Settings form");
    closeAdvancedSettings();
  };

  const handleEdit = (id) => {
    console.log(`Editing employee with ID: ${id}`);
    alert(`Edit employee with ID: ${id}`);
  };

  const handleSave = (updatedEmployee) => {
    console.log(
      "Saving updated employee:",
      JSON.stringify(updatedEmployee, null, 2)
    );
    updateEmployee(updatedEmployee);
    alert("Employee saved successfully!");
  };

  const handleDelete = (id) => {
    console.log("Deleting employee with ID:", id);
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
      alert("Employee deleted successfully!");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("Image uploaded:", imageUrl);
      setAdvancedSettings({ ...advancedSettings, profileImage: imageUrl });
    }
  };

  return (
    <div className="employee-management-container">
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>

              <th>Position</th>
              <th>Shift</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            ) : (
              employeeList.map((employee, index) => (
                <EmployeeManagementCard
                  key={employee._id}
                  index={index + 1}
                  employee={employee}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onSave={handleSave}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="add-employee-button-container">
        <button className="add-employee-btn" onClick={handleAddEmployee}>
          <i className="bi bi-plus-circle" />
          <span className="text-add">Add New Employee</span>
        </button>
        <button
          className="advancedsettings-btn"
          onClick={handleAdvancedSettings}
        >
          <span className="text-add">Advanced Settings</span>
        </button>
      </div>

      {showAlertBox && (
        <div className="alert-box-employee">
          <div className="alert-box-employee-content">
            <div className="alert-box-employee-header">
              <i onClick={closeAlert} className="bi bi-x-lg" />
              <h3>Add New Employee</h3>
            </div>
            <div className="input-group">
              <label>Employee Name</label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                placeholder="Enter employee name"
                className={`alert-box-employee-input ${
                  errors.name ? "error" : ""
                }`}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="input-group">
              <label>Employee ID</label>
              <input
                type="text"
                value={newEmployee.employeeId}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, employeeId: e.target.value })
                }
                placeholder="Enter employee ID"
                className={`alert-box-employee-input ${
                  errors.employeeId ? "error" : ""
                }`}
              />
              {errors.employeeId && (
                <span className="error-message">{errors.employeeId}</span>
              )}
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                placeholder="Enter email address"
                className={`alert-box-employee-input ${
                  errors.email ? "error" : ""
                }`}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="input-group">
              <label>Choose Shift</label>
              <select
                value={newEmployee.shift}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, shift: e.target.value })
                }
                className="alert-box-employee-input"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <div className="input-group">
              <label>Pin Code</label>
              <input
                type="text"
                value={newEmployee.pinCode}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, pinCode: e.target.value })
                }
                placeholder="Enter pin code"
                className={`alert-box-employee-input ${
                  errors.pinCode ? "error" : ""
                }`}
              />
              {errors.pinCode && (
                <span className="error-message">{errors.pinCode}</span>
              )}
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                value={newEmployee.phone}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, phone: e.target.value })
                }
                placeholder="Enter phone number"
                className={`alert-box-employee-input ${
                  errors.phone ? "error" : ""
                }`}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
            <div className="input-group">
              <label>Status</label>
              <select
                value={newEmployee.status}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, status: e.target.value })
                }
                className="alert-box-employee-input"
              >
                <option value="On">On</option>
                <option value="Off">Off</option>
              </select>
            </div>
            <div className="alert-box-employee-buttons">
              <button onClick={handleAlertBoxSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Confirm"}
              </button>
              <button onClick={handleAlertBoxCancel} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdvancedSettings && (
        <div className="alert-box-employee">
          <div className="alert-box-employee-content">
            <div className="alert-box-employee-header">
              <i onClick={closeAdvancedSettings} className="bi bi-x-lg" />
              <h3>Advanced Settings</h3>
            </div>
            <div className="input-group">
              <label>Employee Name</label>
              <input
                type="text"
                value={advancedSettings.name}
                onChange={handleAdvancedSettingsNameChange}
                placeholder="Enter employee name"
                className={`alert-box-employee-input ${
                  errors.name ? "error" : ""
                }`}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="input-group">
              <label>Job Position</label>
              <input
                type="text"
                value={advancedSettings.position}
                onChange={(e) =>
                  setAdvancedSettings({
                    ...advancedSettings,
                    position: e.target.value,
                  })
                }
                placeholder="Enter job position"
                className={`alert-box-employee-input ${
                  errors.position ? "error" : ""
                }`}
              />
              {errors.position && (
                <span className="error-message">{errors.position}</span>
              )}
            </div>
            <div className="input-group">
              <label>Employee's Start Date</label>
              <input
                type="date"
                value={advancedSettings.startDate}
                onChange={(e) =>
                  setAdvancedSettings({
                    ...advancedSettings,
                    startDate: e.target.value,
                  })
                }
                className={`alert-box-employee-input ${
                  errors.startDate ? "error" : ""
                }`}
              />
              {errors.startDate && (
                <span className="error-message">{errors.startDate}</span>
              )}
            </div>
            <div className="input-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={advancedSettings.dateOfBirth}
                onChange={(e) =>
                  setAdvancedSettings({
                    ...advancedSettings,
                    dateOfBirth: e.target.value,
                  })
                }
                className={`alert-box-employee-input ${
                  errors.dateOfBirth ? "error" : ""
                }`}
              />
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>
            <div className="input-group">
              <label>Pin Code</label>
              <input
                type="text"
                value={advancedSettings.pinCode}
                onChange={(e) =>
                  setAdvancedSettings({
                    ...advancedSettings,
                    pinCode: e.target.value,
                  })
                }
                placeholder="Enter pin code"
                className={`alert-box-employee-input ${
                  errors.pinCode ? "error" : ""
                }`}
              />
              {errors.pinCode && (
                <span className="error-message">{errors.pinCode}</span>
              )}
            </div>
            <div className="input-group">
              <label>ID Card Number</label>
              <input
                type="text"
                value={advancedSettings.idCardNumber}
                onChange={(e) =>
                  setAdvancedSettings({
                    ...advancedSettings,
                    idCardNumber: e.target.value,
                  })
                }
                placeholder="Enter ID card number"
                className={`alert-box-employee-input ${
                  errors.idCardNumber ? "error" : ""
                }`}
              />
              {errors.idCardNumber && (
                <span className="error-message">{errors.idCardNumber}</span>
              )}
            </div>
            <div className="input-group">
              <label>Gender</label>
              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={advancedSettings.gender === "Male"}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        gender: e.target.value,
                      })
                    }
                  />
                  <span className="custom-radio"></span>
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={advancedSettings.gender === "Female"}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        gender: e.target.value,
                      })
                    }
                  />
                  <span className="custom-radio"></span>
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    checked={advancedSettings.gender === "Others"}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        gender: e.target.value,
                      })
                    }
                  />
                  <span className="custom-radio"></span>
                  Others
                </label>
              </div>
            </div>
            <div className="input-group">
              <label>Profile Image</label>
              <div className="image-upload-box">
                {advancedSettings.profileImage ? (
                  <img
                    src={advancedSettings.profileImage}
                    alt="Profile Preview"
                    className="profile-image-preview"
                  />
                ) : (
                  <div className="image-placeholder">
                    <label htmlFor="image-upload">
                      <i className="bi bi-plus" />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="alert-box-employee-buttons">
              <button
                onClick={handleAdvancedSettingsSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm"}
              </button>
              <button
                onClick={handleAdvancedSettingsCancel}
                disabled={isSubmitting}
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

export default EmployeeManagementDisplay;
