import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminLogin from "./pages/Login/Login";

const App = () => {
  const url=import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const token = localStorage.getItem("token")

  const isLogin = location.pathname === "/";
  return (
    <div>
      <ToastContainer autoClose={1000} />
      {!isLogin && <Navbar />}
      {!isLogin && <hr />}
      <div className="app-content">
        {!isLogin && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/orders" /> : <AdminLogin url={url} />
            }
          />
          <Route path="/add" element={<AdminRoute><Add url={url}/></AdminRoute>} />
          <Route path="/list" element={<AdminRoute><List url={url}/></AdminRoute>} />
          <Route path="/orders" element={<AdminRoute><Orders url={url}/></AdminRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
