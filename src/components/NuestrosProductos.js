import React, { useEffect } from 'react';
import './NuestrosProductos.css'; 
import './NuestrosProductosBackground.css';


const NuestrosProductos = () => {
  return (
    <div className="nuestros-productos-container">
      <div className="producto izquierda">
      <h3>Título de Cerveza 1</h3>
        <div className="imagen">
          <img src='./assets/cer2.jpg' alt="Cerveza 1" />
        </div>
        <div className="descripcion">
          <p>Ideal para quienes buscan una cerveza obscura, ligera y con bajo contenido de alcohol que desafie los principios universales del sabor.</p>
        </div>
      </div>
      <div className="producto derecha">
      <h3>Título de Cerveza 2</h3>
        <div className="descripcion">
          <p>Descripción de la Cerveza 2</p>
        </div>
        <div className="imagen">
          <img src='./assets/cer2.jpg' alt="Cerveza 2" />
        </div>
      </div>
    </div>
  );
};

export default NuestrosProductos;