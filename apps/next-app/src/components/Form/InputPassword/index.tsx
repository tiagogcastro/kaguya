import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  Text,
  Box,
  FormLabel,
  useToken,
  Flex,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ChangeInputTypeButton } from "./ChangeInputTypeButton";

export interface InputPasswordProps extends ChakraInputProps {
  name: string;
  icon?: React.ReactElement;
  error?: FieldError;
  labelText?: string;
}

const InputPasswordBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputPasswordProps
> = ({ name, icon, error = null, labelText, ...rest }, ref) => {
  const [gray300, red600] = useToken("colors", ["gray.300", "red.600"]);

  const [inputType, setInputType] = useState<"text" | "password">("password");

  return (
    <>
      <FormLabel w="100%" m="0">
        <Text as="span" color="gray.300">
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
            <Flex alignItems="center" pl="4">
              {icon}
            </Flex>
          )}

          <ChakraInput
            name={name}
            ref={ref}
            type={inputType}
            autoComplete="current-password"
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

          {inputType === "password" && (
            <ChangeInputTypeButton
              right="2"
              onClick={() => setInputType("text")}
            >
              <AiFillEyeInvisible color={`${gray300}`} size={18} />
            </ChangeInputTypeButton>
          )}
          {inputType === "text" && (
            <ChangeInputTypeButton
              right="2"
              onClick={() => setInputType("password")}
            >
              <AiFillEye color={`${gray300}`} size={18} />
            </ChangeInputTypeButton>
          )}
        </FormControl>

        {!!error && (
          <Text color="red.300" mt="1">
            {error.message}
          </Text>
        )}
      </FormLabel>
    </>
  );
};

export const InputPassword = forwardRef(InputPasswordBase);
