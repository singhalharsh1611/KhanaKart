import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [userName, setUserName] = useState("");

  const addtoCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
//
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Failed to load cart data:", err);
      setCartItems({}); 
    }
  };
  

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {//to stay login even after refresh
        const storedToken = localStorage.getItem("token");
        try {
          setToken(storedToken);
          await loadCartData(storedToken);
        }
        catch(error){
          console.error("Invalid token or failed to load data:", error);
          localStorage.removeItem("token");
          setToken("");
          setCartItems({});
        }
      }
    }
    loadData();
  }, []);

  //to get user name
  useEffect(() => {
    async function getName() {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // console.log("Decoded token: ", decoded);
          const userId = decoded.id;
          
          const response = await axios.get(`${url}/api/user/${userId}`);
          setUserName(response.data.name);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    }
    getName();
  }, [token]);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addtoCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    userName,
    setUserName
  };
  // console.log("inside store contex",cartItems);
  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
