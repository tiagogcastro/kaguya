import { 
  Text,
  useToast, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,

  Link as ChakraLink
} from '@chakra-ui/react';

import { useAuth } from '@/hooks/useAuth';

import { kaguyaApi } from '@/services/kaguya/apiClient';

import { apiError } from '@/utils/apiFormatError';
import { signOut } from '@/contexts/AuthContext';

interface UserAvatarModalProps {
  modal: {
    isOpen: boolean;
    onClose: () => void;
  };
}

export function ConfirmDisableAccountModal({
  modal,
}: UserAvatarModalProps) {
  const { setUser } = useAuth();

  const toast = useToast();

  async function handleDisableUserAccount() {
    try {
      await kaguyaApi.patch('/users/disable');

      setUser((prevState) => {
        if(prevState) {
          return {
            ...prevState,   
            enabled: false
          }
        }

        return prevState;
      });

      signOut();
      
      toast({
        title: 'Status da conta',
        description: 'Sua conta foi desativada.',
        status: 'info',
        duration: 6000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach(messageError => {
        toast({
          title: 'Erro na desativação da conta',
          description: messageError,
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top-right',
        });
      });
    }
  };

  return (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.700"
          opacity="0.6 !important"
        />
        <ModalContent
          bg="blackAlpha.600"
          alignItems="flex-start"
          py="4"
          mx="4"
        >
          <ModalHeader fontSize={["md", "lg"]}>Confirmação de desativação da conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            mt="2"
            alignItems="center"
            display="flex"
            flexDirection="column"
            w="100%"
          >
            <Box>
              <Text fontSize={["sm", "md"]}>
                Desativar esta conta significa que perderá o acesso imediato e não poderá usar-la na plataforma até que reative.
              </Text> 

              <Text fontSize={["sm", "md"]} mt="2">
                Ao confirmar a desativação da conta, estará automaticamente concordando com os &nbsp;
                <ChakraLink
                  href="/terms"
                  target="_blank"
                  color="pink.500"
                >
                  termos de uso da Kaguya.
                </ChakraLink>
              </Text>

              <Text fontSize={["sm", "md"]} mt="4">
                Você tem certeza em desativar a sua conta?
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter
            w="100%"
          >
            <Flex
              justifyContent="center"
              w="100%"
              gap="4"
            >
              <Button
                w="100%"
                colorScheme="pink"
                color="white"
                onClick={modal.onClose}
                fontSize={["sm", "md"]}
              >
                Não quero desativar
              </Button>
              <Button
                colorScheme='ghost'
                w="100%"
                onClick={handleDisableUserAccount}
                fontSize={["sm", "md"]}
              >
                Sim, quero desativar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

