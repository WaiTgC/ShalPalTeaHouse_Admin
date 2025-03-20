import React, { useState } from "react";
import EmployeeManagementCard from "../EmployeeManagementCard/EmployeeManagementCard";
import "./EmployeeManagementDisplay.css";
import { employees } from "../../assets/assets";

const EmployeeManagementDisplay = () => {
  const [employeeList, setEmployeeList] = useState(employees);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    Role: "",
    Section: "",
    Phone: "",
  });

  const closeAlert = () => {
    setShowAlertBox(false);
    setNewEmployee({ name: "", Role: "", Section: "", Phone: "" });
  };

  const handleAddEmployee = () => {
    setShowAlertBox(true);
  };

  const handleAlertBoxSubmit = () => {
    if (
      newEmployee.name &&
      newEmployee.Role &&
      newEmployee.Section &&
      newEmployee.Phone
    ) {
      const newEmployeeData = {
        _id: (employeeList.length + 1).toString(),
        name: newEmployee.name.trim(),
        Role: newEmployee.Role.trim(),
        Section: newEmployee.Section.trim(),
        Phone: newEmployee.Phone.trim(),
      };

      // Check for duplicate phone numbers (optional validation)
      const phoneExists = employeeList.some(
        (emp) => emp.Phone === newEmployeeData.Phone
      );
      if (phoneExists) {
        alert("An employee with this phone number already exists!");
        return;
      }

      setEmployeeList([...employeeList, newEmployeeData]);
      setShowAlertBox(false);
      setNewEmployee({ name: "", Role: "", Section: "", Phone: "" });
      alert("Employee added successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleAlertBoxCancel = () => {
    setShowAlertBox(false);
    setNewEmployee({ name: "", Role: "", Section: "", Phone: "" });
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  const handleSave = (updatedEmployee) => {
    console.log("Received updated Employee:", updatedEmployee);
    setEmployeeList(
      employeeList.map((emp) =>
        emp._id === updatedEmployee._id ? { ...emp, ...updatedEmployee } : emp
      )
    );
    alert("Employee saved successfully!");
  };

  const handleDelete = (id) => {
    console.log("Deleting employee with ID:", id);
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployeeList(employeeList.filter((emp) => emp._id !== id));
      alert("Employee deleted successfully!");
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
              <th>Role</th>
              <th>Section</th>
              <th>Phone</th>
              <th colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <EmployeeManagementCard
                key={employee._id}
                index={index + 1}
                employee={employee}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSave}
                showAddButton={index === employeeList.length - 1}
                onAdd={handleAddEmployee}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showAlertBox && (
        <div className="alert-box-employee">
          <div className="alert-box-employee-content">
            <i onClick={closeAlert} className="bi bi-x-lg" />
            <h3>Add New Employee</h3>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              placeholder="Enter employee name"
              className="alert-box-employee-input"
            />
            <input
              type="text"
              value={newEmployee.Role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, Role: e.target.value })
              }
              placeholder="Enter role"
              className="alert-box-employee-input"
            />
            <input
              type="text"
              value={newEmployee.Section}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, Section: e.target.value })
              }
              placeholder="Enter section"
              className="alert-box-employee-input"
            />
            <input
              type="text"
              value={newEmployee.Phone}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, Phone: e.target.value })
              }
              placeholder="Enter phone number"
              className="alert-box-employee-input"
            />
            <div className="alert-box-employee-buttons">
              <button onClick={handleAlertBoxSubmit}>Confirm</button>
              <button onClick={handleAlertBoxCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagementDisplay;
