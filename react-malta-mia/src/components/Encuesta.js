import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Encuesta = ({ onSubmit, onRestart, encuestaRespuestas }) => {
  const { t } = useTranslation();
  
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
      opciones: [t('survey.optionYes'), t('survey.optionNo')],
    },
    {
      id: 'beerStyle',
      texto: t('survey.question2'),
      opciones: [t('survey.optionLager'), t('survey.optionWheat'), 
      t('survey.optionIPA'), t('survey.optionStout'), t('survey.optionPilsner'), 
      t('survey.optionDunkel'), t('survey.optionRedAle'), t('survey.optionPaleAle'), 
      t('survey.optionLagerFrutal'), t('survey.optionBrownAle'), t('survey.optionAmberAle'), 
      t('survey.optionPorter'), t('survey.optionImperialCacaoStout'), t('survey.optionImperialCoffeeStout'), t('survey.optionExperimentar')],
    },
    {
      id: 'ibuPreference',
      texto: t('survey.question3'),
      opciones: [t('survey.optionLow'), t('survey.optionMedium'), t('survey.optionHigh')],
    },
    {
      id: 'flavorPreference',
      texto: t('survey.question4'),
      opciones: [t('survey.optionFrutal'), t('survey.optionCaramelo'), t('survey.optionTostado'), 
      t('survey.optionAhumado'), t('survey.optionLigero'), t('survey.optionCitrico'), t('survey.optionAmargoIntenso')],
    },
    {
      id: 'alcoholPreference',
      texto: t('survey.question5'),
      opciones: [t('survey.optionAlcoholLow'), t('survey.optionAlcoholMedium'), t('survey.optionAlcoholHigh')],
    },
    {
      id: 'additionalIngredientPreference',
      texto: t('survey.question6'),
      opciones: [t('survey.optionFrutas'), t('survey.optionChocolate'), t('survey.optionCafe'), 
      t('survey.optionCaram'), t('survey.optionPeanutButter'), t('survey.optionSinIngredientes'), t('survey.optionIndiferente')],
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
      if (prevPage === 0 && respuestas.hasTriedCraftBeer === 'no') {
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
      <h2>Encuesta</h2>
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
                    name={preguntaActual.id} // raiobutton + contador
                    value={opcion}
                    checked={respuestas[preguntaActual.id] === opcion}
                    onChange={(e) => handleInputChange(preguntaActual.id, e.target.value)}
                  />
                  {opcion}
                </label>
              </li>
              //contador++
            ))}
          </ul>
          <button disabled={currentPage === 0} onClick={handlePreviousClick}>
            Anterior
          </button>
          {currentPage < preguntas.length - 1 ? (
            <button onClick={handleNextClick}>Siguiente</button>
          ) : (
            <button onClick={handleEncuestaSubmit}>Enviar encuesta</button>
          )}
        </div>
      )}

      {encuestaCompletada && (
        <div>
          <p>¡Gracias por completar la encuesta!</p>
          <button onClick={handleRestartEncuesta}>Volver a contestar Encuesta</button>
        </div>
      )}
    </div>
  );
};

export default Encuesta;