import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Encuesta = ({ handleSurveySubmit, beerInventory }) => {
  const { t } = useTranslation();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasTriedCraftBeer, setHasTriedCraftBeer] = useState('No');
  const [beerStyle, setBeerStyle] = useState(null);
  const [ibuPreference, setIbuPreference] = useState(null);
  const [flavorPreference, setFlavorPreference] = useState(null);
  const [alcoholPreference, setAlcoholPreference] = useState(null);
  const [additionalIngredient, setAdditionalIngredient] = useState(null);

  const questions = [
    {
      id: 1,
      question: t('survey.question1'),
      options: [t('survey.optionYes'), t('survey.optionNo')],
      state: hasTriedCraftBeer,
      setState: setHasTriedCraftBeer,
    },
    {
      id: 2,
      question: t('survey.question2'),
      options: [t('survey.optionLager'), t('survey.optionWheat'), 
      t('survey.optionIPA'), t('survey.optionStout'), t('survey.optionPilsner'), 
      t('survey.optionDunkel'), t('survey.optionRedAle'), t('survey.optionPaleAle'), 
      t('survey.optionLagerFrutal'), t('survey.optionBrownAle'), t('survey.optionAmberAle'), 
      t('survey.optionPorter'), t('survey.optionImperialCacaoStout'), t('survey.optionImperialCoffeeStout'), t('survey.optionExperimentar')],
      state: beerStyle,
      setState: setBeerStyle,
    },
    {
      id: 3,
      question:  t('survey.question3'),
      options: [t('survey.optionLow'), t('survey.optionMedium'), t('survey.optionHigh')],
      state: ibuPreference,
      setState: setIbuPreference,
    },
    {
      id: 4,
      question: t('survey.question4'),
      options: [t('survey.optionFrutal'), t('survey.optionCaramelo'), t('survey.optionTostado'), 
      t('survey.optionAhumado'), t('survey.optionLigero'), t('survey.optionCitrico'), t('survey.optionAmargoIntenso')],
      state: flavorPreference,
      setState: setFlavorPreference,
    },
    {
      question: t('survey.question5'),
      options: [t('survey.optionAlcoholLow'), t('survey.optionAlcoholMedium'), t('survey.optionAlcoholHigh')],
      state: alcoholPreference,
      setState: setAlcoholPreference,
    },
    {
      question: t('survey.question6'),
      options: [t('survey.optionFrutas'), t('survey.optionChocolate'), t('survey.optionCafe'), 
      t('survey.optionCaram'), t('survey.optionPeanutButter'), t('survey.optionSinIngredientes'), t('survey.optionIndiferente')],
      state: additionalIngredient,
      setState: setAdditionalIngredient,
    },
  ];


  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      if (questionIndex === 0 && hasTriedCraftBeer === 'No') {
        // Si el usuario respondió "no" a la pregunta 1, saltar a la pregunta 3
        setQuestionIndex(2);
      } else {
        setQuestionIndex(questionIndex + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSurveySubmission = () => {
    // Aquí puedes realizar la lógica de validación de las respuestas si es necesario

    // Pasar las respuestas de la encuesta al componente padre (App) para su procesamiento
    handleSurveySubmit({
      hasTriedCraftBeer,
      beerStyle,
      ibuPreference,
      flavorPreference,
      alcoholPreference,
      additionalIngredient,
    });
  };


  const currentQuestion = questions[questionIndex];

  const recommendBeer = () => {
    const selectedBeers = beerInventory.filter((beer) => {
      const ibu = beer.ibus;
      const alcohol = beer.porcentaje_alcohol;
      const flavor = beer.sabor.toLowerCase();
      const additionalIngredientMatch =
        additionalIngredient === 'ninguno'
          ? beer.ingrediente_adicional === 'ninguno'
          : beer.ingrediente_adicional.includes(additionalIngredient);

      return (
        beerStyle === beer.estilo &&
        ((ibuPreference === 'baja' && ibu >= 8 && ibu <= 20) ||
          (ibuPreference === 'media' && ibu >= 21 && ibu <= 50) ||
          (ibuPreference === 'alta' && ibu > 50)) &&
        flavor.includes(flavorPreference.toLowerCase()) &&
        ((alcoholPreference === 'Bajo' && alcohol < 4) ||
          (alcoholPreference === 'Moderado' && alcohol >= 4 && alcohol <= 6) ||
          (alcoholPreference === 'Alto' && alcohol > 6.5)) &&
        additionalIngredientMatch
      );
    });

    return selectedBeers;
  };

  return (
    <div>
      {currentQuestion && (
        <>
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={currentQuestion.state === option}
                  onChange={() => currentQuestion.setState(option)}
                />
                {option}
              </label>
            ))}
          </div>
          {questionIndex > 0 && (
            <button onClick={handlePreviousQuestion}>Anterior</button>
          )}
          {questionIndex < questions.length - 1 && (
            <button onClick={handleNextQuestion}>Siguiente</button>
          )}
          {questionIndex === questions.length - 1 && (
            // Si es la última pregunta, mostrar el botón para enviar la encuesta
            <button onClick={handleSurveySubmission}>Enviar Encuesta</button>
          )}
        </>
      )}
    </div>
  );
};

export default Encuesta;