import React from "react";
import { ReactNode, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children } : PrivateRouteProps) {
  const { user } = useContext(UserContext);
  
  return user ? children : <Navigate to="/login" />;
}  