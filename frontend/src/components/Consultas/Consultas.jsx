import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading } from '@chakra-ui/react';
import { handleInscripcionExitosa } from '../../Refresh';

function Consultas({ mesasDeExamenes, inscripcionesRealizadas }) {
    const [mesaSeleccionada, setMesaSeleccionada] = useState('')
    const [subAccion, setSubAccion] = useState(null);

    const [inscripcion, setInscripcion] = useState(-1);
    const handleMesaChange = (event) => {
        setMesaSeleccionada(event.target.value);
    }

    const handleInscripcionChange = (event) => {
        const selectedInscripcion = event.target.value;
       
        setInscripcion(selectedInscripcion);
    };

    const handleBuscar = () => {
        setSubAccion('accion')

    }
    return (
        <Box p={4}>
            <FormControl id="mesa">
                            <FormLabel>Seleccione Mesa de Exámenes</FormLabel>
                            <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                                <option value="">Selecciona una mesa...</option>
                                {mesasDeExamenes.map((mesa) => (
                                    <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} - Fecha - {mesa.fecha}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" colorScheme="blue" onClick={handleBuscar} m={2} >
                            Buscar
                        </Button>
                        {subAccion === 'accion' && (
                            <FormControl id="alumno">
                                <FormLabel>Seleccione un Alumno</FormLabel>
                                <Select value={inscripcion} onChange={handleInscripcionChange}>
                                    <option value="">Selecciona un alumno...</option>
                                    {inscripcionesRealizadas.map((alumno) => {
                                        console.log('Alumno:', alumno);



                                        return (alumno.id_mesa_examen == mesaSeleccionada) ? (
                                            <option key={alumno.id_alumno} value={alumno.id_alumno}>DNI: {alumno.id_alumno}</option>
                                        ) : null;


                                    })}
                                </Select>

                            </FormControl>
                        )}
        </Box>
    );
}

export default Consultas;
