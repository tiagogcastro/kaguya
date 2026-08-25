import { Text } from '@chakra-ui/react';

export interface QuoteDescription {
  description: string;
}

export function Description({
  description
}: QuoteDescription) {
  return (
    <>
      <Text
        fontSize={["xs", "sm"]}
        color="white"
        letterSpacing="wider"
      >
        {description}
      </Text>
    </>
  );
}