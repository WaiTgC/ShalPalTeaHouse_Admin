import React, { useState, useEffect } from "react";
import { useOrderContext } from "../../Context/OrderProvider";
import "./PaymentTaxSetting.css";

// --- Inlined Switch Component ---
const SwitchComponent = ({ isOn, handleToggle, id }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="inline-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? "#06D6A0" : "#ccc" }}
        className="inline-switch-label"
        htmlFor={id}
      >
        <span className="inline-switch-button" />
      </label>
    </>
  );
};

// --- Inlined Modal Component ---
const ModalComponent = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="inline-modal-overlay" onClick={handleOverlayClick}>
      <div className="inline-modal-content">
        <button
          className="inline-modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// --- Main PaymentTaxSetting Component ---
const PaymentTaxSetting = () => {
  const {
    paymentOptions,
    handlePaymentToggle,
    addPaymentOption,
    editPaymentOption,
    deletePaymentOption,
    taxes,
    handleTaxToggle,
    addTax,
    editTax,
    deleteTax,
    charges,
    handleChargeToggle,
    addCharge,
    editCharge,
    deleteCharge,
    discounts,
    handleDiscountToggle,
    addDiscount,
    editDiscount,
    deleteDiscount,
  } = useOrderContext();

  // Modal States
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  // Form States
  const [newPaymentOptionName, setNewPaymentOptionName] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [editingPayment, setEditingPayment] = useState(null);
  const [editPaymentName, setEditPaymentName] = useState("");
  const [editPaymentEnabled, setEditPaymentEnabled] = useState(true);
  const [editShowImageInInvoice, setEditShowImageInInvoice] = useState(false);
  const [editPaymentImage, setEditPaymentImage] = useState(null);
  const [editPaymentError, setEditPaymentError] = useState("");
  const [editingTax, setEditingTax] = useState(null);
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [taxError, setTaxError] = useState("");
  const [editingCharge, setEditingCharge] = useState(null);
  const [chargeName, setChargeName] = useState("");
  const [chargeRate, setChargeRate] = useState("");
  const [chargeEnabled, setChargeEnabled] = useState(true);
  const [chargeError, setChargeError] = useState("");
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [discountName, setDiscountName] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountEnabled, setDiscountEnabled] = useState(true);
  const [discountError, setDiscountError] = useState("");

  // Effects for Modal Form Reset
  useEffect(() => {
    if (isEditPaymentModalOpen && editingPayment) {
      setEditPaymentName(editingPayment.name);
      setEditPaymentEnabled(editingPayment.enabled);
      setEditShowImageInInvoice(editingPayment.showImageInInvoice);
      setEditPaymentImage(editingPayment.image);
      setEditPaymentError("");
    }
  }, [isEditPaymentModalOpen, editingPayment]);

  useEffect(() => {
    if (isAddPaymentModalOpen) {
      setNewPaymentOptionName("");
      setPaymentError("");
    }
  }, [isAddPaymentModalOpen]);

  useEffect(() => {
    if (isTaxModalOpen) {
      if (editingTax) {
        setTaxName(editingTax.name);
        setTaxRate(editingTax.rate.toString());
        setTaxEnabled(editingTax.enabled);
      } else {
        setTaxName("");
        setTaxRate("");
        setTaxEnabled(true);
      }
      setTaxError("");
    }
  }, [isTaxModalOpen, editingTax]);

  useEffect(() => {
    if (isChargeModalOpen) {
      if (editingCharge) {
        setChargeName(editingCharge.name);
        setChargeRate(editingCharge.rate.toString());
        setChargeEnabled(editingCharge.enabled);
      } else {
        setChargeName("");
        setChargeRate("");
        setChargeEnabled(true);
      }
      setChargeError("");
    }
  }, [isChargeModalOpen, editingCharge]);

  useEffect(() => {
    if (isDiscountModalOpen) {
      if (editingDiscount) {
        setDiscountName(editingDiscount.name);
        setDiscountRate(editingDiscount.rate.toString());
        setDiscountEnabled(editingDiscount.enabled);
      } else {
        setDiscountName("");
        setDiscountRate("");
        setDiscountEnabled(true);
      }
      setDiscountError("");
    }
  }, [isDiscountModalOpen, editingDiscount]);

  // Payment Handlers
  const handleAddPaymentOptionSubmit = (e) => {
    e.preventDefault();
    const trimmedName = newPaymentOptionName.trim();
    if (!trimmedName) {
      setPaymentError("Payment option name cannot be empty.");
      return;
    }
    if (
      paymentOptions.some(
        (opt) => opt.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setPaymentError("Payment option name already exists.");
      return;
    }
    addPaymentOption(trimmedName);
    setIsAddPaymentModalOpen(false);
  };

  const handleOpenEditPaymentModal = (option) => {
    setEditingPayment(option);
    setIsEditPaymentModalOpen(true);
  };

  const handleEditPaymentSubmit = (e) => {
    e.preventDefault();
    const trimmedName = editPaymentName.trim();
    if (!trimmedName) {
      setEditPaymentError("Payment option name cannot be empty.");
      return;
    }
    if (
      paymentOptions.some(
        (opt) =>
          opt.id !== editingPayment.id &&
          opt.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setEditPaymentError("Payment option name already exists.");
      return;
    }
    editPaymentOption(editingPayment.id, {
      name: trimmedName,
      enabled: editPaymentEnabled,
      showImageInInvoice: editShowImageInInvoice,
      image: editPaymentImage,
    });
    setIsEditPaymentModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditPaymentImage(imageUrl);
    }
  };

  // Tax Handlers
  const handleOpenAddTaxModal = () => {
    setEditingTax(null);
    setIsTaxModalOpen(true);
  };

  const handleOpenEditTaxModal = (tax) => {
    setEditingTax(tax);
    setIsTaxModalOpen(true);
  };

  const handleTaxSubmit = (e) => {
    e.preventDefault();
    const trimmedName = taxName.trim();
    const rateValue = parseFloat(taxRate);
    if (!trimmedName) {
      setTaxError("Tax name cannot be empty.");
      return;
    }
    if (isNaN(rateValue) || rateValue < 0) {
      setTaxError("Please enter a valid, non-negative tax rate.");
      return;
    }
    if (
      taxes.some(
        (tax) =>
          tax.id !== editingTax?.id &&
          tax.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setTaxError("Tax name already exists.");
      return;
    }
    if (editingTax) {
      editTax(editingTax.id, {
        name: trimmedName,
        rate: rateValue,
        enabled: taxEnabled,
      });
    } else {
      addTax({ name: trimmedName, rate: rateValue, enabled: taxEnabled });
    }
    setIsTaxModalOpen(false);
  };

  // Charge Handlers
  const handleOpenAddChargeModal = () => {
    setEditingCharge(null);
    setIsChargeModalOpen(true);
  };

  const handleOpenEditChargeModal = (charge) => {
    setEditingCharge(charge);
    setIsChargeModalOpen(true);
  };

  const handleChargeSubmit = (e) => {
    e.preventDefault();
    const trimmedName = chargeName.trim();
    const rateValue = parseFloat(chargeRate);
    if (!trimmedName) {
      setChargeError("Charge name cannot be empty.");
      return;
    }
    if (isNaN(rateValue) || rateValue < 0) {
      setChargeError("Please enter a valid, non-negative charge rate.");
      return;
    }
    if (
      charges.some(
        (charge) =>
          charge.id !== editingCharge?.id &&
          charge.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setChargeError("Charge name already exists.");
      return;
    }
    if (editingCharge) {
      editCharge(editingCharge.id, {
        name: trimmedName,
        rate: rateValue,
        enabled: chargeEnabled,
      });
    } else {
      addCharge({ name: trimmedName, rate: rateValue, enabled: chargeEnabled });
    }
    setIsChargeModalOpen(false);
  };

  // Discount Handlers
  const handleOpenAddDiscountModal = () => {
    setEditingDiscount(null);
    setIsDiscountModalOpen(true);
  };

  const handleOpenEditDiscountModal = (discount) => {
    setEditingDiscount(discount);
    setIsDiscountModalOpen(true);
  };

  const handleDiscountSubmit = (e) => {
    e.preventDefault();
    const trimmedName = discountName.trim();
    const rateValue = parseFloat(discountRate);
    if (!trimmedName) {
      setDiscountError("Discount name cannot be empty.");
      return;
    }
    if (isNaN(rateValue) || rateValue < 0) {
      setDiscountError("Please enter a valid, non-negative discount rate.");
      return;
    }
    if (
      discounts.some(
        (discount) =>
          discount.id !== editingDiscount?.id &&
          discount.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setDiscountError("Discount name already exists.");
      return;
    }
    if (editingDiscount) {
      editDiscount(editingDiscount.id, {
        name: trimmedName,
        rate: rateValue,
        enabled: discountEnabled,
      });
    } else {
      addDiscount({
        name: trimmedName,
        rate: rateValue,
        enabled: discountEnabled,
      });
    }
    setIsDiscountModalOpen(false);
  };

  return (
    <div className="payment-tax-setting-container">
      <h1>Payment & Tax Settings</h1>

      {/* Payment Options Section */}
      <div className="settings-section">
        <h2>Payment Options</h2>
        <ul className="settings-list">
          {paymentOptions.map((option) => (
            <li key={option.id} className="settings-list-item payment-item">
              <span>{option.name}</span>
              <div className="item-controls">
                <SwitchComponent
                  isOn={option.enabled}
                  handleToggle={() => handlePaymentToggle(option.id)}
                  id={`payment-${option.id}`}
                />
                <button
                  onClick={() => handleOpenEditPaymentModal(option)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePaymentOption(option.id)}
                  className="delete-button"
                  aria-label={`Delete ${option.name}`}
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setIsAddPaymentModalOpen(true)}
          className="add-button"
        >
          + Add Payment Option
        </button>
      </div>

      {/* Set Tax & Charge Section */}
      <div className="settings-section">
        <h2>Set Tax & Charge</h2>

        {/* Tax Management Subsection */}
        <div className="subsection">
          <h3>Tax Management</h3>
          <ul className="settings-list">
            {taxes.map((tax) => (
              <li key={tax.id} className="settings-list-item">
                <span>
                  {tax.name} ({tax.rate}%)
                </span>
                <div className="item-controls">
                  <SwitchComponent
                    isOn={tax.enabled}
                    handleToggle={() => handleTaxToggle(tax.id)}
                    id={`tax-${tax.id}`}
                  />
                  <button
                    onClick={() => handleOpenEditTaxModal(tax)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTax(tax.id)}
                    className="delete-button"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleOpenAddTaxModal} className="add-button">
            + Add Tax Option
          </button>
        </div>

        {/* Additional Charge Management Subsection */}
        <div className="subsection">
          <h3>Additional Charge Management</h3>
          <ul className="settings-list">
            {charges.map((charge) => (
              <li key={charge.id} className="settings-list-item">
                <span>
                  {charge.name} ({charge.rate}%)
                </span>
                <div className="item-controls">
                  <SwitchComponent
                    isOn={charge.enabled}
                    handleToggle={() => handleChargeToggle(charge.id)}
                    id={`charge-${charge.id}`}
                  />
                  <button
                    onClick={() => handleOpenEditChargeModal(charge)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCharge(charge.id)}
                    className="delete-button"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleOpenAddChargeModal} className="add-button">
            + Add Charge Option
          </button>
        </div>
      </div>

      {/* Discount Settings Section */}
      <div className="settings-section">
        <h2>Additional Discounts</h2>
        <ul className="settings-list">
          {discounts.map((discount) => (
            <li key={discount.id} className="settings-list-item">
              <span>
                {discount.name} ({discount.rate}%)
              </span>
              <div className="item-controls">
                <SwitchComponent
                  isOn={discount.enabled}
                  handleToggle={() => handleDiscountToggle(discount.id)}
                  id={`discount-${discount.id}`}
                />
                <button
                  onClick={() => handleOpenEditDiscountModal(discount)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDiscount(discount.id)}
                  className="delete-button"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={handleOpenAddDiscountModal} className="add-button">
          + Add Discount Option
        </button>
      </div>

      {/* Modals */}
      <ModalComponent
        isOpen={isAddPaymentModalOpen}
        onClose={() => setIsAddPaymentModalOpen(false)}
      >
        <h2>Add New Payment Option</h2>
        <form onSubmit={handleAddPaymentOptionSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="newPaymentOptionName">Option Name:</label>
            <input
              type="text"
              id="newPaymentOptionName"
              value={newPaymentOptionName}
              onChange={(e) => {
                setNewPaymentOptionName(e.target.value);
                setPaymentError("");
              }}
              required
              autoFocus
            />
          </div>
          {paymentError && <p className="error-message">{paymentError}</p>}
          <div className="form-actions">
            <button type="submit" className="confirm-button">
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddPaymentModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalComponent>

      <ModalComponent
        isOpen={isEditPaymentModalOpen}
        onClose={() => setIsEditPaymentModalOpen(false)}
      >
        <h2>Edit Payment Option</h2>
        <form onSubmit={handleEditPaymentSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="editPaymentName">Payment Method:</label>
            <input
              type="text"
              id="editPaymentName"
              value={editPaymentName}
              onChange={(e) => {
                setEditPaymentName(e.target.value);
                setEditPaymentError("");
              }}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Payment Method Status:</label>
            <SwitchComponent
              isOn={editPaymentEnabled}
              handleToggle={() => setEditPaymentEnabled(!editPaymentEnabled)}
              id={`edit-payment-enabled-${editingPayment?.id || "new"}`}
            />
          </div>
          <div className="form-group">
            <label>Show Image in Invoice:</label>
            <SwitchComponent
              isOn={editShowImageInInvoice}
              handleToggle={() =>
                setEditShowImageInInvoice(!editShowImageInInvoice)
              }
              id={`edit-show-image-${editingPayment?.id || "new"}`}
            />
          </div>
          <div className="form-group">
            <label>Upload Image:</label>
            <div className="image-upload-box">
              {editPaymentImage ? (
                <div className="image-preview-container">
                  <img
                    src={editPaymentImage}
                    alt="Payment Method Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={() => setEditPaymentImage(null)}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label htmlFor="image-upload" className="image-upload-label">
                  <span className="image-upload-placeholder">
                    + Upload Image
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
          </div>
          {editPaymentError && (
            <p className="error-message">{editPaymentError}</p>
          )}
          <div className="form-actions">
            <button type="submit" className="confirm-button">
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsEditPaymentModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalComponent>

      <ModalComponent
        isOpen={isTaxModalOpen}
        onClose={() => setIsTaxModalOpen(false)}
      >
        <h2>{editingTax ? "Edit Tax Option" : "Add New Tax Option"}</h2>
        <form onSubmit={handleTaxSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="taxName">Tax Name:</label>
            <input
              type="text"
              id="taxName"
              value={taxName}
              onChange={(e) => {
                setTaxName(e.target.value);
                setTaxError("");
              }}
              required
              autoFocus={!editingTax}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taxRate">Rate (%):</label>
            <input
              type="number"
              id="taxRate"
              value={taxRate}
              onChange={(e) => {
                setTaxRate(e.target.value);
                setTaxError("");
              }}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Tax Status:</label>
            <SwitchComponent
              isOn={taxEnabled}
              handleToggle={() => setTaxEnabled(!taxEnabled)}
              id={`tax-enabled-${editingTax?.id || "new"}`}
            />
          </div>
          {taxError && <p className="error-message">{taxError}</p>}
          <div className="form-actions">
            <button type="submit" className="confirm-button">
              {editingTax ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setIsTaxModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalComponent>

      <ModalComponent
        isOpen={isChargeModalOpen}
        onClose={() => setIsChargeModalOpen(false)}
      >
        <h2>
          {editingCharge ? "Edit Charge Option" : "Add New Charge Option"}
        </h2>
        <form onSubmit={handleChargeSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="chargeName">Charge Name:</label>
            <input
              type="text"
              id="chargeName"
              value={chargeName}
              onChange={(e) => {
                setChargeName(e.target.value);
                setChargeError("");
              }}
              required
              autoFocus={!editingCharge}
            />
          </div>
          <div className="form-group">
            <label htmlFor="chargeRate">Rate (%):</label>
            <input
              type="number"
              id="chargeRate"
              value={chargeRate}
              onChange={(e) => {
                setChargeRate(e.target.value);
                setChargeError("");
              }}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Charge Status:</label>
            <SwitchComponent
              isOn={chargeEnabled}
              handleToggle={() => setChargeEnabled(!chargeEnabled)}
              id={`charge-enabled-${editingCharge?.id || "new"}`}
            />
          </div>
          {chargeError && <p className="error-message">{chargeError}</p>}
          <div className="form-actions">
            <button type="submit" className="confirm-button">
              {editingCharge ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setIsChargeModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalComponent>

      <ModalComponent
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
      >
        <h2>
          {editingDiscount ? "Edit Discount Option" : "Add New Discount Option"}
        </h2>
        <form onSubmit={handleDiscountSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="discountName">Discount Name:</label>
            <input
              type="text"
              id="discountName"
              value={discountName}
              onChange={(e) => {
                setDiscountName(e.target.value);
                setDiscountError("");
              }}
              required
              autoFocus={!editingDiscount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discountRate">Rate (%):</label>
            <input
              type="number"
              id="discountRate"
              value={discountRate}
              onChange={(e) => {
                setDiscountRate(e.target.value);
                setDiscountError("");
              }}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Discount Status:</label>
            <SwitchComponent
              isOn={discountEnabled}
              handleToggle={() => setDiscountEnabled(!discountEnabled)}
              id={`discount-enabled-${editingDiscount?.id || "new"}`}
            />
          </div>
          {discountError && <p className="error-message">{discountError}</p>}
          <div className="form-actions">
            <button type="submit" className="confirm-button">
              {editingDiscount ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setIsDiscountModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
};

export default PaymentTaxSetting;
