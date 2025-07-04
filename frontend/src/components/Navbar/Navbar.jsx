import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";

const Navbar = ({ setShowLogin, setSearchQuery }) => {
  const [menu, setMenu] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState(""); 
  const { getTotalCartAmount, token, setToken, userName } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  
  
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      
      // console.log("Searching for:", searchInput);
      // console.log("Navbar props → setSearchQuery:", setSearchQuery);
      setSearchQuery(searchInput);       
      setShowSearchBar(false);           
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>

        <div className="navbar-search-icon">
        <img src={assets.search_icon} 
            alt="Search"
            className="cursor-pointer"
            onClick={() => setShowSearchBar(!showSearchBar)}
        />

        {showSearchBar && (
  <input
    type="text"
    placeholder="Search food..."
    value={searchInput}
    onChange={(e) => {
      const value = e.target.value;
      setSearchInput(value);
      setSearchQuery(value); 
    }}
    className="navbar-search-input"
  />
)}

          </div>
          
          <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>

          <div className={getTotalCartAmount() ? "dot" : ""}></div>
        </div>


        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          // <button onClick={setToken("")}>Sign Out</button>
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <div className="drop">
              <ul className="navbar-profile-dropdown">
                <li>
                  <p className="name">Welcome Back, {userName}</p>
                </li>
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>My Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
