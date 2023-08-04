import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Encuesta.css';
import './EncuestaBackground.css';

const Encuesta = ({ onSubmit, onRestart, encuestaRespuestas }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Cuando el componente se monta, agregamos la clase 'encuesta-page' al body
    document.body.classList.add('encuesta-page');
    // Cuando el componente se desmonta, eliminamos la clase 'encuesta-page' del body
    return () => {
      document.body.classList.remove('encuesta-page');
    };
  }, []);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [respuestas, setRespuestas] = useState({
    hasTriedCraftBeer: null,
    beerStyle: '',
    ibuPreference: '',
    flavorPreference: '',
    alcoholPreference: '',
    additionalIngredientPreference: '',
  });
  const [encuestaCompletada, setEncuestaCompletada] = useState(false);

  const preguntas = [
    {
      id: 'hasTriedCraftBeer',
      texto: t('survey.question1'),
      opciones: [
        { id: 'yes', texto: t('survey.optionYes') },
        { id: 'no', texto: t('survey.optionNo') },
      ],
    },
    {
      id: 'beerStyle',
      texto: t('survey.question2'),
      opciones: [
        { id: 'lager', texto: t('survey.optionLager')},
        { id: 'wheat_ale', texto: t('survey.optionWheat')},
        { id: 'ipa', texto: t('survey.optionIPA')},
        { id: 'stout', texto: t('survey.optionStout')},
        { id: 'pilsner', texto: t('survey.optionPilsner')},
        { id: 'dunkel', texto: t('survey.optionDunkel')},
        { id: 'red_ale', texto: t('survey.optionRedAle')},
        { id: 'pale_ale', texto: t('survey.optionPaleAle')},
        { id: 'lager_frutal', texto: t('survey.optionLagerFrutal')},
        { id: 'brown_ale', texto: t('survey.optionBrownAle')},
        { id: 'amber_ale', texto: t('survey.optionAmberAle')},
        { id: 'porter', texto: t('survey.optionPorter')},
        { id: 'imperial_cacao_stout', texto: t('survey.optionImperialCacaoStout')},
        { id: 'imperial_coffee_stout', texto: t('survey.optionImperialCoffeeStout')},
        { id: 'experimentar', texto: t('survey.optionExperimentar')},
        { id: 'helles_export_bierr', texto: t('survey.optionHellesExportBierr')}
      ]
    },
    {
      id: 'ibuPreference',
      texto: t('survey.question3'),
      opciones: [
        { id: 'low', texto: t('survey.optionLow') },
        { id: 'medium', texto: t('survey.optionMedium') },
        { id: 'high', texto: t('survey.optionHigh') },
      ],
    },
    {
      id: 'flavorPreference',
      texto: t('survey.question4'),
      opciones: [
        { id: 'fruity', texto: t('survey.optionFrutal') },
        { id: 'caramel', texto: t('survey.optionCaramelo') },
        { id: 'toasted', texto: t('survey.optionTostado') },
        { id: 'light_and_refreshing', texto: t('survey.optionLigero')},
        { id: 'citric', texto: t('survey.optionCitrico')},
        { id: 'intense_bitter', texto: t('survey.optionAmargoIntenso')},
        { id: 'none', texto: t('survey.optionNinguno')}
        // anadir ninguno o none
      ],
    },
    {
      id: 'alcoholPreference',
      texto: t('survey.question5'),
      opciones: [
        { id: 'low', texto: t('survey.optionAlcoholLow') },
        { id: 'medium', texto: t('survey.optionAlcoholMedium') },
        { id: 'high', texto: t('survey.optionAlcoholHigh') },
      ]
    },
    {
      id: 'additionalIngredientPreference',
      texto: t('survey.question6'),
      opciones: [
        { id: 'fruit', texto: t('survey.optionFrutas') },
        { id: 'chocolate', texto: t('survey.optionChocolate') },
        { id: 'coffee', texto: t('survey.optionCafe') },
        { id: 'caramelo', texto: t('survey.optionCaram')},
        { id: 'peanut_butter', texto: t('survey.optionPeanutButter')},
        { id: 'none', texto:  t('survey.optionSinIngredientes')},
        { id: 'indiferente', texto: t('survey.optionIndiferente')}
      ],
    },
  ];

  useEffect(() => {
    // Al cargar el componente, mostramos automáticamente la pregunta 1.
    setCurrentPage(0);
    setEncuestaCompletada(false);
  }, []);

  const handleNextClick = () => {
    setCurrentPage((prevPage) => {
      // Si el usuario contestó "No" en la pregunta 1, saltar a la pregunta 3 directamente.
      if (prevPage === 0 && respuestas.hasTriedCraftBeer === 'no'){
        return prevPage + 2;
      }
      return prevPage + 1;
    });
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleInputChange = (preguntaId, value) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [preguntaId]: value,
    }));
  };

  const handleEncuestaSubmit = () => {
    onSubmit(respuestas);
    setEncuestaCompletada(true);
  };

  const handleRestartEncuesta = () => {
    setCurrentPage(0);
    setRespuestas({
      hasTriedCraftBeer: null,
      beerStyle: '',
      ibuPreference: '',
      flavorPreference: '',
      alcoholPreference: '',
      additionalIngredientPreference: '',
    });
    setEncuestaCompletada(false);
    onRestart();
  };

  const preguntaActual = preguntas[currentPage];

  return (
    <div>
      <div className="banner">
        <img src="/assets/artesanales2.jpg" alt="Banner" />
        <div className="encuesta-text">{t('Survey')}</div>
      </div>

      <div className="encuesta-container">
      <h2>{t('Find.craft.beer1')}<br />{t('Find.craft.beer2')}</h2>
      {/* Mostrar la pregunta actual si la encuesta no está completada */}
      {!encuestaCompletada && preguntaActual && (
        <div key={preguntaActual.id}>
          <p>{preguntaActual.texto}</p>
          <ul>
            {/* contador que parte en 1 */}
            {preguntaActual.opciones.map((opcion) => (
              <li key={opcion}>
                <label>
                  <input
                    type="radio"
                    name={preguntaActual.id} // radiobutton + contador
                    value={opcion.id}
                    checked={respuestas[preguntaActual.id] === opcion.id}
                    onChange={(e) => handleInputChange(preguntaActual.id, e.target.value)}
                  />
                  {opcion.texto}
                </label>
              </li>
              //contador++
            ))}
          </ul>
          <button disabled={currentPage === 0} onClick={handlePreviousClick}>
          {t('Back')}
          </button>
          {currentPage < preguntas.length - 1 ? (
            <button onClick={handleNextClick}>{t('Next')}</button>
          ) : (
            <button onClick={handleEncuestaSubmit}>{t('Send.survey')}</button>
          )}
        </div>
      )}

      {encuestaCompletada && (
        <div>
          <p>{t('Survey.thanks')}</p>
          <button onClick={handleRestartEncuesta}>{t('Fill.out.survey.again')}</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Encuesta;