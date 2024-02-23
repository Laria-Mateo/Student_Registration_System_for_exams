import React, { useState } from 'react';
import { FormControl, FormLabel, Select, Button, VStack, Box } from '@chakra-ui/react';
import { handleInscripcionExitosa } from '../../Refresh';


const InscripcionFormulario = ({ mesasDeExamenes, alumnosDisponibles }) => {
    const [mesaSeleccionada, setMesaSeleccionada] = useState('');
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleMesaChange = (event) => {
        setMesaSeleccionada(event.target.value);
    };

    const handleAlumnoChange = (event) => {
        setAlumnoSeleccionado(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/inscribir/${alumnoSeleccionado}/${mesaSeleccionada}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al inscribir al alumno');
            }
            setMensaje('¡Alumno inscrito exitosamente!');
            setMesaSeleccionada('');
            setAlumnoSeleccionado('');
        })
        .catch(error => {
            setMensaje('Error al inscribir al alumno');
            console.error(error);
        });
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
                                <option key={alumno.dni} value={alumno.dni}>{alumno.nombre} {alumno.apellido} </option>
                            ))}
                        </Select>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" disabled={!mesaSeleccionada || !alumnoSeleccionado} >
                        Inscribir
                    </Button>

                    {mensaje && <p>{mensaje}</p>}
                </VStack>
            </form>
        </Box>
    );
};

export default InscripcionFormulario;
