import { ChakraProps, Text } from '@chakra-ui/react';

export interface PlaylistIndex extends ChakraProps {
  value: number;
}

export function PlaylistIndex({
  value
}: PlaylistIndex) {
  return (
    <>
      <Text
        position="absolute"
        top="-4"
        left="-4"
        bg="blackAlpha.900"
        p="4"
        w="12"
        h="12"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        _hover={{
          border: '1px solid',
          borderColor: 'white'
        }}
      >
        {value + 1}
      </Text>
    </>
  )
}