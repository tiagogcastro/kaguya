import { Text } from '@chakra-ui/react';

export interface TrailDescriptionProps {
  description: string;
}

export function TrailDescription({
  description
}: TrailDescriptionProps) {
  return (
    <>
      <Text
        color="white"
        mt={["2", "6"]}
        lineHeight="1.8"
        fontSize={["12", "sm", "md"]}
      >
        {description}
      </Text>
    </>
  )
}