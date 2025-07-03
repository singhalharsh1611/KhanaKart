import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [aval,setaval]=useState(false);
  const [loading,setLoading] =useState(false);
  const [loadingProceed,setLoadingProceed] =useState(false);



  const handlePlaceOrderClick = async () => {
    console.log(Object.keys(cartItems).length);
    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setLoadingProceed(true);
    const isInRange = await handleLocationCheck();
    console.log(isInRange);
    
    if (!token) {
      toast.error("Please login to continue!");
      setLoadingProceed(false); // stop spinner
    } else if (isInRange === false) {
      toast.error("You're outside our delivery area.");
      setLoadingProceed(false); // stop spinner
    } else {
      // Delay before navigating
      setTimeout(() => {
        setLoadingProceed(false);
        navigate("/order");
      }, 1000);
    }
  };

  const handleLocationCheck = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      const restaurantLocation = {
        lat: parseFloat(import.meta.env.VITE_REST_LAN),
        lng: parseFloat(import.meta.env.VITE_REST_LONG),
        maximumDistance : parseFloat(import.meta.env.VITE_REST_MAXDISTANCE)
      };
  
      if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
  
            const toRad = (value) => (value * Math.PI) / 180;
  
            const R = 6371;
            const dLat = toRad(userLat - restaurantLocation.lat);
            const dLon = toRad(userLng - restaurantLocation.lng);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(restaurantLocation.lat)) *
                Math.cos(toRad(userLat)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            const maxDistance = restaurantLocation.maximumDistance;
            if(distance <= maxDistance){
              toast.success("You're in our delivery area.");
            }
            else{
              toast.error(`You're outside our delivery range of ${maxDistance} Km (current distance ${parseInt(distance)} Km)`);
            }
            resolve(distance <= maxDistance); // true if in range, false if not
          },
          (error) => {
            toast.error("Could not get your location. Please enable GPS.");
            resolve(false);
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser.");
        resolve(false);
      }
      setTimeout(()=>setLoading(false),500);
    });
  };
  
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
            <button onClick={handlePlaceOrderClick} disabled={loadingProceed}>
            {loadingProceed ? <FaSpinner className="spinner-icon" /> : "PROCEED TO PLACEORDER"}
            </button>
            <button onClick={handleLocationCheck} disabled={loading}>
              {loading&(!loadingProceed) ? <FaSpinner className="spinner-icon" /> : "CHECK AVALIBILTY"}
            </button>
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
