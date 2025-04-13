import { useContext, useEffect, useState } from "react";
import "./ForgetPassword.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";


const ForgetPassword = ({ setShowLogin, setForgetPassword }) => {
  // getting url from context api
  const { url, token, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Forget Password");
  const [loader,setLoading] = useState(false);


  const [data, setData] = useState({
    email: "",
    password: "",
    otp: ""
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

  const forgetPassword = async (event) => {
    event.preventDefault();
    let newUrl = url;
    setLoading(true);

    newUrl += "/api/user/forgetPassword";

    const response = await axios.post(newUrl, data);
    setLoading(false);
    if (response.data.success) {
      const toastMessage = "Email Sened"
      toast.success(toastMessage);
      setCurrState("emailSended");
      //   set token
      // setToken(response.data.token);
      // localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        // setShowLogin(false);
        // setForgetPassword(false);

      }, 1000);
    } else {
      toast.error(`${response.data.message}`);
      // alert(response.data.message);
    }

  }

  const ChangeToLogin = () => {
    setForgetPassword(false);
  }

  const updatePassword = async (e) => {
    e.preventDefault();
    let newUrl = url;
    setLoading(true);
    newUrl += "/api/user/updatePassword";
    const response = await axios.post(newUrl, data);
    setLoading(false);
    if (response.data.success) {

      const toastMessage = "Password updated"
      toast.success(toastMessage);
      setCurrState("emailSended");
      //   set token
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        setShowLogin(false);
        setForgetPassword(false);

      }, 1000);
    } else {
      toast.error(`${response.data.message}`);
      // alert(response.data.message);
    }
  }

  return (

    <div className="login-popup">

      <ToastContainer />
      <form  className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => ChangeToLogin()}
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

          {currState === "Forget Password" ? <>
            <button onClick={(e)=>forgetPassword(e)}>
            {loader? <FaSpinner className="spinner-icon" /> : "Send OTP"}
            </button>

          </> : <>
            <input
              onChange={onChangeHandler}
              name="otp"
              value={data.otp}
              type="text"
              placeholder="OTP"
              required
              autoComplete="off"
            />
            <input
              onChange={onChangeHandler}
              name="password"
              value={data.password}
              type="password"
              placeholder="New Password"
              required
              autoComplete="off"
            />
            <button onClick={(e)=>updatePassword(e)} disabled={loader}>
            {loader? <FaSpinner className="spinner-icon" /> : "update Password"}
            </button>
            <p>
              Back to?{" "}
              <span onClick={() => {setCurrState("Forget Password"); setLoading(false)}}>Resend It</span>
            </p>

          </>}
        </div>



        <p>
          Back to?{" "}
          <span onClick={() => ChangeToLogin()}>Login here</span>
        </p>

      </form>
    </div>
  );
};

export default ForgetPassword;
