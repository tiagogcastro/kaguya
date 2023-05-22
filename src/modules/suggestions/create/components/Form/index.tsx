import * as yup from "yup";

import { Box, Flex, Heading, useToast } from "@chakra-ui/react";

import { Button } from "@/components/Button";
import { DividerLine } from "@/components/DividerLine";
import { Input } from "@/components/Form/Input";
import Router from "next/router";
import { TextArea } from "@/components/Form/TextArea";
import { apiError } from "@/utils/apiFormatError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateSuggestionTrailData {
  title: string;
  description: string;
  trail: {
    name: string;
    description: string;
  };
}

const createSuggestionTrailSchema = yup.object().shape({
  title: yup.string().required("Coloque um título da sua sugestão"),
  description: yup.string().required("Coloque uma descrição da sua sugestão"),
  trail: yup.object().shape({
    name: yup.string().required("Nome da trilha obrigatório"),
    description: yup.string().required("Descrição da trilha obrigatória"),
  }),
});

export function CreateSuggestionForm() {
  const toast = useToast();

  const { formState, handleSubmit, register } =
    useForm<CreateSuggestionTrailData>({
      resolver: yupResolver(createSuggestionTrailSchema),
    });

  const errors = formState.errors;

  async function handleCreateTrailSuggestion() {
    try {
      toast({
        title: "Sugestão criada com sucesso",
        description:
          "Agradecemos sua sugestão. Ela ficará disponível na listagem.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      Router.push(`/suggestions/view/1`);
    } catch (error) {
      const errors = apiError(error);

      errors.messages.forEach((messageError) => {
        toast({
          title: "Erro na criação de sugestão",
          description: messageError,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      });
    }
  }

  return (
    <>
      <Box as="form">
        <Box>
          <Heading>Criar uma sugestão de trilha</Heading>
          <Box mt={2} maxW={780}>
            <Heading as="h2" fontSize={["md", "lg"]} color="gray.300" mb={8}>
              Por que a comunidade deve aceitar sua sugestão para ser
              implementada no aplicativo?
            </Heading>
            <Flex mt="4" flexDirection="column" gap="4">
              <Input
                {...register("title")}
                error={errors.title}
                labelText="Título da sugestão"
                labelProps={{
                  maxW: 460,
                }}
              />
              <TextArea
                {...register("description")}
                error={errors.description}
                labelText="Descrição da sugestão"
                labelProps={{
                  maxW: 460,
                }}
                maxHeight="260"
              />
            </Flex>
          </Box>
        </Box>

        <DividerLine my={8} />

        <Flex justifyContent="space-between" flexDirection="column" w="100%">
          <Heading as="h2" fontSize={["md", "lg", "2xl"]}>
            Informações da trilha
          </Heading>
          <Flex mt="4" flexDirection="column" gap="4">
            <Input
              {...register("trail.name")}
              error={errors.trail?.name}
              labelText="Nome da trilha"
              labelProps={{
                maxW: 460,
              }}
            />
            <TextArea
              {...register("trail.description")}
              error={errors.trail?.description}
              labelText="Descrição da trilha"
              labelProps={{
                maxW: 460,
              }}
              maxHeight="260"
            />
          </Flex>
        </Flex>

        <Button
          type="submit"
          bg="pink.500"
          color="white"
          mt={4}
          w="100%"
          maxW={460}
          _hover={{
            bg: "pink.500",
            filter: "brightness(90%)",
          }}
        >
          Criar sugestão
        </Button>
      </Box>
    </>
  );
}
