import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading, Flex, Container } from '@chakra-ui/react';
import { handleInscripcionExitosa } from '../../Refresh';

function GestionDeMesas({ mesasDeExamenes }) {
    const [accion, setAccion] = useState(null);
    const [nombreMesa, setNombreMesa] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('0')
    const [mesaSeleccionada, setMesaSeleccionada] = useState('')

    const handleMesaChange = (event) => {
        setMesaSeleccionada(event.target.value);

    };
    const handleAlta = () => {
        setAccion('alta');
        setNombreMesa('');
        setFecha('');

    };

    const handleBaja = () => {
        setAccion('baja');
        setNombreMesa('');
    };

    const handleModificacion = () => {
        setAccion('modificacion');
        setNombreMesa('');
    };

    function verificarId() {

        let idAlto = -1;

        mesasDeExamenes.map((mesa) => {

            if (mesa.id > idAlto) {
                idAlto = mesa.id;
            }
        })
        setId(idAlto + 1);
    }
    function handleClickFormAlta(e) {
        e.preventDefault();

        const formattedFecha = new Date(fecha).toISOString(); //cambio de formato la fecha
        verificarId();

        fetch('http://localhost:8000/api/mesa_examen', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nombreAsignatura: nombreMesa,
                fecha: fecha
            })
        }).then(() => {
            setNombreMesa('');
            setFecha('');
            handleInscripcionExitosa()

        });
    }
    const handleClickFormBaja = (id) => {
        fetch(`http://localhost:8000/api/mesa_examen/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar la Mesa');
                }
                setNombreMesa('');
                setFecha('');
                handleInscripcionExitosa()

            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleClickFormModificacion = () => {
        fetch(`http://localhost:8000/api/mesa_examen/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nombreAsignatura: nombreMesa,
                fecha: fecha
            })

        })
            .then(() => {
                setNombreMesa('');
                setFecha('');
                handleInscripcionExitosa()
            })
            .catch(error => console.error(error));
    };
    return (
        <Box p={10}>
            <Flex justifyContent="center">
                <Box>
                    <Heading as="h1" size="lg" >
                        Gestion de Mesas
                    </Heading>
                </Box>
            </Flex>
            <Button colorScheme="blue" onClick={handleAlta}>Alta</Button>
            <Button colorScheme="blue" onClick={handleBaja} ml={2}>Baja</Button>
            <Button colorScheme="blue" onClick={handleModificacion} ml={2}>Modificación</Button>
            <VStack spacing={4} mt={4}>
                <Container maxW="container.md" p={2}>
                    {accion === 'alta' && (
                        <Box >
                            <FormControl>
                                <FormLabel>Nombre Asignatura</FormLabel>
                                <Input type="text" value={nombreMesa} onChange={(e) => setNombreMesa(e.target.value)} />
                                <FormLabel>Fecha y Hora</FormLabel>
                                <Input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                <Button type="submit" colorScheme="blue" onClick={handleClickFormAlta} mt={3}>
                                    Dar de alta
                                </Button>
                            </FormControl>
                        </Box>
                    )}
                    {accion === 'baja' && (
                        <Box >

                            <FormControl id="mesa">
                                <FormLabel>Mesa</FormLabel>
                                <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                                    <option value="">Selecciona una Mesa...</option>

                                    {mesasDeExamenes.map((mesa) => (
                                        <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} {mesa.fecha}</option>

                                    ))}
                                </Select>

                                <Button type="submit" colorScheme="blue" onClick={() => handleClickFormBaja(mesaSeleccionada)} mt={3}>
                                    {accion === 'baja' ? 'Dar de Baja' : ''}
                                </Button>
                            </FormControl>
                        </Box>
                    )}
                    {accion === 'modificacion' && (
                        <Box >
                            <FormControl id="mesa">
                                <FormLabel>Mesa</FormLabel>
                                <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                                    <option value="">Selecciona una Mesa...</option>
                                    {mesasDeExamenes.map((mesa) => (
                                        <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} {mesa.fecha}</option>
                                    ))}
                                </Select>

                                <FormLabel>Nuevo Nombre</FormLabel>
                                <Input type="text" value={nombreMesa} onChange={(e) => setNombreMesa(e.target.value)} />
                                <FormLabel>Nueva Fecha y Hora</FormLabel>
                                <Input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    onClick={() => handleClickFormModificacion(mesaSeleccionada)}
                                    mt={3}
                                >
                                    {accion === 'modificacion' ? 'Modificar' : ''}
                                </Button>
                            </FormControl>
                        </Box>
                    )}
                </Container>
            </VStack>
        </Box>
    );
}

export default GestionDeMesas;
