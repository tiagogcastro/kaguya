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
} from '@chakra-ui/react';

import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/contexts/AuthContext';

interface ConfirmSignOutModalProps {
  modal: {
    isOpen: boolean;
    onClose: () => void;
  }
}

export function ConfirmSignOutModal({
  modal
}: ConfirmSignOutModalProps) {
  const toast = useToast();

  const { user } = useAuth();
  
  async function handleSignOut() {
    modal.onClose();
    signOut();

    toast({
      title: 'Deslogado com sucesso',
      description: `Você deslogou de sua conta. Volte sempre!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.700"
          opacity="0.6 !important"
        />
        <ModalContent
          bg="blackAlpha.700"
          alignItems="flex-start"
          py="4"
          mx="4"
        >
          <ModalHeader fontSize={["md", "lg"]}>Deslogar da sessão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={["sm", "md"]}>
              Tem certeza que deseja sair da sua conta?
            </Text>
            <br />
            <Text fontSize={["sm", "md"]}>
              Esperamos que seu dia tenha sido incrível e que seus estudos aqui na plataforma tenha sido como o esperado. Estaremos contentes em recebe-lo(a) de volta, 
              <Text
                display="inline"
                color="pink.500"
                fontSize={["sm", "md"]}
              > {user?.name || user?.username}</Text>!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='pink'
              mr={3}
              onClick={modal.onClose}
              fontSize={["sm", "md"]}
            >
              Cancelar
            </Button>
            <Button
              colorScheme='ghost'
              onClick={handleSignOut}
              fontSize={["sm", "md"]}
            >
              Sim, quero sair
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}