import { Text } from '@chakra-ui/react';

export interface PercentageTextProps {
  percentage: number;
}

export function PercentageText({
  percentage
}: PercentageTextProps) {
  return (
    <>
      <Text 
        fontSize='xs'
        whiteSpace="nowrap"
        right="-4"
        top="-7"
        pos="absolute"
        as="span"
      >
        {percentage}%
      </Text>
    </>
  );
}