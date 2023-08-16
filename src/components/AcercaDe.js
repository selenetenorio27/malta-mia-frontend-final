import React, { useEffect } from 'react';
import './AcercaDeBackground.css';
import './AcercaDe.css';
import { useTranslation } from 'react-i18next';

const AcercaDe = () => {
  const { t } = useTranslation();

  useEffect(() => {
    
    document.body.classList.add('about-page');
    
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  return (
    <div className="acercade-container">
      <h2 className="acercade-title">{t('about')}</h2>
      <p className="acercade-text">{t('welcome')}</p>
      <p className="acercade-text">{t('beerDescription1')}</p>
      <p className="acercade-text">{t('beerDescription2')}</p>
      
      <div className="founders-section">
        <img className="founders-image" src="/assets/cer2.jpg" alt="Founders" />
        <h3 className="founder-name">{t('foundedBy')}</h3>
        <p className="founder-description">{t('passion')}</p>
      </div>
      
      <div className="passion-section">
        <p className="acercade-text">{t('passion')}</p>
      </div>
    </div>
  );
};

export default AcercaDe;