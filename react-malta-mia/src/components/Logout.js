import { auth } from './firebaseConfig'; // Asegúrate de importar correctamente

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Después de cerrar sesión, redirige a la página de inicio u otra página
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default Logout;