import { Navigate } from "react-router-dom"
import { isAdmin } from "../../utils/checkAdmin"

const AdminRoute = ({children}) => {
  return isAdmin() ? children : <Navigate to = "/" />
}

export default AdminRoute