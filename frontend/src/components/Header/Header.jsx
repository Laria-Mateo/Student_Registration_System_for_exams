import { useState } from 'react';
import { Box, Flex, Heading, Spacer, Collapse, IconButton, chakra } from '@chakra-ui/react';
import utn from '/utn-nacional.jpg'
import { Link } from 'react-router-dom';
import { handleInscripcionExitosa } from '../../Refresh';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <Box bg="blue.700" p={7} color="white">
      <Flex align="center" justifyContent={['center', 'flex-start']}>

        <Flex align="center" >
          <img src={utn} alt='' style={{ maxWidth: '120px' }} />
        </Flex>

        <Box>
          <Heading as="h1" size="lg" mx={{ base: 4, md: 630 }}>
            Area de Gestion
          </Heading>
        </Box>

        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            onClick={toggleMenu}
            icon={
              <chakra.svg
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                color="white"
                transition="transform 0.3s"
                transform={isOpen ? 'rotate(90deg)' : ''}
              >
                <path d="M2 6h20v2H2zm0 5h20v2H2zm0 5h20v2H2z" />
              </chakra.svg>
            }
            aria-label="Menú"
            variant="outline"
            colorScheme="white"
            size="lg"
          />
        </Box>

      </Flex>

      <Box display={{ base: 'none', md: 'block' }} >
        <Flex align="center" justifyContent="center" >
          <Box mr={3}>
            <Link
              to="/inscripcionFormulario"
              onClick={() => handleLinkClick("/inscripcionFormulario")}
              style={{ color: selectedLink === "/inscripcionFormulario" ? "black" : "white" }}
            >
            Gestion de Inscripciones
            </Link>
          </Box>
          <Box mr={3}>
            <Link
              to="/gestionDeAlumnos"
              onClick={() => handleLinkClick("/gestionDeAlumnos")}
              style={{ color: selectedLink === "/gestionDeAlumnos" ? "black" : "white" }}
            >
              Gestion de Alumnos
            </Link>
          </Box>
          <Box mr={3}>
            <Link
              to="/gestionDeMesas"
              onClick={() => handleLinkClick("/gestionDeMesas")}
              style={{ color: selectedLink === "/gestionDeMesas" ? "black" : "white" }}
            >
              Gestion de Mesas
            </Link>
          </Box>
          <Box mr={3}>
            <Link
              to="/consultas"
              onClick={() => handleLinkClick("/consultas")}
              style={{ color: selectedLink === "/consultas" ? "black" : "white" }}
            >
              Consultas
            </Link>
          </Box>
        </Flex>
      </Box>

      <Collapse in={isOpen} animateOpacity>
        <Flex
          direction="column"
          align={{ base: 'flex-start', md: 'center' }}
          mt={{ base: 4, md: 0 }}
        >
          <Link
            to="/inscripcionFormulario"
            onClick={() => handleLinkClick("/inscripcionFormulario")}
            style={{ color: selectedLink === "/inscripcionFormulario" ? "black" : "white" }}
          >
            Gestion de Inscripciones
          </Link>
          <Link
            to="/gestionDeAlumnos"
            onClick={() => handleLinkClick("/gestionDeAlumnos")}
            style={{ color: selectedLink === "/gestionDeAlumnos" ? "black" : "white" }}
          >
            Gestion de Alumnos
          </Link>
          <Link
            to="/gestionDeMesas"
            onClick={() => handleLinkClick("/gestionDeMesas")}
            style={{ color: selectedLink === "/gestionDeMesas" ? "black" : "white" }}
          >
            Gestion de Mesas
          </Link>
          <Link
            to="/consultas"
            onClick={() => handleLinkClick("/consultas")}
            style={{ color: selectedLink === "/consultas" ? "black" : "white" }}
          >
            Consultas
          </Link>
        </Flex>
      </Collapse>
    </Box>
  );
}

export default Header;
