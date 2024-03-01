import React, { useState, useEffect } from 'react';
import { ChakraProvider, Input } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import InscripcionFormulario from './components/GestionDeInscripciones/GestionDeInscripciones';
import AlumnoFormulario from './components/GestionDeAlumnos/GestionDeAlumnos';
import GestionDeMesas from './components/GestionDeMesas/GestionDeMesas';
import Consultas from './components/Consultas/Consultas';
import Footer from './components/Footer/Footer';


const App = () => {
  const [mesasDeExamenes, setMesasDeExamenes] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumnos();
    fetchMesas();
    fetchInscripciones();
  }, []);

const url = 'http://localhost:8000/'

  function fetchAlumnos() {
    fetch(url+'api/alumnos')
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

  function fetchInscripciones() {
    fetch('http://localhost:8000/api/inscripciones')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('Datos de inscripciones obtenidos:', data);
      setInscripciones(data);
    })
    .catch(error => console.error('Error fetching inscripciones:', error))
    .finally(() => setLoading(false));
  }

  function handleRefresh() {
    fetchAlumnos();
    fetchMesas()
    fetchInscripciones()
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
            element={<InscripcionFormulario mesasDeExamenes={mesasDeExamenes} alumnosDisponibles={alumnos} inscripcionesRealizadas={inscripciones}/>}
          />

          <Route
            path="/gestionDeAlumnos"
            element={<AlumnoFormulario alumnosDisponibles={alumnos} />}
          />

          <Route
            path="/gestionDeMesas"
            element={<GestionDeMesas mesasDeExamenes={mesasDeExamenes} />}

          />

          <Route
            path="/consultas"
            element={<Consultas mesasDeExamenes={mesasDeExamenes} inscripcionesRealizadas={inscripciones} />}
          />
        </Routes>

      </Router>
      {/*<Input type="submit" value="Refresh" onClick={handleRefresh} />*/}
      <Footer/>
    </ChakraProvider>
  );
}

export default App;
