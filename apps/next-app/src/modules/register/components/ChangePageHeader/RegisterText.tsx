import { Text } from '@chakra-ui/react';

export function RegisterText() {
  return (
    <>
      <Text
        display="flex"
        alignItems="center"
        justifyContent="center"
        
        w="100%"
        padding={["4"]}
        fontSize={["xs","sm", "md"]}

        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        textAlign="center"
        color="pink.500"
        bg="blackAlpha.700"
        cursor="default"
        fontWeight="normal"
        boxShadow="rgb(24 26 33) 0px 15px, rgb(0 0 0 / 50%) -4px 4px 10px"
        _hover={{
          bg: "blackAlpha.700"
        }}
      >
        Registrar
      </Text>
    </>
  );
}