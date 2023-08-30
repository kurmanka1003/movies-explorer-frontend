import { Navigate } from "react-router-dom";

function LoggedProtectedRoute({ loggedIn, children }) {
  return loggedIn ? <Navigate to="/movies" replace /> : children;
}

export default LoggedProtectedRoute;
