import { 
  Flex, 
} from '@chakra-ui/react';

import { RegisterText } from './RegisterText';
import { LoginLink } from './LoginLink';

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