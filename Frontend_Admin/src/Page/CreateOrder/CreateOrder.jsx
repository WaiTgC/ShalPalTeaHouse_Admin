import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Layout_1 from "../../Layout/Layout_1/Layout_1";
import MostOrdered from "../../Components/MostOrdered/MostOrdered";
import CardDisplay from "../../Components/CardDisplay/CardDisplay";
import { useOrderContext } from "../../Context/OrderProvider";

const CreateOrder = () => {
  const { items } = useOrderContext();

  const uniqueCategories = [
    ...new Set(items.map((item) => item.category.trim())),
  ].filter((category) => category !== "Most Ordered");

  console.log("Items in CreateOrder:", items);
  console.log("Unique categories in CreateOrder:", uniqueCategories);

  const formatCategoryForRoute = (category) => {
    return category.replace(/\s+/g, "");
  };

  // Map route-friendly names back to original category names
  const routeToCategoryMap = uniqueCategories.reduce((acc, category) => {
    const routeCategory = formatCategoryForRoute(category);
    acc[routeCategory] = category;
    return acc;
  }, {});

  return (
    <Layout_1>
      <Routes>
        {/* Default route: Show the first category or a default */}
        <Route
          path="/"
          element={
            uniqueCategories.length > 0 ? (
              <CardDisplay category={uniqueCategories[0]} />
            ) : (
              <p>No categories available.</p>
            )
          }
        />
        {/* Static route for Most Ordered */}
        <Route path="MostOrdered" element={<MostOrdered />} />
        {/* Dynamic route for all categories */}
        <Route
          path=":routeCategory"
          element={
            <DynamicCategoryDisplay routeToCategoryMap={routeToCategoryMap} />
          }
        />
      </Routes>
    </Layout_1>
  );
};

// Component to handle dynamic routes
const DynamicCategoryDisplay = ({ routeToCategoryMap }) => {
  const { routeCategory } = useParams();
  const category = routeToCategoryMap[routeCategory] || routeCategory;

  console.log("DynamicCategoryDisplay - Route Category:", routeCategory);
  console.log("DynamicCategoryDisplay - Mapped Category:", category);

  return <CardDisplay category={category} />;
};

export default CreateOrder;
