import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NavigationBar.css';


const NavigationBar = () => {
    const { t, i18n } = useTranslation();
  
    const handleLanguageChange = (language) => {
      i18n.changeLanguage(language);
    };
  
    return (
      <nav className='navigationBar'>
        <div className="NavigationBarContainer">
          <ul className="menu">
            <li>
              <Link to="/">{t('Home')}</Link>
            </li>
            <li>
              <Link to="/acerca-de">{t('About')}</Link>
            </li>
            <li>
              <Link to="/encuesta">{t('Survey')}</Link>
            </li>
            <li>
              <Link to="/nuestros-productos">{t('Products')}</Link>
            </li>
            <li>
              <button onClick={() => handleLanguageChange('en')}>English</button>
              <button onClick={() => handleLanguageChange('es')}>Español</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default NavigationBar;
  
  
  
  
  
  