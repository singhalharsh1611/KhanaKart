import{ useContext, useEffect, useState } from "react";
import "./ForgetPassword.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = ({ setShowLogin,setForgetPassword }) => {
  // getting url from context api
  const { url, token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Forget Password");

  const [data, setData] = useState({
    name: "",
    email: "",
    newPassword: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // for checking
//   useEffect(()=>{
//     console.log(data);
//   },[data])

  const updatePassword = async (event) => {
    event.preventDefault();
    let newUrl = url;
    
    newUrl += "/api/user/updatePassword";
    
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
  const ChangeToLogin=()=>{
    setForgetPassword(false);
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/user/google`, "_self"); // Change this to your backend URL
  };

  return (
    
    <div className="login-popup">
    
      <ToastContainer />
      <form onSubmit={updatePassword} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() =>ChangeToLogin()}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
         
            {/* <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
              autoComplete="off"
            /> */}
          
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
            name="newPassword"
            value={data.password}
            type="newPassword"
            placeholder="New Password"
            required
            autoComplete="off"
          />
        </div>
        <button type="sumbit">
          Update password
        </button>
        
        
          <p>
            Back to?{" "}
            <span onClick={() =>ChangeToLogin()}>Login here</span>
          </p>
        
      </form>
    </div>
  );
};

export default ForgetPassword;
