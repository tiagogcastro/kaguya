import { Heading, Text } from '@chakra-ui/react';

export interface TrailTitleProps {
  trailName: string;
}

export function TrailTitle({
  trailName
}: TrailTitleProps) {
  return (
    <>
      <Heading
        display="flex"
        gap="2"
        fontSize={["lg", "2xl"]}
      >
        Trilha de 
        <Text
          as="span"
          color="pink.500"
          fontSize={["lg", "2xl"]}
        >
          {trailName}
        </Text>
      </Heading>
    </>
  )
}