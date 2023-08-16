import React, { useEffect } from 'react';
import './NuestrosProductos.css'; 
import './NuestrosProductosBackground.css';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const NuestrosProductos = () => {
  const { t } = useTranslation();

  useEffect(() => {
    
    document.body.classList.add('productos-page');
    
    return () => {
      document.body.classList.remove('productos-page');
    };
  }, []);

  const productos = [
    {
      id: 1,
      title: 'Lagrimas de cacahuate',
      imageSrc: './assets/beer1.jpg',
      description: t('Description.lagrimas.cacahuate'),
    },
    {
      id: 2,
      title: 'Summer Daze',
      imageSrc: './assets/beer2.jpg',
      description: t('Description.summer.daze'),
    },
    {
      id: 3,
      title: 'Vaquita Marina',
      imageSrc: './assets/beer3.jpg',
      description: t('Description.vaquita.marina'),
    }
  ];



    return (
      <div className="nuestros-productos-container">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
          {productos.map((producto) => (
            <div key={producto.id} className="product-slide">
              <div className="product-image">
                <img src={producto.imageSrc} alt={producto.title} />
              </div>
              <div className="product-description">
              <h3 className="product-title">{producto.title}</h3>
                <p>{producto.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  };
  
  export default NuestrosProductos;
