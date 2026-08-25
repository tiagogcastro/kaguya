import { 
  Link as ChakraLink, useToken,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function RegisterLink() {
  const [blackAlpha900, blackAlpha700]= useToken("colors", [
    'blackAlpha.900', 
    'blackAlpha.700', 
  ]); 

  return (
    <>
      <NextLink href="/register" passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          justifyContent="center"

          w="100%"
          padding={["4"]}
          fontSize={["xs","sm", "md"]}
          
          bg={`linear-gradient(to right, ${blackAlpha900}, ${blackAlpha700})`}
          fontWeight="normal"
          borderTopRightRadius="md"
          _hover={{
            bg: "normal"
          }}
          >
          Registrar
        </ChakraLink>
      </NextLink>
    </>
  )
}