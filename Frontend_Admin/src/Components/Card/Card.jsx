import React, { useState } from "react";
import "./Card.css";
import { useOrderContext } from "../../Context/OrderProvider";

const Card = ({ name, price, image }) => {
  const {
    addPendingItem,
    removePendingItem,
    selectedTable,
    cardClickCounts,
    updateCardClickCount,
    decreaseCardClickCount,
  } = useOrderContext();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedMeat, setSelectedMeat] = useState("None"); // Default to "None"

  const handleCardClick = () => {
    const now = new Date();
    // Append the selected meat to the item name if not "None"
    const itemNameWithMeat =
      selectedMeat === "None" ? name : `${name} (${selectedMeat})`;
    const newItem = {
      id: Date.now(),
      tableNo: selectedTable,
      itemName: itemNameWithMeat,
      itemPrice: price,
      date: now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      status: "New",
      meat: selectedMeat, // Store the meat selection separately for future use
    };
    console.log("Pending Item from Card:", newItem);
    addPendingItem(newItem);
    updateCardClickCount(itemNameWithMeat, selectedTable); // Use the modified name for click counts
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 300);
  };

  const handleDecrease = () => {
    const itemNameWithMeat =
      selectedMeat === "None" ? name : `${name} (${selectedMeat})`;
    const count = cardClickCounts[`${selectedTable}_${itemNameWithMeat}`] || 0;
    if (count > 0) {
      decreaseCardClickCount(itemNameWithMeat, selectedTable);
      removePendingItem(itemNameWithMeat, selectedTable);
      setIsSelected(true);
      setTimeout(() => setIsSelected(false), 300);
    }
  };

  const handleMeatChange = (meat) => {
    setSelectedMeat(meat);
  };

  const clickCount =
    cardClickCounts[
      `${selectedTable}_${
        selectedMeat === "None" ? name : `${name} (${selectedMeat})`
      }`
    ] || 0;

  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      {clickCount > 0 && (
        <>
          <span className="click-count">{clickCount}</span>
          <div
            className="minus-container"
            onClick={(e) => {
              e.stopPropagation();
              handleDecrease();
            }}
          >
            <button className="minus-button">-</button>
          </div>
        </>
      )}
      {image ? (
        <img src={image} alt={name} className="card-image" />
      ) : (
        <div className="card-image"></div>
      )}
      <div className="card-details">
        <span className="card-name">{name}</span>
        <span className="card-price">{price}</span>
      </div>
      <div className="meat-selection">
        <span>Select Meat: </span>
        <label>
          <input
            type="checkbox"
            checked={selectedMeat === "Chicken"}
            onChange={() => handleMeatChange("Chicken")}
            onClick={(e) => e.stopPropagation()} // Prevent card click
          />
          Chicken
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedMeat === "Pork"}
            onChange={() => handleMeatChange("Pork")}
            onClick={(e) => e.stopPropagation()}
          />
          Pork
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedMeat === "Seafood"}
            onChange={() => handleMeatChange("Seafood")}
            onClick={(e) => e.stopPropagation()}
          />
          Seafood
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedMeat === "None"}
            onChange={() => handleMeatChange("None")}
            onClick={(e) => e.stopPropagation()}
          />
          None
        </label>
      </div>
    </div>
  );
};

export default Card;
