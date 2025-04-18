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
    items, // Access items from OrderContext
  } = useOrderContext();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState("None"); // Default to "None"

  // Find the item in the items array to get its options
  const item = items.find((i) => i.name === name) || {};
  const options = item.options || []; // Default to empty array if no options

  const handleCardClick = () => {
    const now = new Date();
    // Append the selected option to the item name if not "None"
    const itemNameWithOption =
      selectedOption === "None" ? name : `${name} (${selectedOption})`;
    const newItem = {
      id: Date.now(),
      tableNo: selectedTable,
      itemName: itemNameWithOption,
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
      option: selectedOption, // Store the option selection separately
    };
    console.log("Pending Item from Card:", newItem);
    addPendingItem(newItem);
    updateCardClickCount(itemNameWithOption, selectedTable);
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 300);
  };

  const handleDecrease = () => {
    const itemNameWithOption =
      selectedOption === "None" ? name : `${name} (${selectedOption})`;
    const count =
      cardClickCounts[`${selectedTable}_${itemNameWithOption}`] || 0;
    if (count > 0) {
      decreaseCardClickCount(itemNameWithOption, selectedTable);
      removePendingItem(itemNameWithOption, selectedTable);
      setIsSelected(true);
      setTimeout(() => setIsSelected(false), 300);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const clickCount =
    cardClickCounts[
      `${selectedTable}_${
        selectedOption === "None" ? name : `${name} (${selectedOption})`
      }`
    ] || 0;

  return (
    <div className="card-container">
      {/* Main Card */}
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
      </div>

      {/* Separate Options Container - Only show if there are options */}
      {options.length > 0 && (
        <div className="options-container">
          <div className="option-selection">
            {/* <span>Select Option: </span> */}
            {/* Dynamically render options from the item's options array */}
            {options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`option-${name}`} // Unique name to group radio buttons per card
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  onClick={(e) => e.stopPropagation()}
                />
                {option}
              </label>
            ))}
            {/* "None" as a default option */}
            <label>
              <input
                type="radio"
                name={`option-${name}`} // Unique name to group radio buttons per card
                checked={selectedOption === "None"}
                onChange={() => handleOptionChange("None")}
                onClick={(e) => e.stopPropagation()}
              />
              None
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
