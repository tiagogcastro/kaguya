import {
  Box,
  Link as ChakraLink,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import Head from "next/head";
import { Header } from "@/components/Header";
import NextLink from "next/link";

export default function ListSuggestionsPage() {
  const desc = `Eu quero adicionar esta trilha porque eu acho que será util para todos da comunidade ter acesso organizado a conteudo de HTML, pois da um grande passo ao aprender conteudos de programação web no futuro.`;

  return (
    <>
      <Head>
        <title>Kaguya | Listagem de sugestões</title>
      </Head>

      <Flex flexDirection="column">
        <Header headerType={"has-user-profile"} />

        <Flex
          flexDirection={"column"}
          maxW={980}
          w="100%"
          mt={16}
          mb={8}
          px={4}
          mx={["0", "auto"]}
        >
          <Flex gap={4}>
            <Heading>Listagem de sugestões</Heading>
            <NextLink href="/suggestions/create">
              <ChakraLink
                display="flex"
                bg="pink.700"
                color="white"
                transition="all 0.2s"
                fontWeight="normal"
                fontSize={["xs", "sm", "md"]}
                px={6}
                py={2}
                gap="2"
                alignItems="center"
                borderRadius="md"
                _hover={{
                  bg: "normal",
                  filter: "brightness(120%)",
                }}
              >
                Adicionar nova sugestão
              </ChakraLink>
            </NextLink>
          </Flex>
          <Box mt={2}>
            <Text color="gray.300">
              A funcionalidade de sugestões está em fase de desenvolvimento.
            </Text>
            <Text color="gray.300">
              Após a versão 1 da funcionalidade estiver pronta, os próprios
              usuários poderão sugerir novas trilhas, playlists e aulas e a
              comunidade decidirá se o conteúdo irá para a plataforma.
            </Text>
          </Box>
          <Flex as="main" flexDirection="column" gap={4} mt={8}>
            <NextLink href={`/suggestions/view/slug`}>
              <ChakraLink
                display="flex"
                alignItems="center"
                w="100%"
                gap={6}
                bg="blackAlpha.800"
                cursor="pointer"
                borderRadius="lg"
                border="1px solid transparent"
                p={4}
                _hover={{
                  border: "1px solid",
                  borderColor: "pink.700",
                }}
              >
                <Image
                  src="/assets/gifs/defaultAvatar.gif"
                  alt="a"
                  w="32"
                  h="32"
                  borderRadius="md"
                />
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  position="relative"
                >
                  <Flex flexDirection="column">
                    <Heading as="h2" fontSize={["2xl"]} mb={1}>
                      Adicionar a trilha trará beneficios
                    </Heading>
                    <Text
                      fontSize={["md"]}
                      color="gray.300"
                      textOverflow="ellipsis"
                      position="relative"
                      overflow="hidden"
                      maxW="auto"
                    >
                      {desc.length > 180 ? `${desc.slice(0, 180)}...` : desc}
                    </Text>
                  </Flex>

                  <Flex flexDirection="column" mt={4}>
                    <Text as="span" fontSize={["md"]} color="gray.300">
                      Nome de trilha sugerido: {""}
                      <Text color="white" as="strong">
                        HTML
                      </Text>
                    </Text>
                    <Text as="span" fontSize={["md"]} color="gray.300">
                      Feito por {""}
                      <Text color="white" as="span">
                        Tiago Gonçalves
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
              </ChakraLink>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
