import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import Lordicon from "@/components/ReactLordicon";
import { TrailData } from "@/services/kaguya/types";
import { apiError } from "@/utils/apiFormatError";
import { kaguyaApi } from "@/services/kaguya/apiClient";
import { queryClient } from "@/services/reactQueryClient";

interface TrailMenuProps {
  trail: TrailData;
}

export function TrailMenu({ trail }: TrailMenuProps) {
  const [isLargerThan380] = useMediaQuery("(min-width: 380px)");
  const toast = useToast();

  async function addTrail() {
    try {
      await kaguyaApi.post("/user-trails", {
        trail_id: trail.id,
      });

      await queryClient.invalidateQueries("userTrails");
      await queryClient.invalidateQueries("othersTrails");

      toast({
        title: "Trilha adicionada",
        description: `Você adicionou a trilha de ${trail.name} na sua conta.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      const errors = apiError(error);

      errors.messages.forEach((messageError) => {
        toast({
          title: "Erro na adição da trilha",
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
      <Menu placement="bottom-end">
        <MenuButton
          aria-label="Options"
          position="absolute"
          right="8"
          top="4"
          w="8"
          h="8"
        >
          ...
        </MenuButton>
        <MenuList bg="blackAlpha.700" border="none" p={["2", "4"]}>
          <MenuItem
            px="4"
            bg="none"
            fontSize={["xs", "md"]}
            borderRadius="md"
            transition="0.2s all"
            border="1px solid transparent"
            _first={{
              bg: "none",
            }}
            _hover={{}}
            _active={{
              bg: "none",
            }}
            icon={
              <Lordicon
                icon="addCard"
                trigger="hover"
                size={isLargerThan380 ? 23 : 18}
              />
            }
            onClick={addTrail}
          >
            Adicionar a minhas trilhas
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
