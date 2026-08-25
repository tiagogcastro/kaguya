import { 
  Flex, 
} from '@chakra-ui/react';

import { RegisterText } from '@/modules/register/components/ChangePageHeader/RegisterText';
import { LoginLink } from '@/modules/register/components/ChangePageHeader/LoginLink';

export function RegisterChangePageHeader() {
  return (
    <>
      <Flex
        justifyContent="space-between"
        w="100%"
        marginBottom="8"
      >
        <LoginLink />
        <RegisterText />
      </Flex>
    </>
  );

}