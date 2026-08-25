import { BreadCrumbContainer } from "@/components/BreadCrumb/Container";
import { Header } from "@/components/Header";
import Lordicon from "@/components/ReactLordicon";
import { LessonVideo } from "@/modules/playlist/components";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export default function ViewSuggestion() {
  const router = useRouter();
  const { trailSuggestionslug } = router.query;

  const getSuggestion = useCallback(async () => {
    try {
      console.log(trailSuggestionslug);
    } catch (error) {
      console.log(error);
    }
  }, [trailSuggestionslug]);

  useEffect(() => {
    getSuggestion();
  }, []);

  const desc = `Eu quero adicionar esta trilha porque eu acho que será util para todos da comunidade ter acesso organizado a conteudo de HTML, pois da um grande passo ao aprender conteudos de programação web no futuro.`;

  return (
    <>
      <Head>
        <title>Kaguya | Sugestão de HTML5 </title>
      </Head>

      <Flex flexDirection="column">
        <Header headerType={"has-user-profile"} />

        <Flex
          maxW={1480}
          w="100%"
          flexDirection={"column"}
          my={16}
          mx={["0", "auto"]}
        >
          <BreadCrumbContainer
            currentItem={{
              link: `/suggestions/view/slug1`,
              title: "Trail suggestion name",
            }}
            items={[
              {
                link: "/suggestions",
                title: "Sugestões",
              },
            ]}
          />

          <Flex>
            <Flex flexDirection="column">
              <Flex flexDirection="column" mt={8} mb={4}>
                <Image
                  src="/assets/gifs/defaultAvatar.gif"
                  alt="a"
                  w="32"
                  h="32"
                  borderRadius="md"
                />
                <Flex flexDirection="column" mt={4}>
                  <Text as="span" fontSize={["md", "lg"]} color="gray.300">
                    Nome de trilha sugerido: {""}
                    <Text color="white" as="span">
                      HTML
                    </Text>
                  </Text>
                  <Text color="gray.300" as="span" fontSize={["md", "lg"]}>
                    Decrição da trilha sugerido: {""}
                    <Text as="span" color="white">
                      Eu quero adicionar esta trilha porque eu acho que será
                      util para todos da comunidade ter acesso organizado a
                      conteudo de HTML, pois da um grande passo ao aprender
                      conteudos de programação web no futuro.
                    </Text>
                  </Text>
                </Flex>
              </Flex>

              <Flex
                alignItems="flex-start"
                w="100%"
                gap={6}
                bg="blackAlpha.800"
                borderRadius="lg"
                p={6}
              >
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
                      {desc}
                    </Text>
                  </Flex>
                  <Text
                    mt={3}
                    as="span"
                    fontSize={["md", "lg"]}
                    color="gray.300"
                  >
                    Sugerido por {""}
                    <Text color="white" as="span">
                      Tiago Gonçalves
                    </Text>
                  </Text>
                </Flex>
              </Flex>

              <Flex flexDirection="column" mt={8}>
                <Flex gap={4}>
                  <Heading fontSize={["2xl"]}>
                    Playlists sugeridas nesta trilha
                  </Heading>
                </Flex>

                <Accordion
                  allowToggle
                  w="100%"
                  flexDirection="column"
                  display="flex"
                  mt={6}
                  gap={4}
                >
                  <AccordionItem border="none">
                    <AccordionButton
                      w="100%"
                      bg="blackAlpha.500"
                      display="flex"
                      justifyContent="space-between"
                      py={6}
                      px={["4", "8"]}
                      position="relative"
                      transition="all 0.3s"
                      border="1px solid transparent"
                      borderRadius="md"
                      _hover={{
                        border: "1px solid",
                        borderColor: "pink.500",
                      }}
                    >
                      <Box>
                        <Text
                          fontWeight="bold"
                          mb={2}
                          fontSize={["sm", "md", "lg"]}
                        >
                          Introdução ao HTML 5
                        </Text>
                        <Text
                          color="gray.300"
                          letterSpacing="wider"
                          lineHeight="1.6"
                          textAlign="left"
                          fontSize={["xs", "sm", "md"]}
                        >
                          descrição
                        </Text>
                      </Box>
                      <AccordionIcon fontSize="3xl" />
                    </AccordionButton>

                    <AccordionPanel
                      as="ul"
                      py={4}
                      pr={0}
                      pl={8}
                      display="flex"
                      flexDirection="column"
                    >
                      <Accordion
                        allowToggle
                        w="100%"
                        p="0"
                        flexDirection="column"
                        display="flex"
                        gap={4}
                      >
                        <AccordionItem border="none">
                          <AccordionButton
                            bg="blackAlpha.500"
                            p={4}
                            borderRadius="md"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            _hover={{
                              bg: "normal",
                            }}
                          >
                            <Flex
                              flexDirection="column"
                              alignItems="flex-start"
                              px={4}
                            >
                              <Text
                                fontWeight="bold"
                                fontSize={["sm", "md"]}
                                textAlign="left"
                              >
                                Block name suggestion
                              </Text>
                            </Flex>
                            <AccordionIcon fontSize="3xl" />
                          </AccordionButton>

                          <AccordionPanel
                            as="ul"
                            py={4}
                            px={6}
                            display="flex"
                            flexDirection="column"
                            gap={4}
                          >
                            <Flex as="li">
                              <Text
                                cursor="pointer"
                                display="flex"
                                alignItems="center"
                                gap="1"
                                ml="4"
                              >
                                <Lordicon
                                  icon="play"
                                  trigger="morph"
                                  size={20}
                                />
                                Aula X
                              </Text>
                            </Flex>
                            <Flex as="li">
                              <Text
                                cursor="pointer"
                                display="flex"
                                alignItems="center"
                                gap="1"
                                ml="4"
                              >
                                <Lordicon
                                  icon="play"
                                  trigger="morph"
                                  size={20}
                                />
                                Aula X
                              </Text>
                            </Flex>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
            </Flex>
            {/* <Box>
              <LessonVideo
                lesson={{
                  id: "a",
                  completed: false,
                  description: "batata",
                  link: "https://www.youtube.com/embed/wtawNQyyIvM",
                  name: "batata 1",
                  slug: "/slug",
                  state: "liked",
                  block_id: "a",
                  _count: {
                    dislikes: 0,
                    likes: 0,
                    views: 0,
                  },
                }}
              />
            </Box> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
