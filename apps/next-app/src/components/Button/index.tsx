import { 
  Button as ChakraButton, 
  ButtonProps as ChakraButtonProps, 
} from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  icon?: React.ReactElement;
}

export function Button({
  icon,
  type,
  children,
  ...rest
}: ButtonProps) {
  return (
    <>
      <ChakraButton
        type={type}
        size={["xs", "md"]}
        gap="2"
        py={["5", "6"]}
        bg="blackAlpha.600"
        cursor="pointer"
        fontWeight="normal"
        color="gray.300"
        _hover={{
          bg: "gray.800"
        }}
        _disabled={{
          opacity: "0.8",
          cursor: "no-drop",
          _hover: {
            bg: "blackAlpha.600"
          }
        }}
        {...rest}
      >
        {children}
      </ChakraButton>
    </>
  );
}