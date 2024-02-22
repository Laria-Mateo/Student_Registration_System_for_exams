import { useState } from 'react';
import { Box, Flex, Heading, Spacer, Collapse, Button } from '@chakra-ui/react';
import utn from '/utn-nacional.jpg'
import { Link } from 'react-router-dom';


function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box bg="blue.700" p={9} color="white">
      <Flex align="center" justifyContent={['center', 'flex-start']}>

        <Flex align="center" mr={2}>
          <img src={utn} alt='' style={{ maxWidth: '120px' }} />
        </Flex>

        <Spacer />
        <Heading as="h1" size="sm" mx={{ base: 4, md: 140 }}>
          Area de Gestion
        </Heading>
        <Spacer />

        <Box display={{ base: 'block', md: 'none' }}>
          <Button onClick={toggleMenu}>Menú</Button>
        </Box>

      </Flex>

      <Box display={{ base: 'none', md: 'block' }} >
        <Flex align="center" justifyContent="center" >
          <Link to="/inscripcionFormulario" mr={4} >
            Inscripcion a Mesas
          </Link>
          <Link href="#" mr={4}>
            Gestion de Alumnos
          </Link>
          <Link href="#" mr={4} mb={{ base: 2, md: 0 }}>
            Gestion de Mesas
          </Link>
          <Link href="#" mr={4} mb={{ base: 2, md: 0 }}>
            Consultas
          </Link>
        </Flex>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Flex
          direction="column"
          align={{ base: 'flex-start', md: 'center' }}
          mt={{ base: 4, md: 0 }}
        >
         <Link to="/inscripcionFormulario">Inscripción a Mesas</Link>
          <Link href="#" mr={4} mb={{ base: 2, md: 0 }}>
            Gestion de Alumnos
          </Link>
          <Link href="#" mr={4} mb={{ base: 2, md: 0 }}>
            Gestion de Mesas
          </Link>
          <Link href="#" mr={4} mb={{ base: 2, md: 0 }}>
            Consultas
          </Link>
        </Flex>
      </Collapse>
    </Box>
  );
}

export default Header;
