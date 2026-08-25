import { Box, ChakraProps } from '@chakra-ui/react';

export interface DividerLineProps extends ChakraProps {};

export function DividerLine({
  ...rest
}: DividerLineProps) {
  return (
    <>
      <Box
        bg="-webkit-gradient(linear, 0 0, 100% 0, from(rgb(24, 26, 33)), to(rgb(24, 26, 33)), color-stop(0.5, rgb(72, 74, 79)))"
        w="100%"
        h="1px"
        {...rest}
      />
    </>
  );
}