import{ useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ setShowLogin }) => {
  // getting url from context api
  const { url, token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // for checking
  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState == "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      const toastMessage =
        currState === "Login"
          ? "Logged in Successfully!"
          : "Account created Successfully!";
      toast.success(toastMessage);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        setShowLogin(false);
      }, 1500);
    } else {
      toast.error(`${response.data.message}`);
      // alert(response.data.message);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/user/google`, "_self"); // Change this to your backend URL
  };

  return (
    <div className="login-popup">
      <ToastContainer />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
              autoComplete="off"
            />
          )}
          <input
            onChange={onChangeHandler}
            name="email"
            type="email"
            value={data.email}
            placeholder="Your Email"
            required
            autoComplete="off"
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
            autoComplete="off"
          />
        </div>
        <button type="sumbit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <button onClick={handleGoogleLogin}>{currState === "Sign Up" ? "Continue" : "Login"} with Google</button>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
