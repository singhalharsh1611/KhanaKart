import React, { useEffect, useContext } from "react";
import { StoreContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";

const TokenIssue = () => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      // console.error("Token not found in URL");
      navigate("/login");
    }
  }, [setToken, navigate]);

  return null;
};

export default TokenIssue;
