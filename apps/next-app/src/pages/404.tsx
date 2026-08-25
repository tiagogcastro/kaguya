// pages/404.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Box, Flex, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(3)

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout | null = null
    if(timer > 0) {
      redirectTimer = setTimeout(() => {
        setTimer(timer - 1)
      }, 1000);
    } else {
      router.back();
    }

    return () => {
      if(redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [timer]);

  return (
    <Flex h="full" alignItems="center" justifyContent="center">
      <Box bg="blackAlpha.700" py="16" px="8" mx="4" borderRadius="md">
        <Text as="h1" fontSize="4xl" mb="5">
          <Text as="strong" color="pink.800">404</Text> - Página não encontrada
        </Text>
        <Text fontSize="2xl">Redirecionando para outra página em... {timer}</Text>
      </Box>
    </Flex>
  );
};
export default NotFoundPage;

