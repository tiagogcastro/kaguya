import { Button, ChakraProps } from '@chakra-ui/react';
import React, { HTMLAttributes } from 'react';

export interface ChangeInputTypeButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function ChangeInputTypeButton({
  children,
  ...rest
}: ChangeInputTypeButtonProps & ChakraProps) {
  return (
    <>
      <Button
        position="absolute"
        zIndex="10"
        top="50%"
        transform="translateY(-50%)"
        bg="0"
        _hover={{
          bg: "0"
        }}
        {...rest}
      >
        {children}
      </Button>
    </>
  )
}