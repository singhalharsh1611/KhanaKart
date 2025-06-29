import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchQuery}) => {// bydefault=All
  console.log("FoodDisplay → searchQuery:", searchQuery);
  const { food_list } = useContext(StoreContext)
  const filteredList = food_list.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      

      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
        <FoodItem
          key={index}
          id={item._id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
        />
  ))
) : (
  <p className="no-results">No matching food items found.</p>
      )}
      </div>
    </div>
  );
};

export default FoodDisplay;
