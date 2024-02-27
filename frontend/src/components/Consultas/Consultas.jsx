import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading } from '@chakra-ui/react';
import { handleInscripcionExitosa } from '../../Refresh';

function Consultas({ mesasDeExamenes, alumnosDisponibles }) {
    const [mesaSeleccionada, setMesaSeleccionada] = useState('')
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
    const handleMesaChange = (event) => {
        setMesaSeleccionada(event.target.value);
    }
    const handleAlumnoChange = (event) => {
        setAlumnoSeleccionado(event.target.value);
    };
    return (
        <Box p={4}>
            <FormControl id="mesa">
                <Heading as="h1" size="lg" >
                    Mesas Registradas
                </Heading>

                <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                    <option value="">Selecciona una Mesa...</option>
                    {mesasDeExamenes.map((mesa) => (
                        <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} {mesa.fecha}</option>
                    ))}
                </Select>

            </FormControl>

            <Button colorScheme="blue" >Consultar Alumnos Registrados en Mesa</Button>


            <FormControl id="alumno">
                <Heading as="h1" size="lg" >
                    Alumnos Registrados
                </Heading>
                <Select value={alumnoSeleccionado} onChange={handleAlumnoChange}>
                    <option value="">Selecciona un alumno...</option>
                    {alumnosDisponibles.map((alumno) => (
                        <option key={alumno.dni} value={alumno.dni}>{alumno.nombre} {alumno.apellido}</option>
                    ))}
                </Select>

               
            </FormControl>
            <Button colorScheme="blue" >Consultar Mesas en las que se inscribio el alumno</Button>


        </Box>
    );
}

export default Consultas;
