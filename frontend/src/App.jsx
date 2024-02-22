import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import InscripcionFormulario from './components/InscripcionMesas/InscripcionMesas';

const App = () => {
  const [mesasDeExamenes, setMesasDeExamenes] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumnos();
    fetchMesas();
  }, []);

  function fetchAlumnos() {
    fetch('http://localhost:8000/api/alumnos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Datos de alumnos obtenidos:', data);
        setAlumnos(data);
      })
      .catch(error => console.error('Error fetching users:', error))
      .finally(() => setLoading(false));
  }

  function fetchMesas() {
    fetch('http://localhost:8000/api/mesa_examen')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Datos de mesas obtenidas:', data);
        setMesasDeExamenes(data);
      })
      .catch(error => console.error('Error fetching mesas:', error))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/inscripcionFormulario"
            element={<InscripcionFormulario mesasDeExamenes={mesasDeExamenes} alumnosDisponibles={alumnos} />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
