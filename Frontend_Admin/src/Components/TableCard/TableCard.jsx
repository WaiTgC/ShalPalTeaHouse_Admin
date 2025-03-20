import React, { useState } from "react";
import "./TableCard.css";
import { assets } from "../../assets/assets";

const TableCard = ({ name, onDelete }) => {
  const [showTableDelete, setShowTableDelete] = useState(false);
  const [showTableEdit, setShowTableEdit] = useState(false);

  const showDelete = () => {
    setShowTableDelete(true);
  };
  const showEdit = () => {
    setShowTableEdit(true);
  };

  const closeAlert = () => {
    setShowTableDelete(false);
    setShowTableEdit(false);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(name);
    }
    closeAlert();
  };

  return (
    <div className="tablecard">
      <span className="tablecard-name">{name}</span>
      <img src={assets.campchair} alt="logo" />
      <div className="tablecard-details">
        <span onClick={showDelete} className="delete-text">
          Delete
        </span>
        <span onClick={showEdit} className="edit-text">
          Edit
        </span>
      </div>
      {showTableDelete && (
        <div className="alert-overlay-delete">
          <div className="alert-box-delete">
            <i onClick={closeAlert} className="bi bi-x-lg"></i>
            <p>Are you sure you want to delete?</p>
            <div className="alert-buttons">
              <i
                onClick={handleDeleteConfirm}
                className="bi bi-check-circle"
              ></i>
              <i onClick={closeAlert} className="bi bi-x-circle"></i>
            </div>
          </div>
        </div>
      )}
      {showTableEdit && (
        <div className="alert-overlay-edit">
          <div className="alert-box-edit">
            <div className="logotext-edit">
              <h2>SHAL PAL</h2> <span>Tea House</span>
            </div>
            <i onClick={closeAlert} className="bi bi-x-lg"></i>
            <span className="table-number-text">Table Number:</span>
            <input
              type="text"
              className="form-control"
              placeholder="Input Table Number"
            />
            <hr />
            <span>Table Qr:</span>
            <span className="get-Qr">Click here</span>
            <hr />
            <button>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCard;
