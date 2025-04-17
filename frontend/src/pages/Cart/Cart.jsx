import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [aval,setaval]=useState(false);
  const handlePlaceOrderClick = () => {
    setaval
    if (!token ) {
      toast.error("Please login to continue!"); 
    }
    else if (handleLocationCheck()) {
      toast.error("You're outside our delivery area.");
    }
    
     else {
      navigate("/order");
    }
  };
  const handleLocationCheck = () =>{
    const restaurantLocation = {
      lat: 25.4476288,  // defualt - 25.4476288
      lng: 81.854464   // defualt  - 81.854464
    };

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const toRad = (value) => (value * Math.PI) / 180;

        const distance = () => {
          const R = 6371; // Radius of Earth in km
          const dLat = toRad(userLat - restaurantLocation.lat);
          const dLon = toRad(userLng - restaurantLocation.lng);

          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(restaurantLocation.lat)) *
              Math.cos(toRad(userLat)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c; // Distance in km
        };

        const userDistance = distance();

        if (userDistance <= 2) {
          toast.success("You're in range! We can deliver to you.");
          return true;
        } else {
          toast.error("You're outside our 2km delivery range.");
          return false;
        }
      },
      (error) => {

        toast.error("Could not get your location. Please enable GPS.");
        return false;
      }
    );
  } else {
    toast.error("Geolocation is not supported by your browser.");
  }
  }
  return (
    <div className='cart'>
      <ToastContainer />
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={()=>{removeFromCart(item._id)}} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
      <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount()?2:0}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmount()?getTotalCartAmount() + 2 :0}</p>
              </div>
            </div>
            <button onClick={handlePlaceOrderClick}>PROCEED TO PLACEORDER</button>
            <button onClick={handleLocationCheck}>CHECK AVALIBILTY</button>
        </div>
        <div className="cart-promocode">
            <div>
              <p>if you have a PROMO CODE Enter, it here </p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promocode' />
                <button>Sumbit</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
