import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { StoreContext } from "./context/StoreContext";
import TokenIssue from "./pages/TokenIssue";
import Verify from "./pages/Verify/Verify";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
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
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/token-issue" element={<TokenIssue />} />
          <Route path='/verify' element={<Verify/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
