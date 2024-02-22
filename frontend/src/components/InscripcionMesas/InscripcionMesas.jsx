import React, { useState } from 'react';
import { FormControl, FormLabel, Select, Button, VStack, Box } from '@chakra-ui/react';

const InscripcionFormulario = ({ mesasDeExamenes, alumnosDisponibles }) => {
    const [mesaSeleccionada, setMesaSeleccionada] = useState('');
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');

    const handleMesaChange = (event) => {
        setMesaSeleccionada(event.target.value);
    };

    const handleAlumnoChange = (event) => {
        setAlumnoSeleccionado(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Inscripción enviada:', { mesa: mesaSeleccionada, alumno: alumnoSeleccionado });
    };

    return (
        <Box p={10}>
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl id="mesa">
                    <FormLabel>Mesa de Exámenes</FormLabel>
                    <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                        <option value="">Selecciona una mesa...</option>
                        {mesasDeExamenes.map((mesa) => (
                            <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} - Fecha - {mesa.fecha}</option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl id="alumno">
                    <FormLabel>Alumno</FormLabel>
                    <Select value={alumnoSeleccionado} onChange={handleAlumnoChange}>
                        <option value="">Selecciona un alumno...</option>
                        {alumnosDisponibles.map((alumno) => (
                            <option key={alumno.dni} value={alumno.dni}>{alumno.nombre} </option>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" colorScheme="blue" disabled={!mesaSeleccionada || !alumnoSeleccionado}>
                    Inscribir
                </Button>
            </VStack>
        </form>
        </Box>
    );
};

export default InscripcionFormulario;
