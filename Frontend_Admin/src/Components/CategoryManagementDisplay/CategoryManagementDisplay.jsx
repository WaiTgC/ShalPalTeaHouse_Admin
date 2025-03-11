// CategoryManagement.js
import React, { useState } from "react";
import CategoryManagementCard from "../CategoryManagementCard/CategoryManagementCard"; // Updated import
import "./CategoryManagementDisplay.css"; // Updated CSS import

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      _id: "1",
      name: "Mohinga",
      image: null,
      price: "50 B",
      category: "Burmese Specials",
    },
    {
      _id: "2",
      name: "Lahpet Thoke",
      image: null,
      price: "30 B",
      category: "Burmese Specials",
    },
    {
      _id: "3",
      name: "Shan Noodles",
      image: null,
      price: "40 B",
      category: "Burmese Specials",
    },
    {
      _id: "4",
      name: "Tea Leaf Salad",
      image: null,
      price: "35 B",
      category: "Burmese Specials",
    },
    {
      _id: "5",
      name: "Nan Gyi Thoke",
      image: null,
      price: "45 B",
      category: "Burmese Specials",
    },
    {
      _id: "6",
      name: "Kyay Oh",
      image: null,
      price: "55 B",
      category: "Burmese Specials",
    },
    {
      _id: "7",
      name: "Htamane",
      image: null,
      price: "25 B",
      category: "Burmese Specials",
    },
    {
      _id: "8",
      name: "Mont Lin Ma Yar",
      image: null,
      price: "20 B",
      category: "Burmese Specials",
    },
    {
      _id: "9",
      name: "Ohn No Khao Swe",
      image: null,
      price: "60 B",
      category: "Burmese Specials",
    },
    {
      _id: "10",
      name: "Beef Curry",
      image: null,
      price: "70 B",
      category: "Burmese Specials",
    },
  ]);

  function handleAddCategory() {
    const name = prompt("Enter category name:");
    const price = prompt("Enter category price:"); // Adjust fields as needed

    if (name && price) {
      const newCategory = {
        _id: (categories.length + 1).toString(),
        name,
        image: null,
        price,
        category: "Burmese Specials", // Adjust this if categories shouldn't have a category field
      };
      setCategories([...categories, newCategory]);
    }
  }

  const handleEdit = (id) => {
    alert(`Edit category with ID: ${id}`);
  };

  const handleSave = (updatedCategory) => {
    console.log("Received updated category:", updatedCategory);
    setCategories(
      categories.map((category) =>
        category._id === updatedCategory._id
          ? { ...category, ...updatedCategory }
          : category
      )
    );
  };

  const handleDelete = (id) => {
    console.log("Deleting category with ID:", id);
    setCategories(categories.filter((category) => category._id !== id));
  };

  return (
    <div className="category-management-container">
      <div className="table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Photo</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <CategoryManagementCard
                key={category._id}
                index={index + 1}
                category={category} // Changed prop name from 'item' to 'category'
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSave}
                showAddButton={index === categories.length - 1}
                onAdd={handleAddCategory}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
