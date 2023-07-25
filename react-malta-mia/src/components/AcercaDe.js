import React from 'react';
import { useTranslation } from 'react-i18next';

const AcercaDe = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('about')}</h2>
      <p>{t('welcome')}</p>
      <p>{t('beerDescription1')}</p>
      <p>{t('beerDescription2')}</p>
      <h3>{t('getToKnowUs')}</h3>
      <p>{t('foundedBy')}</p>
      <p>{t('passion')}</p>
    </div>
  );
};

export default AcercaDe;