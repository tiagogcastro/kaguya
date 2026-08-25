import { useAuth } from '@/hooks/useAuth';
import { Heading, Text } from '@chakra-ui/react';

export function Welcome() {
  const { user } = useAuth();

  return (
    <>
      <Text
        color="gray.300"
        letterSpacing="wide"
        fontSize={["sm", "md", "lg"]}
      >
        Olá, {user?.name || user?.username}
      </Text>
      <Heading
        fontSize={["sm", "md", "2xl"]}
        mt="1"
      >
        Vamos estudar o que hoje?
      </Heading>
    </>
  );
}