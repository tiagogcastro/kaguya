import { ChakraProps, Text } from '@chakra-ui/react';

export interface PlaylistDescriptionProps extends ChakraProps {
  description: string;
}

export function PlaylistDescription({
  description
}: PlaylistDescriptionProps) {
  return (
    <>
      <Text
        color="gray.300"
        letterSpacing="wider"
        lineHeight="1.6"
        fontSize={["xs", "sm", "md"]}
      >
        {description}
      </Text>
    </>
  );
}