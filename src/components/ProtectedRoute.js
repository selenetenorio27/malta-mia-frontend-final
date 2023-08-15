
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, authenticated, ...props }) => {
  return authenticated ? <Route element={element} {...props} /> : <Navigate to="/favoritos" />;
};

export default ProtectedRoute;