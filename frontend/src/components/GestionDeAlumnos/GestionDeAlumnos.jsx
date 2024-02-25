import { useState } from 'react';
import { Box,Button,FormControl,FormLabel,Input,Select,} from '@chakra-ui/react';

import { handleInscripcionExitosa } from '../../Refresh';
function GestionAlumnos({ alumnosDisponibles }) {
    const [accion, setAccion] = useState(null);
    const [alumno_dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
   // const [dniBuscar, setDniBuscar] = useState('');
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');

    const handleAlumnoChange = (event) => {
        setAlumnoSeleccionado(event.target.value);
    };

    const handleAlta = () => {
        setAccion('alta');
        setDni('');
        setNombre('');
        setApellido('');
    };

    const handleBaja = () => {
        setAccion('baja');
        setDni('');
    };

    const handleModificacion = () => {
        setAccion('modificacion');
        setDni('');
    };

   // const handleBuscar = () => {
    //    console.log("Buscar alumno con DNI:", dniBuscar);
    //};

    const handleSubmit = (event) => {
        event.preventDefault();
       
        console.log("Datos a enviar:", alumno_dni, nombre, apellido);
    };
    function handleClickFormAlta(e) {
        e.preventDefault()  //freezo todos lo que se este haciendo cuando se apriete el boton
        fetch('http://localhost:8000/api/alumnos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                dni: alumno_dni,
                nombre: nombre,
                apellido: apellido
            })
        }).then(() => {
            setDni('')
            setNombre('')
            setApellido('')
            handleInscripcionExitosa()

        })
    }
    const handleClickFormBaja = (alumno_dni) => {
        fetch(`http://localhost:8000/api/alumnos/${alumno_dni}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el alumno');
                }

                setDni('');
                setNombre('');
                setApellido('');
                handleInscripcionExitosa()

            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleClickFormModificacion = () => {
        fetch(`http://localhost:8000/api/alumnos/${alumnoSeleccionado}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                dni: alumnoSeleccionado,
                nombre: nombre,
                apellido: apellido
            })
            
        })
        .then(() => {
            setDni('');
            setNombre('');
            setApellido('');
            setAlumnoSeleccionado('');
            handleInscripcionExitosa()
        })
        .catch(error => console.error(error));
    };

    return (
        <Box p={4}>
            <Button colorScheme="blue" onClick={handleAlta}>Alta</Button>
            <Button colorScheme="blue" onClick={handleBaja}>Baja</Button>
            <Button colorScheme="blue" onClick={handleModificacion}>Modificación</Button>

            {accion && (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} mt={4}>
                        {accion === 'alta' && (
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                                <FormLabel>Apellido</FormLabel>
                                <Input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

                                <FormLabel>DNI</FormLabel>
                                <Input type="text" value={alumno_dni} onChange={(e) => setDni(e.target.value)} />

                                <Button type="submit" colorScheme="blue" onClick={handleClickFormAlta}>
                                    {accion === 'alta' ? 'Dar de alta' : ''}
                                </Button>

                            </FormControl>
                        )}
                        {accion === 'baja' && (
                            <FormControl id="alumno">
                                <FormLabel>Alumno</FormLabel>
                                <Select value={alumnoSeleccionado} onChange={handleAlumnoChange}>
                                    <option value="">Selecciona un alumno...</option>
                                    {alumnosDisponibles.map((alumno) => (
                                        <option key={alumno.dni} value={alumno.dni}>{alumno.nombre} {alumno.apellido}</option>
                                    ))}
                                </Select>

                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    onClick={() => handleClickFormBaja(alumnoSeleccionado)}
                                >
                                    {accion === 'baja' ? 'Dar de Baja' : ''}
                                </Button>
                            </FormControl>
                        )}
                        {accion === 'modificacion' && (
                            <FormControl id="alumno">
                                <FormLabel>Alumno</FormLabel>
                                <Select value={alumnoSeleccionado} onChange={handleAlumnoChange}>
                                    <option value="">Selecciona un alumno...</option>
                                    {alumnosDisponibles.map((alumno) => (
                                        <option key={alumno.dni} value={alumno.dni}>DNI: {alumno.dni} Nombre: {alumno.nombre} Apellido: {alumno.apellido} </option>
                                    ))}
                                </Select>

                                <FormLabel>Nombre a modificar</FormLabel>
                                <Input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                                <FormLabel>Apellido a modificar</FormLabel>
                                <Input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

                                <Button type="submit" colorScheme="blue" onClick={handleClickFormModificacion} >
                                    {accion === 'modificacion' ? 'Modificar' : ''}
                                    
                                </Button>
                            </FormControl>
                        )}

                    </VStack>
                </form>
            )}
        </Box>
    );
}

export default GestionAlumnos;
