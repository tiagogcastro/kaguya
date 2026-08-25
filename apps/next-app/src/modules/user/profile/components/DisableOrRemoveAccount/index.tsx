import { Flex, useDisclosure } from '@chakra-ui/react';
import { IoTrashBin } from 'react-icons/io5';
import { MdBlock } from 'react-icons/md';

import { Button } from '@/components/Button';
import { ConfirmDisableAccountModal } from './ConfirmDisableAccountModal';
import { ConfirmRemoveAccountModal } from './ConfirmRemoveAccountModal';

export function DisableOrRemoveAccount() {
  const confirmDisableAccountModal = useDisclosure();
  const confirmRemoveAccountModal = useDisclosure();

  return (
    <>
      <Flex
        as="footer"
        w="100%"
        maxW={460}
        px={["4", "8"]}
        gap="4"

        mt="8"
      >
        <Button
          type="button"
          w="100%"
          bg="none"
          onClick={confirmDisableAccountModal.onOpen}
        >
          <MdBlock />
          Desativar conta
        </Button>
        <Button
          type="button"
          w="100%"
          bg="none"
          onClick={confirmRemoveAccountModal.onOpen}
        >
          <IoTrashBin />
          Excluir conta
        </Button>
      </Flex>
      
      <ConfirmDisableAccountModal modal={confirmDisableAccountModal} />
      <ConfirmRemoveAccountModal modal={confirmRemoveAccountModal} />
    </>
  )
}