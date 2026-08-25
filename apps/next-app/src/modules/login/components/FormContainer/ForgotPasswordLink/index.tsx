import { 
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function ForgotPasswordLink() {
  return (
    <>
      <Text
        w="100%"
        pb="6"
        color="gray.300"
        fontSize={["sm", "md"]}
        pt="3"
      >
        <NextLink href="/recover-password" passHref>
          <ChakraLink
            color="gray.300"
            opacity="0.8"
            fontSize={["sm", "md"]}
            _hover={{
              color: "pink.500",
              textDecoration: "underline"
            }}
          >
            Esqueci minha senha
          </ChakraLink>
        </NextLink>
      </Text>
    </>
  )
}