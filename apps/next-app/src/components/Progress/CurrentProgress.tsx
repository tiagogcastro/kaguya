import { Box, useToken } from '@chakra-ui/react';

import { PercentageCircle } from './PercentageCircle';
import { PercentageText } from './PercentageText';

export interface CurrentProgressProps {
  percentage: number;
}

export function CurrentProgress({
  percentage
}: CurrentProgressProps) {
  const [pink600] = useToken(
    'colors',
    ['pink.500'],
  );

  const finalPercent = 
    percentage > 100 
    ? 100 
    : percentage < 0 
    ? 0 
    : percentage;

  return (
    <>
      <Box 
        pos="absolute"
        borderRadius="full"
        top={0}
        left={0}
        bg="pink.500"
        boxShadow={`0 0 0 1px ${pink600}`}
        w={`${finalPercent}%`}
        h="full"
      >
        <PercentageText percentage={finalPercent} />
        <PercentageCircle percentage={finalPercent} />
      </Box>
    </>
  );
}