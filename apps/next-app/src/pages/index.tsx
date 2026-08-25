import {
  Box,
  Link as ChakraLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  Highlight,
  Image,
  Text,
  useMediaQuery,
  useToken,
} from "@chakra-ui/react";

import { AiFillGithub } from "react-icons/ai";
import { BsFolderSymlinkFill } from "react-icons/bs";
import { DividerLine } from "@/components/DividerLine";
import { Footer } from "@/components/Footer";
import Head from "next/head";
import { Header } from "@/components/Header";
import Lordicon from "@/components/ReactLordicon";
import NextLink from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import { useSize } from "@chakra-ui/react-use-size";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const [pink800, white] = useToken("colors", ["pink.800", "white"]);
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  const height = (size?.width || 0) * 0.42;

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan1480] = useMediaQuery("(min-width: 1480px)");

  return (
    <>
      <Head>
        <title>Kaguya - Home</title>
        <meta
          name="description"
          content="Plataforma de ensino gratuito de programação"
        />
      </Head>

      <Header
        headerType={
          isAuthenticated ? "has-user-profile" : "has-sign-log-buttons"
        }
      />

      <Box as="main">
        <Box
          as="section"
          position="relative"
          ref={ref}
          w="100%"
          minH={height}
          _before={{
            content: '""',
            position: "absolute",
            opacity: 0.4,
            width: "100%",
            height: "100%",
            backgroundSize: ["cover"],
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(assets/svgs/background.svg)`,
            backgroundPositionX: "center",
          }}
        >
          <Flex
            position="relative"
            zIndex={2}
            maxWidth={1480}
            mx={["6", "auto"]}
            justifyContent="center"
            alignItems="center"
            mt={["12", "16", "32"]}
          >
            <Flex alignItems="center" flexDirection="column">
              <Heading
                as="h1"
                fontSize={["2xl", "3xl", "5xl", "6xl"]}
                maxWidth={"2xl"}
                fontWeight="bold"
                textAlign="center"
              >
                A melhor plataforma de ensino gratuito
              </Heading>
              <Text
                color="gray.300"
                as="strong"
                textAlign="center"
                fontSize={["sm", "md", "lg"]}
                mt="4"
                mx="auto"
                maxWidth={480}
                display="block"
              >
                Entruturada com conteúdos de forma legal e de fácil acesso para
                otimizar seus estudos na programação.
              </Text>
              <NextLink href="/login" passHref>
                <ChakraLink
                  bg="pink.500"
                  color="white"
                  size={["sm", "md", "lg"]}
                  mt="4"
                  py="3"
                  borderRadius="md"
                  textAlign="center"
                  w={240}
                  _hover={{
                    bg: "normal",
                    opacity: "0.9",
                  }}
                >
                  Começar agora
                </ChakraLink>
              </NextLink>
            </Flex>
          </Flex>
        </Box>

        <Box as="section" mt="8" pt="4" pb={["8", "32"]} mx={["4"]}>
          <Flex
            maxW={1480}
            px={4}
            mx="auto"
            alignItems="center"
            justifyContent="center"
            flexDirection={!isLargerThan1024 ? "column" : "row"}
            gap={!isLargerThan1480 ? "6" : "32"}
          >
            <Box mt="8">
              <Flex
                alignItems={!isLargerThan768 ? "flex-start" : "center"}
                gap="4"
                flexDirection={!isLargerThan768 ? "column" : "row"}
              >
                <Box w={["16", "24"]}>
                  <Lordicon
                    icon="ruins"
                    size={"100%"}
                    delay={7000}
                    colors={{
                      primary: pink800,
                      secondary: white,
                    }}
                  />
                </Box>
                <Heading fontSize={["2xl", "3xl", "4xl"]}>
                  O que é a plataforma?
                </Heading>
              </Flex>
              <Text
                maxW={540}
                fontSize={["md", "lg", "xl"]}
                color="gray.300"
                mt="4"
              >
                <Highlight
                  query={["organiza", "maior facilidade", "podendo evoluir"]}
                  styles={{
                    color: "pink.500",
                  }}
                >
                  A plataforma organiza os diversos conteúdos espalhados pela
                  internet para que a comunidade de programação tenha uma maior
                  facilidade de começar ou continuar seus estudos, podendo
                  evoluir junto e de forma coordenada com outros alunos.
                </Highlight>
              </Text>
            </Box>
            <Image
              src="/assets/svgs/online-learning.svg"
              alt="a"
              w={!isLargerThan1024 ? 400 : 480}
              maxH={480}
            />
          </Flex>
        </Box>

        <DividerLine />

        <Box as="section" py="4" pb={["8", "32"]} mx={["4"]}>
          <Flex
            maxW={1480}
            px={4}
            mx="auto"
            alignItems="center"
            justifyContent="center"
            gap={!isLargerThan1024 ? "6" : "32"}
            flexDirection={!isLargerThan1024 ? "column-reverse" : "row"}
          >
            <Image
              src="/assets/svgs/success-factors.svg"
              alt="a"
              w={!isLargerThan1024 ? 400 : 480}
              maxH={480}
            />
            <Box mt="8">
              <Flex
                alignItems={!isLargerThan768 ? "flex-start" : "center"}
                gap="4"
                flexDirection={!isLargerThan768 ? "column" : "row"}
              >
                <Box w={["16", "24"]}>
                  <Lordicon
                    icon="folder"
                    size={"100%"}
                    delay={7000}
                    colors={{
                      primary: pink800,
                      secondary: white,
                    }}
                  />
                </Box>
                <Heading
                  fontSize={["2xl", "3xl", "4xl"]}
                  maxW={!isLargerThan768 ? 320 : 540}
                >
                  Como organizamos os conteúdos
                </Heading>
              </Flex>
              <Box>
                <Text
                  maxW={540}
                  color="gray.300"
                  mt="4"
                  fontSize={["md", "lg", "xl"]}
                >
                  <Highlight
                    query={["trilha", "simples", "intuitiva"]}
                    styles={{
                      color: "pink.500",
                    }}
                  >
                    A plataforma organiza cada tecnologia em uma trilha para que
                    o usuário consiga de forma simples e intuitiva escolher o
                    que deseja assistir.
                  </Highlight>
                </Text>
                <Text
                  maxW={540}
                  color="gray.300"
                  mt="4"
                  fontSize={["md", "lg", "xl"]}
                >
                  <Highlight
                    query={["playlists", "organização mais precisa"]}
                    styles={{
                      color: "pink.500",
                    }}
                  >
                    Dentro da trilha possuí diversas playlists, fazendo com que
                    o conteúdo tenha diversas etapas e uma organização mais
                    precisa.
                  </Highlight>
                </Text>
                <Text
                  maxW={540}
                  color="gray.300"
                  mt="4"
                  fontSize={["md", "lg", "xl"]}
                >
                  Ao acessar uma playlist, poderá ver uma lista de blocos que
                  contém as aulas.
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Box as="section" py={4} pb={16} bg="blackAlpha.400">
          <Flex
            maxW={1480}
            px={4}
            alignItems={!isLargerThan768 ? "flex-start" : "center"}
            justifyContent="center"
            gap="32"
            mx="auto"
          >
            <Box mt={["12", "24"]}>
              <Heading
                maxW={!isLargerThan768 ? 480 : 540}
                fontSize={["3xl", "4xl", "6xl"]}
                textAlign="center"
                mx="auto"
              >
                <Highlight
                  query={["Kaguya"]}
                  styles={{
                    color: "pink.500",
                  }}
                >
                  Por que estudar na Kaguya?
                </Highlight>
              </Heading>

              <Grid
                gridTemplateColumns={[
                  "1fr",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap="4"
                mt={["8", "16"]}
              >
                <GridItem
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  pt="0"
                  pb="6"
                >
                  <Box w={["12", "16"]}>
                    <Lordicon
                      icon="book"
                      size={"100%"}
                      delay={7000}
                      colors={{
                        primary: pink800,
                        secondary: white,
                      }}
                    />
                  </Box>
                  <Heading
                    as="h2"
                    fontSize={["lg", "2xl", "3xl"]}
                    mt="4"
                    mb="4"
                    w="max"
                  >
                    Fácil aprendizado
                  </Heading>
                  <Text maxW={320} color="gray.300">
                    Nosso objetivo é tornar a experiência o mais agradável
                    possível para nossos alunos.
                  </Text>
                </GridItem>
                <GridItem
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  pt="0"
                  pb="6"
                >
                  <Box w={["12", "16"]}>
                    <Lordicon
                      icon="consultation"
                      size={"100%"}
                      delay={7000}
                      colors={{
                        primary: pink800,
                        secondary: white,
                      }}
                    />
                  </Box>
                  <Heading
                    as="h2"
                    fontSize={["lg", "2xl", "3xl"]}
                    mt="4"
                    mb="4"
                    w="max"
                  >
                    Comunidade e network
                  </Heading>
                  <Text maxW={320} color="gray.300">
                    Conheça e conecte-se com outros desenvolvedores.
                  </Text>
                </GridItem>
                <GridItem
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  pt="0"
                  pb="6"
                >
                  <Box w={["12", "16"]}>
                    <Lordicon
                      icon="editDocument"
                      size={"100%"}
                      delay={7000}
                      colors={{
                        primary: pink800,
                        secondary: white,
                      }}
                    />
                  </Box>
                  <Heading
                    as="h2"
                    fontSize={["lg", "2xl", "3xl"]}
                    mt="4"
                    mb="4"
                    w="max"
                  >
                    Qualidade de ensino
                  </Heading>
                  <Text maxW={320} color="gray.300">
                    Tenha acesso a aulas para juniors e seniors, tudo de
                    qualidade e grátis
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </Box>

        <DividerLine />

        <Box as="section" pb={16} bg="blackAlpha.400">
          <Flex
            maxW={1480}
            px={4}
            alignItems={!isLargerThan768 ? "flex-start" : "center"}
            justifyContent="center"
            gap="32"
            mx="auto"
          >
            <Box mt={["12", "24"]} maxW={768} w="100%">
              <Heading
                maxW={!isLargerThan768 ? 480 : 540}
                fontSize={["2xl", "3xl"]}
                textAlign="center"
                mx="auto"
              >
                Conheça os desenvolvedores
              </Heading>

              <Flex
                mt={["8", "16"]}
                gap={8}
                alignItems="flex-start"
                flexWrap="wrap"
              >
                <Flex
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <Heading
                    as="h2"
                    fontSize={["md", "lg"]}
                    mt={2}
                    mb={2}
                    w="max"
                  >
                    Tiago Gonçalves
                  </Heading>
                  <Text
                    maxW={320}
                    color="gray.300"
                    mb={2}
                    fontSize={["sm", "md"]}
                  >
                    Desenvolvedor fullstack NextJS, NodeJS e Typescript há 3
                    anos.
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    <ChakraLink
                      href="https://github.com/Tiaguin061"
                      target="_blank"
                      bg="gray.600"
                      color="white"
                      size={["sm", "md", "lg"]}
                      p={2}
                      borderRadius="md"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                      _hover={{
                        bg: "normal",
                        opacity: "0.9",
                      }}
                    >
                      <AiFillGithub size={18} />
                      Acessar github
                    </ChakraLink>

                    <ChakraLink
                      href="https://tiagogoncalves.netlify.app"
                      target="_blank"
                      bg="pink.600"
                      color="white"
                      size={["sm", "md", "lg"]}
                      p={2}
                      borderRadius="md"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                      _hover={{
                        bg: "normal",
                        opacity: "0.9",
                      }}
                    >
                      <BsFolderSymlinkFill size={18} />
                      Acessar Portfólio
                    </ChakraLink>
                  </Flex>
                </Flex>

                <Flex
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <Heading
                    as="h2"
                    fontSize={["md", "lg"]}
                    mt={2}
                    mb={2}
                    w="max"
                  >
                    Marcos Proença
                  </Heading>
                  <Text maxW={320} color="gray.300" fontSize={["sm", "md"]}>
                    Desenvolvedor fullstack NextJS, NodeJS e Typescript.
                  </Text>
                  <Flex gap={2}>
                    <ChakraLink
                      href="https://github.com/pprograminha"
                      target="_blank"
                      bg="gray.600"
                      color="white"
                      size={["sm", "md", "lg"]}
                      p={2}
                      mt={2}
                      borderRadius="md"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                      _hover={{
                        bg: "normal",
                        opacity: "0.9",
                      }}
                    >
                      <AiFillGithub size={18} />
                      Acessar github
                    </ChakraLink>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
