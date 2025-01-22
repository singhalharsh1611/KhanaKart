import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCount, setitemCount] = useState(0);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {!itemCount ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => setitemCount((prev) => prev + 1)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => setitemCount((prev) => prev - 1)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{itemCount}</p>
            <img
              onClick={() => setitemCount((prev) => prev + 1)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
