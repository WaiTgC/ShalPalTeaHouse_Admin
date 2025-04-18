import React from "react";
import Card from "../Card/Card";
import "./CardDisplay.css";
import { useOrderContext } from "../../Context/OrderProvider";

const CardDisplay = ({ category }) => {
  const { items, orderHistory } = useOrderContext();

  console.log("Rendering CardDisplay with category:", category);
  console.log("All Items in CardDisplay:", items);

  let filteredItems = [];

  if (category === "MostOrdered") {
    // MostOrdered logic (unchanged)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentOrders = orderHistory.filter((order) => {
      if (!order.completedAt) return false;
      const completedDate = new Date(order.completedAt);
      return completedDate >= oneWeekAgo;
    });

    const itemCounts = recentOrders.reduce((acc, order) => {
      order.items.forEach((item) => {
        acc[item.itemName] = (acc[item.itemName] || 0) + 1;
      });
      return acc;
    }, {});

    const topItems = Object.entries(itemCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([itemName]) => {
        return (
          items.find((item) => item.name === itemName) || {
            _id: Date.now().toString(),
            name: itemName,
            price: "N/A",
            image: null,
          }
        );
      });

    filteredItems = topItems;
  } else {
    // Simplified filtering: match category directly with flexibility
    filteredItems = items.filter((item) => {
      const itemCategory = item.category ? item.category.trim() : "";
      const propCategory = category ? category.trim() : "";
      // Match either exact or normalized (case-insensitive, no spaces)
      const exactMatch = itemCategory === propCategory;
      const normalizedItemCategory = itemCategory
        .toLowerCase()
        .replace(/\s+/g, "");
      const normalizedPropCategory = propCategory
        .toLowerCase()
        .replace(/\s+/g, "");
      const normalizedMatch = normalizedItemCategory === normalizedPropCategory;
      const isMatch = exactMatch || normalizedMatch;
      console.log(
        `Comparing item category "${itemCategory}" with prop category "${propCategory}":`,
        isMatch
      );
      return isMatch;
    });

    console.log(`Filtered Items for "${category}":`, filteredItems);
    if (filteredItems.length === 0) {
      console.log("No matches found. Possible categories in items:", [
        ...new Set(
          items.map((item) =>
            item.category ? item.category.trim() : "undefined"
          )
        ),
      ]);
    }
  }

  return (
    <div className="card-display">
      <div className="card-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CardDisplay;
