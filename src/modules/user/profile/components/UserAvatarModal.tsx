import {
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { AxiosError } from "axios";

import { Input } from "@/components/Form/Input";

import { useAuth } from "@/hooks/useAuth";

import { kaguyaApi } from "@/services/kaguya/apiClient";

import { apiError } from "@/utils/apiFormatError";

interface UserAvatarModalProps {
  modal: {
    isOpen: boolean;
    onClose: () => void;
  };
}

export function UserAvatarModal({ modal }: UserAvatarModalProps) {
  const { user, setUser } = useAuth();

  const toast = useToast();

  async function handleUpdateUserAvatar(avatar: File | null | undefined) {
    try {
      const fileTypeAccepted = [
        "image/png",
        "image/svg",
        "image/jpeg",
        "image/gif",
      ];

      if (!avatar) {
        throw new Error("Escolha uma avatar para atualiza-lo.");
      }

      if (!fileTypeAccepted.includes(avatar.type)) {
        throw new Error(
          "Tipos de arquivo válido são: .png | .gif | .svg | .jpeg"
        );
      }

      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await kaguyaApi.patch("/users/avatar", formData);

      setUser((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            avatar_url: response.data.avatar_url,
          };
        }

        return prevState;
      });

      toast({
        title: "Atualização da foto de perfil",
        description: "Foto de perfil atualizada com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });

      modal.onClose();
    } catch (error: any) {
      if (error instanceof Error) {
        return toast({
          title: "Erro na atualização do avatar",
          description: error?.message,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      }

      if (error instanceof AxiosError) {
        const errors = apiError(error);

        errors.messages.forEach((messageError) => {
          toast({
            title: "Erro na atualização do avatar",
            description: messageError,
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top-right",
          });
        });
      }
    }
  }

  async function handleRemoveUserAvatar() {
    try {
      await kaguyaApi.patch("/users/avatar", {
        avatar: null,
      });

      setUser((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            avatar_url: null,
          };
        }

        return prevState;
      });

      toast({
        title: "Remoção da foto de perfil",
        description: "Foto de perfil removida com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });

      modal.onClose();
    } catch (error: any) {
      if (error instanceof Error) {
        return toast({
          title: "Erro na remoção do avatar",
          description: error?.message,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      }

      const errors = apiError(error);

      errors.messages.forEach((messageError) => {
        toast({
          title: "Erro na remoção do avatar",
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
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay bg="blackAlpha.700" opacity="0.6 !important" />
        <ModalContent bg="blackAlpha.600" alignItems="flex-start" py="4" mx="4">
          <ModalHeader fontSize={["md", "lg"]}>
            {user?.avatar_url ? (
              <>Remoção ou atualização de foto de perfil</>
            ) : (
              <>Atualização de foto de perfil</>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            mt="4"
            alignItems="center"
            display="flex"
            flexDirection="column"
            w="100%"
          >
            <Box
              border="3px solid"
              borderColor="pink.500"
              borderRadius="50%"
              p="2"
            >
              <Box h={180} w={180}>
                <Avatar
                  w="100%"
                  h="100%"
                  bg="blackAlpha.600"
                  src={user?.avatar_url || "/assets/gifs/defaultAvatar.gif"}
                />
              </Box>
            </Box>

            {user?.avatar_url ? (
              <Text fontSize={["sm", "md"]} mt="8">
                Você deseja remover ou trocar sua foto de perfil?
              </Text>
            ) : (
              <Text fontSize={["sm", "md"]} mt="8">
                Você deseja trocar sua foto de perfil?
              </Text>
            )}
          </ModalBody>

          <ModalFooter w="100%">
            <Flex justifyContent="center" w="100%">
              {user?.avatar_url && (
                <Button
                  colorScheme="ghost"
                  mr={3}
                  onClick={handleRemoveUserAvatar}
                  fontSize={["sm", "md"]}
                >
                  Remover foto de perfil
                </Button>
              )}
              <Box
                as="label"
                cursor="pointer"
                position="relative"
                bg="pink.500"
                p="2"
                px="4"
                borderRadius="md"
                transition="all 0.2s"
                _hover={{
                  filter: "brightness(110%)",
                }}
              >
                <input
                  type="file"
                  name="avatar"
                  style={{
                    position: "absolute",
                    zIndex: "10",
                    width: "100%",
                    height: "100%",
                    display: "none",
                  }}
                  onChange={(e) =>
                    handleUpdateUserAvatar(e.target.files?.item(0))
                  }
                />
                Atualizar foto de perfil
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
