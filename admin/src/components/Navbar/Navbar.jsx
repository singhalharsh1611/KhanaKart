import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
