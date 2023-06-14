import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({children }) => {
  const { currentUser } = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         );
//       }}
//     ></Route>
//   );
return currentUser ? children  : <Navigate to="/login" />;

};
