import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ Component }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.uid ? <Navigate to="/boards" replace /> : <Component />;
};

export default PublicOnlyRoute;
