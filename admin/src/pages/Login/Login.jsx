import { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css';

const AdminLogin = ({ url }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, data);
      if (res.data.success) {
        const token = res.data.token;
        const decoded = jwtDecode(token);
        if (decoded.role !== "admin") {
          toast.error("Access Denied: You are not an admin");
          return;
        }
        localStorage.setItem("token", token);
        toast.success("Logged in as Admin");
        navigate("/add"); // or your default admin page
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
