import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";

import { Header } from "@/components/Header";
import { CreateSuggestionForm } from "@/modules/suggestions/create/components/Form";
import { BreadCrumbContainer } from "@/components/BreadCrumb/Container";

export default function SuggestionCreatePage() {
  return (
    <>
      <Head>
        <title>Kaguya | Criação de sugestão</title>
      </Head>

      <Flex flexDirection="column">
        <Header headerType={"has-user-profile"} />

        <Flex maxW={780} w="100%" flexDirection={"column"} mx="auto" gap={4}>
          <Box mt={8}>
            <BreadCrumbContainer
              currentItem={{
                link: `/suggestions/create`,
                title: "Criar sugestão de trilha",
              }}
              items={[
                {
                  link: "/suggestions",
                  title: "Sugestões",
                },
              ]}
            />
          </Box>

          <Box
            as="main"
            w="100%"
            mb={8}
            p={8}
            bg="blackAlpha.700"
            borderRadius="2xl"
          >
            <CreateSuggestionForm />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
