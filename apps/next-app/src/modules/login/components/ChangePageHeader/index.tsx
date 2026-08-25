import { 
  Flex, 
} from '@chakra-ui/react';

import { LoginText } from './LoginText';
import { RegisterLink } from './RegisterLink';

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