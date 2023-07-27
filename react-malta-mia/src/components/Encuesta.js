import React, { useState, useEffect } from 'react';


const Encuesta = ({ onSubmit }) => {
  
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
      texto: '1. ¿Ya has probado alguna cerveza artesanal?',
      opciones: ['si', 'no'],
    },
    {
      id: 'beerStyle',
      texto: '2. ¿Qué tipo de estilo de cerveza te gusta?',
      opciones: [
        'lager',
        'wheat ale',
        'ipa',
        'stout',
        'pilsner',
        'dunkel',
        'red ale',
        'pale ale',
        'lager frutal',
        'brown ale',
        'amberale',
        'porter',
        'imperial cacao stout',
        'imperial coffee stout',
      ],
    },
    {
      id: 'ibuPreference',
      texto: '3. ¿Qué nivel de amargura o IBUs te gusta en una cerveza artesanal?',
      opciones: ['baja (entre 8 y 20)', 'media (entre 21 y 50)', 'alta (mayor a 51)'],
    },
    {
      id: 'flavorPreference',
      texto: '4. ¿Qué tipo de sabores prefieres en una cerveza artesanal?',
      opciones: ['Frutal y dulce', 'caramelo', 'tostado', 'ahumado', 'ligero y refrescante', 'citrico', 'amargo intenso'],
    },
    {
      id: 'alcoholPreference',
      texto: '5. ¿Cuál es tu preferencia de nivel de alcohol?',
      opciones: ['Bajo (menos del 4%)', 'Moderado (entre 4% y 6%)', 'Alto (mayor a 6.5%)'],
    },
    {
      id: 'additionalIngredientPreference',
      texto: '6. ¿Te gustaría que tu cerveza tuviera algún ingrediente adicional?',
      opciones: ['frutas', 'chocolate', 'cafe', 'caramelo', 'mantequilla de mani', 'ninguno', 'me es indiferente'],
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
            {preguntaActual.opciones.map((opcion) => (
              <li key={opcion}>
                <label>
                  <input
                    type="radio"
                    name={preguntaActual.id}
                    value={opcion}
                    checked={respuestas[preguntaActual.id] === opcion}
                    onChange={(e) => handleInputChange(preguntaActual.id, e.target.value)}
                  />
                  {opcion}
                </label>
              </li>
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