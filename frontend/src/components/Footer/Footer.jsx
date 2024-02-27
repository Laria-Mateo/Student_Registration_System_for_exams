import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.800"
      color="white"
      textAlign="center"
      p={5}
      borderTop="1px solid"
      borderColor="gray.600"
    >
      <Text>Copyright © 2024 Universidad Tecnológica Nacional. Todos los derechos reservados.</Text>
      <Link
        href="https://www.linkedin.com/in/mateo-laria-917889213/"
        isExternal
        color="teal.300"
        fontWeight="bold"
        mt={2}
      >
        Desarrollado por Mateo F. Laria
      </Link>

    </Box>
  );
};

export default Footer;