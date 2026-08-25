import { 
  Input as ChakraInput, 
  InputProps as ChakraInputProps, 
  FormControl,
  FormErrorMessage,
  Text,
  Box,
  FormLabel,
  Flex,
  useToken,
  FormLabelProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends ChakraInputProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  icon?: React.ReactElement;
  error?: FieldError;
  labelText?: string;
  labelProps?: FormLabelProps;
}

const InputBase: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  icon,
  type,
  error = null,
  labelText,
  labelProps,
  ...rest
}, ref) => {
  const [red600] = useToken('colors', ['red.600']);

  return (
    <>
      <FormLabel
        w="100%"
        m="0"
        {...labelProps}
      >
        <Text 
          as="span"
          color="gray.300"
        >
          {labelText}
        </Text>
        <FormControl
          display="flex"
          flexDirection="row"
          border={!!error ? `1px solid ${red600}` : "1px solid transparent"}
          bg="blackAlpha.600"
          borderRadius="md"
          w="100%"
          mt="1"
        >
          {icon && (
            <Flex
              alignItems="center"
              pl="4"
              >
              {icon}
            </Flex>
          )}

          <ChakraInput
            name={name}
            ref={ref}
            type={type}

            size="lg"

            display="block"
            py={["sm", "md", "1"]}
            outline="0"

            fontSize={["sm", "md"]}
            textColor="gray.300"
            color="gray.300"
            border="0"

            {...rest}
          />

        </FormControl>
        {!!error && (
          <Text color="red.300" mt="1">
            {error.message}
          </Text>
        )}
      </FormLabel>
    </>
  );
}

export const Input = forwardRef(InputBase);