import { 
  Flex, 
} from '@chakra-ui/react';

import { LoginText } from '@/modules/login/components/ChangePageHeader/LoginText';
import { RegisterLink } from '@/modules/login/components/ChangePageHeader/RegisterLink';

export function LoginChangePageHeader() {
  return (
    <>
      <Flex
        justifyContent="space-between"
        w="100%"
        marginBottom="8"
      >
        <LoginText />
        <RegisterLink />
      </Flex>
    </>
  );

}