import { Flex, useToken } from '@chakra-ui/react';
import Lordicon from '../ReactLordicon';

export interface FinalProgressIconProps {
  percentage: number;
}

export function FinalProgressIcon({
  percentage
}: FinalProgressIconProps) {
  const [pink600] = useToken(
    'colors',
    ['pink.500'],
  );

  if(percentage < 80) {
    return (
      <>
        <Flex 
          as="span"
          bg="blackAlpha.800"
          transform="translate(0, -50%)"
          pos="absolute"
          alignItems="center"
          justifyContent="center"
          zIndex={0}
          top="50%"
          right="-3"
          w="6"
          h="6"
          borderRadius="full"
        >
          <Lordicon size={20} icon="checkInBox" colors={{
            primary: pink600, 
            secondary: pink600, 
          }} />
        </Flex>
      </>
    )
  }

  return (
    <></>
  );
}