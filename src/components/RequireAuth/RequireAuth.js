import React from 'react';
import { useContext } from "react";
import { UserContext } from "../../App";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
const navigate = useNavigate()
const location = useLocation();
const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
    if (!loggedInUser.email) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
};

export default RequireAuth;