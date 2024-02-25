import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import { handleInscripcionExitosa } from '../../Refresh';

function GestionDeMesas({ mesasDeExamenes }) {
    const [accion, setAccion] = useState(null);
    const [nombreMesa, setNombreMesa] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('4')
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

    function handleClickFormAlta(e) {
        e.preventDefault();

        const formattedFecha = new Date(fecha).toISOString(); //cambio de formato la fecha

        setId(id + 1);
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

    return (
        <Box p={4}>
            <Button colorScheme="blue" onClick={handleAlta}>Alta</Button>
            <Button colorScheme="blue" onClick={handleBaja}>Baja</Button>
            <Button colorScheme="blue" onClick={handleModificacion}>Modificación</Button>
            <VStack spacing={4} mt={4}>
                {accion === 'alta' && (
                    <FormControl>
                        <FormLabel>Nombre Asignatura</FormLabel>
                        <Input type="text" value={nombreMesa} onChange={(e) => setNombreMesa(e.target.value)} />
                        <FormLabel>Fecha y Hora</FormLabel>
                        <Input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                        <Button type="submit" colorScheme="blue" onClick={handleClickFormAlta}>
                            Dar de alta
                        </Button>
                    </FormControl>
                )}
                {accion === 'baja' && (
                    <FormControl id="mesa">
                        <FormLabel>Alumno</FormLabel>
                        <Select value={mesaSeleccionada} onChange={handleMesaChange}>
                            <option value="">Selecciona una Mesa...</option>
                            {mesasDeExamenes.map((mesa) => (
                                <option key={mesa.id} value={mesa.id}>{mesa.nombreAsignatura} {mesa.fecha}</option>
                            ))}
                        </Select>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            onClick={() => handleClickFormBaja(mesaSeleccionada)}
                        >
                            {accion === 'baja' ? 'Dar de Baja' : ''}
                        </Button>
                    </FormControl>
                )}
                {accion === 'modificacion' && (
                    <FormControl id="alumno">
                        <FormLabel>Alumno</FormLabel>

                    </FormControl>
                )}
            </VStack>
        </Box>
    );
}

export default GestionDeMesas;
