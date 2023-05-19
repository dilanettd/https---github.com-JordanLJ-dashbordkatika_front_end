import { Navigate } from "react-router-dom";

const IsAuthenticate = ({ children }) => {
  if (localStorage.getItem("access_token") !== null) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default IsAuthenticate;
