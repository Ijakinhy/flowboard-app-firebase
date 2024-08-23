import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const { currentUser } = useSelector((state) => state.user);

  return !currentUser?.uid ? <Navigate to="/" replace /> : <Component />;
};

export default PrivateRoute;
