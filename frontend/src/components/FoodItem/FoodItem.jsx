import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/storeContext";
import { StoreContext } from "../../context/storeContext";
const FoodItem = ({ id, name, price, description, image }) => {
 
  const{cartItems,addtoCart,removeFromCart,url}=useContext(StoreContext)
  // console.log("cart is empty;",cartItems,url,id);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {(!cartItems[id]) ?(
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addtoCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addtoCart(id)}
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
