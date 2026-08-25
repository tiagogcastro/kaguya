import { 
  Box, 
  Flex, 
  Text, 
  useToken, 
  VStack, 
  Link as ChakraLink
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUser } from 'react-icons/fa';

import { SignInWithGoogleButton } from '../SignInButtons/SignInWithGoogleButton';
import { SignInWithGithubButton } from '../SignInButtons/SignInWithGithubButton';

import { Button } from '@/components/Button';
import { DividerLine } from '@/components/DividerLine';
import { Input } from '@/components/Form/Input';
import { InputPassword } from '@/components/Form/InputPassword';

import { useAuth } from '@/hooks/useAuth';
import { User } from '@/services/kaguya/types';

export type RegisterUserResponse = {
  user: User;
  token: string;
}

type RegisterUserFormData = {
  email: string;
  password: string;
  username: string;
}

const registerUserFormSchema = yup.object().shape({
  email: yup.string()
    .required('E-mail obrigatório')
    .email('Formato de e-mail inválido'),
  username: yup.string()
    .required('Username obrigatório')
    .min(2, 'Mínimo de 2 caracteres no username')
    .max(100, 'Máximo de 100 caracteres no username'),
  password: yup.string()
    .required('Senha obrigatória')
    .min(8, 'Mínimo de 8 caracteres na senha')
    .max(100, 'Máximo de 100 caracteres na senha'),
});

export function FormContainer() {
  const [gray300]= useToken("colors", [
    'gray.300', 
  ]);

  const { signUp } = useAuth();

  const { formState, handleSubmit, register } = useForm<RegisterUserFormData>({
    resolver: yupResolver(registerUserFormSchema),
  });

  const registerUserErrors = formState.errors;

  const handleRegisterUser: SubmitHandler<RegisterUserFormData> = async (data) => {
    await signUp(data);
  }

  return (
    <>
      <Box
        px={["4", "8"]}
        bg="blackAlpha.700"
        maxW={460}
        w="100%"
        borderRadius="md"
        py="6"
        as="form"
        onSubmit={handleSubmit(handleRegisterUser)}
      >
        <VStack
          spacing="3"
        >
          <SignInWithGoogleButton  />
          <SignInWithGithubButton  />
        </VStack>

        <Flex
          alignItems="center"
          my="4"
        >
          <DividerLine />
          <Text color="gray.300">ou</Text>
          <DividerLine />
        </Flex>
        
        <VStack
          spacing="3"
        >
          <Input
            placeholder="Digite um e-mail"
            labelText="E-mail"
            icon={<MdEmail color={`${gray300}`} />}
            error={registerUserErrors.email}
            {...register('email')}
          />
          <Input
            {...register('username')}
            placeholder="Digite um username"
            labelText="Username"
            icon={<FaUser color={`${gray300}`} />}
            error={registerUserErrors.username}
          />
          <InputPassword
            placeholder="Digite uma senha"
            labelText="Senha"
            icon={<FaLock color={`${gray300}`} />}
            error={registerUserErrors.password}
            {...register('password')}
          />
        </VStack>
        
        <Text fontSize="14px" mt="4" opacity="0.6">
            Ao criar sua conta você concorda com os&nbsp;
            <NextLink href="/terms" passHref>
              <ChakraLink target="_blank" color="pink.500">termos</ChakraLink>
            </NextLink> da plataforma
        </Text>
        
        <Button
          mt="6"
          w="100%"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Registrar
        </Button>

        <Text
          color="gray.300"
          opacity="0.9"
          mt="4"
          textAlign="left"
          fontSize={["sm", "md"]}
        >
          Já tem uma conta? &nbsp;
          <NextLink href="/login" passHref>
            <ChakraLink color="pink.500">Faça login</ChakraLink>
          </NextLink>
        </Text>
      </Box>
    </>
  )
}