import React, { useEffect } from 'react';
import './NuestrosProductos.css'; // Importa el archivo de estilos CSS
import './NuestrosProductosBackground.css';

const NuestrosProductos = () => {
  
  useEffect(() => {
    document.body.classList.add('productos-page');
  
    return () => {
      document.body.classList.remove('productos-page');
    };
  }, []);

  };
  
  export default NuestrosProductos;