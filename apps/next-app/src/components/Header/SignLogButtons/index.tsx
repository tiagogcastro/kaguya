import {
  Flex, Link as ChakraLink,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaUser } from 'react-icons/fa';

export function SignLogButtons() {
  return (
    <Flex
      ml="auto"
      gap="12"
      alignItems="center"
    >
      <NextLink href="/login" passHref>
        <ChakraLink
          fontStyle={["sm", "md"]}
          fontWeight="bold"

          _hover={{
            textDecoration: "none"
          }}
        >
          <Text
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={["xs", "md"]}
            gap="3"
          >
            <FaUser /> Entrar
          </Text>                  
        </ChakraLink>
      </NextLink>

      <NextLink href="/register" passHref>
        <ChakraLink
          display={["none", "block"]}
          fontStyle={["sm", "md"]}
          fontWeight="bold"
          border="1px solid"
          borderColor="pink.500"
          borderRadius="md"
          p="2"
          px="6"
          transition="all 0.3s"
          whiteSpace="nowrap"
          _hover={{
            textDecoration: "none",
            bg:"pink.500"
          }}
        >
          <Text fontSize={["xs", "md"]}>Criar Conta</Text>  
        </ChakraLink>
      </NextLink>
    </Flex>
  );
}