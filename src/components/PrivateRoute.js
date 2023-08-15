import { Route, Navigate, Routes } from 'react-router-dom';
import Favoritos from './components/Favoritos';

const PrivateRoute = ({ element: Element, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      element={auth ? <Element /> : <Navigate to="/login" />}
    />
  );
};

// ...

<Routes>
  {/* Otras rutas */}
  <PrivateRoute path="/favoritos" element={Favoritos} auth={user} />
  {/* Otras rutas */}
</Routes>