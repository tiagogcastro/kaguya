import {
  Button as ChakraButton,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import { ConfirmRemoveTrailModal } from "./ConfirmRemoveTrailModal";
import Lordicon from "@/components/ReactLordicon";
import { TrailData } from "@/services/kaguya/types";
import { apiError } from "@/utils/apiFormatError";
import { kaguyaApi } from "@/services/kaguya/apiClient";
import { queryClient } from "@/services/reactQueryClient";
import { useState } from "react";
import { useTrail } from "@/hooks/useTrail";

export interface AddRemoveTrailButtonProps {
  isMdVersion?: boolean;
  trail: TrailData | undefined;
}

export function AddRemoveTrailButton({ trail }: AddRemoveTrailButtonProps) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const confirmRemoveTrailModal = useDisclosure();

  const { setTrailData } = useTrail();

  async function addUserTrail() {
    setLoading(true);

    try {
      await kaguyaApi.post("/user-trails", {
        trail_id: trail?.id,
      });

      toast({
        title: "Trilha adicionada",
        description: `Você adicionou a trilha de ${trail?.name} na sua conta.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      queryClient.setQueryData<TrailData | undefined>(
        ["uniqueTrail", trail?.slug],
        (data) => {
          if (data) {
            const finalData = {
              ...data,
              user_trail: {
                progress: data?.user_trail?.progress || 0,
                enabled: true,
              },
              _count: {
                ...data._count,
                users: data._count.users + 1,
              },
            };

            setTrailData(finalData);

            return finalData;
          }

          return data;
        }
      );

      await queryClient.invalidateQueries(["playlistsFromTrail", trail?.slug]);
      await queryClient.invalidateQueries("othersTrails");
      await queryClient.invalidateQueries("userTrails");
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((messageError) => {
        toast({
          title: "Erro na adição da trilha na conta",
          description: messageError,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      });
    }

    setLoading(false);
  }

  async function handleRemoveUserTrail() {
    confirmRemoveTrailModal.onOpen();
  }

  if (trail?.user_trail?.enabled) {
    return (
      <>
        <ChakraButton
          bg="#a90f6478"
          color="white"
          transition="all 0.2s"
          fontWeight="normal"
          fontSize={["xs", "sm", "md"]}
          px="6"
          gap="2"
          _hover={{
            bg: "normal",
            filter: "brightness(120%)",
          }}
          disabled={loading}
          onClick={handleRemoveUserTrail}
        >
          <Lordicon trigger="hover" icon="trash" size={20} />
          {isLargerThan768 && "Remover trilha"}
        </ChakraButton>

        <ConfirmRemoveTrailModal
          modal={confirmRemoveTrailModal}
          trail={trail}
          setLoading={setLoading}
        />
      </>
    );
  }

  return (
    <>
      <ChakraButton
        bg="#a90f6478"
        color="white"
        transition="all 0.2s"
        fontWeight="normal"
        position="relative"
        fontSize={["xs", "sm", "md"]}
        px="6"
        gap="2"
        _hover={{
          bg: "normal",
          filter: "brightness(120%)",
        }}
        disabled={loading}
        onClick={addUserTrail}
      >
        <Lordicon icon="addCard" size={20} />
        {isLargerThan768 && "Adicionar trilha"}
      </ChakraButton>
    </>
  );
}
