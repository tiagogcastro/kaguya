import { Flex, useToken } from '@chakra-ui/react';
import Lordicon from '../ReactLordicon';

export interface PercentageCircleProps {
  percentage: number;
}

export function PercentageCircle({
  percentage
}: PercentageCircleProps) {
  const [pink600] = useToken(
    'colors',
    ['pink.500'],
  );
  
  return (
    <>
      <Flex 
        top="50%"
        right='-3'
        zIndex={1}
        borderRadius="full"
        border="2px solid"
        borderColor="pink.500"
        bg="blackAlpha.700"
        transform="translate(0, -50%)" 
        pos="absolute"
        minWidth="5"
        height="5"
        alignItems="center"
        justifyContent="center"
        as="span"
      >
      {percentage === 100 && (
        <Lordicon size={16} icon="checkInBox" colors={{
          primary: pink600, 
          secondary: pink600, 
        }} />
      )}
    </Flex>
    </>
  );
}