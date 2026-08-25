import { Box, ChakraProps } from '@chakra-ui/react';
import { CurrentProgress } from './CurrentProgress';
import { FinalProgressIcon } from './FinalProgressIcon';

interface ProgressProps extends ChakraProps {
  percent: number;
};

export function Progress({
  percent,
  ...rest
}: ProgressProps) {
  return (
    <Box 
      mt="7"
      bg="blackAlpha.800"
      pos="relative"
      borderRadius="full"
      h='2'
      w="full"
      {...rest}
    >
      <CurrentProgress percentage={percent} />

      <FinalProgressIcon percentage={percent} />
    </Box>
  );
}
