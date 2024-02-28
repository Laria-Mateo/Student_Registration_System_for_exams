import React, { useState } from 'react';
import { FormControl, FormLabel, Select, Button, VStack, Box, Heading, Flex, Container } from '@chakra-ui/react';
import { handleInscripcionExitosa } from '../../Refresh';


const InscripcionFormulario = ({ mesasDeExamenes, alumnosDisponibles, inscripcionesRealizadas }) => {

    const [accion, setAccion] = useState(null);
    const [subAccion, setSubAccion] = useState(null);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(-1);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [inscripcion, setInscripcion] = useState(-1);


    const handleMesaChange = (event) => {
        const selectedMesa = event.target.value;
        console.log('Mesa seleccionada:', selectedMesa);
        setMesaSeleccionada(selectedMesa);
    };


    const handleAlumnoChange = (event) => {
        const selectedAlumno = event.target.value;
        console.log('Alumno seleccionado:', selectedAlumno);
        setAlumnoSeleccionado(selectedAlumno);
    };

    const handleInscripcionChange = (event) => {
        const selectedInscripcion = event.target.value;
        console.log('Inscripcion seleccionado:', selectedInscripcion);
        setInscripcion(selectedInscripcion);
    };

    const handleAlta = () => {
        setAccion('alta');

    };

    const handleBaja = () => {
        setAccion('baja');

    };

    const handleBuscar = () => {
        setSubAccion('buscar')

    }

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
                handleInscripcionExitosa();
            })
            .catch(error => {
                setMensaje('Error al inscribir al alumno');
                console.error(error);
            });
    };

    const handleClickFormBaja = (event) => {
        event.preventDefault();
        console.log(inscripcion)
        console.log(mesaSeleccionada)
        fetch(`http://localhost:8000/api/eliminar_inscripcion/${inscripcion}/${mesaSeleccionada}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar Inscripcion');
                }
                handleInscripcionExitosa();
            })
            .catch(error => {
                console.error(error);
            });
    };



    return (
        <Box p={10}>
            <Flex justifyContent="center">

                <Box>
                    <Heading as="h1" size="lg" >
                        Gestion de Inscripciones
                    </Heading>
                </Box>
            </Flex>
            <Flex justifyContent="center">
                <Button colorScheme="blue" onClick={handleAlta}>Alta</Button>
                <Button colorScheme="blue" onClick={handleBaja} ml={2}>Baja</Button>
            </Flex>

            <VStack spacing={4}>
                <Container maxW="container.md" p={2}>
                    {accion === 'alta' && (
                        <Box>
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

                            <Button type="submit" colorScheme="blue" disabled={!mesaSeleccionada || !alumnoSeleccionado} onClick={handleSubmit} mt={3}>
                                Inscribir
                            </Button>

                            {mensaje && <p>{mensaje}</p>}
                        </Box>
                    )}
                    {accion === 'baja' && (
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
                            <Button type="submit" colorScheme="blue" onClick={handleBuscar} mt={3} mb={3} >
                                Buscar
                            </Button>
                            {subAccion === 'buscar' && (
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
                                    <Button type="submit" colorScheme="blue" onClick={handleClickFormBaja} mt={3}>
                                        Dar de Baja
                                    </Button>
                                </FormControl>
                            )}
                        </Box>
                    )}

                </Container>
            </VStack>


        </Box>
    );
};

export default InscripcionFormulario;
