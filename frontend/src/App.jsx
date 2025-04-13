import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import { StoreContext } from "./context/storeContext";
import TokenIssue from "./pages/TokenIssue";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const { setToken } = useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
      setToken(token); // Set token in context
      localStorage.setItem("token", token); // store token in local storage
    }
  }, [location, setToken]);

  return (
    <>
      {showLogin &&
        (forgetPassword ? (
          <ForgetPassword
            setShowLogin={setShowLogin}
            setForgetPassword={setForgetPassword}
          />
        ) : (
          <LoginPopup
            setShowLogin={setShowLogin}
            setForgetPassword={setForgetPassword}
          />
        ))}
      {/* {forgetPassword ? <>} */}
      
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/token-issue" element={<TokenIssue />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
