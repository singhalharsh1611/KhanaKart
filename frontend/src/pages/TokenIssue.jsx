import React, { useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const TokenIssue = () => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(
        "http://localhost:4000/api/user/token-issue",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.error("Failed to fetch token:", data.message);
      }
    };

    fetchToken();
  }, [setToken, navigate]);

  return null;
};

export default TokenIssue;
