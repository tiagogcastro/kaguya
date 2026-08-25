import {
  Box,
  Link as ChakraLink,
  Divider,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import NextLink from "next/link";

export function Footer() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Box as="footer" bg="blackAlpha.800" p="8">
        <Flex
          w="100%"
          maxW={1480}
          mx="auto"
          justifyContent="space-between"
          flexDirection={!isLargerThan768 ? "column" : "row"}
          gap={["4", "0"]}
        >
          <Box>
            <Text
              color="gray.300"
              as="span"
              fontSize={["md"]}
              display="flex"
              alignItems="center"
              gap="6"
            >
              Kaguya - {new Date().getFullYear()}
            </Text>
          </Box>

          <Flex
            gap={["0.5", "0.5", "4"]}
            flexDirection={!isLargerThan768 ? "column" : "row"}
          >
            <NextLink href="/terms" passHref>
              <ChakraLink color="gray.300">Termos de uso</ChakraLink>
            </NextLink>

            <Divider orientation="vertical" />

            <NextLink href="/privacy-policy" passHref>
              <ChakraLink color="gray.300">Politica de privacidade</ChakraLink>
            </NextLink>

            <Divider orientation="vertical" />

            <NextLink href="/help" passHref>
              <ChakraLink color="gray.300">Ajuda</ChakraLink>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
