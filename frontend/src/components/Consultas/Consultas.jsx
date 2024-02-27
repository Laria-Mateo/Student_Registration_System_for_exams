import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading, Flex, Container } from '@chakra-ui/react';
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
        <Box p={10}>
            <Flex justifyContent="center">
                <Box>
                    <Heading as="h1" size="lg" >
                        Consultas
                    </Heading>
                </Box>
            </Flex>
            <Container maxW="container.md" p={2}>
                <Box>

                    <FormControl id="mesa">

                        <FormLabel>Seleccione Mesa de Exámenes</FormLabel>
                        <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                            <option value="">Selecciona una mesa...</option>
                            {mesasDeExamenes.map((mesa) => (
                                <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} - Fecha - {mesa.fecha}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button type="submit" colorScheme="blue" onClick={handleBuscar} mt={3} >
                    Buscar
                </Button>
            </Container>
            {subAccion === 'accion' && (


                <Container maxW="container.md" p={2}>
                    <FormControl id="alumno">
                        <FormLabel>Alumnos Inscriptos</FormLabel>
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
                </Container>
            )}
        </Box>
    );
}

export default Consultas;
