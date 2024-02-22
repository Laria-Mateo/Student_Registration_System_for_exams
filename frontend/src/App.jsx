import React, { useState, useEffect } from 'react';


function App() {


  fetch('http://localhost:8000/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    console.log(data); // Esto mostrará "Hi, my name is FastAPI" en la consola del navegador
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    return (
    <>
      <h1>Cree su Usuario</h1>

    </>
  );
}

export default App;
