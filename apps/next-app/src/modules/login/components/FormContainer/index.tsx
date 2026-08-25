import { Box, Flex, Text, useToken, VStack, Link as ChakraLink, } from '@chakra-ui/react';
import NextLink from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { SignInWithGithubButton } from '../SignInButtons/SignInWithGithubButton';
import { SignInWithGoogleButton } from '../SignInButtons/SignInWithGoogleButton';
import { ForgotPasswordLink } from './ForgotPasswordLink';

import { Button } from '@/components/Button';
import { DividerLine } from '@/components/DividerLine';
import { Input } from '@/components/Form/Input';
import { InputPassword } from '@/components/Form/InputPassword';

import { User } from 'services/kaguya/types';
import { useAuth } from 'hooks/useAuth';

export type LoginResponse = {
  user: User;
  token: string;
}

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string()
    .required('Senha obrigatória'),
});

export function FormContainer() {
  const [gray300]= useToken("colors", [
    'gray.300', 
  ]);

  const { signIn } = useAuth();

  const { formState, handleSubmit, register } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const signInErrors = formState.errors;
  
  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data);
  }

  return (
    <>
      <Box
        px={["4", "8"]}
        w="100%"
        py="6"
        as="form"
        bg="blackAlpha.700"
        maxW={460}
        borderRadius="md"

        onSubmit={handleSubmit(handleSignIn)}
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
            placeholder="Digite seu e-mail"
            labelText='E-mail'
            autoComplete='email'
            icon={<MdEmail color={`${gray300}`} />}
            error={signInErrors.email}
            {...register('email')}
          />
          <InputPassword
            placeholder="Digite sua senha"
            labelText='Senha'
            icon={<FaLock color={`${gray300}`} />}
            error={signInErrors.password}
            {...register('password')}
          />
        </VStack>
        <ForgotPasswordLink />

        <Button
          w="100%"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Entrar
        </Button>

        <Text
          color="gray.300"
          opacity="0.9"
          mt="4"
          textAlign="left"
          fontSize={["sm", "md"]}
        >
          Não tem uma conta? &nbsp;
          <NextLink href="/register" passHref>
            <ChakraLink color="pink.500">Crie agora</ChakraLink>
          </NextLink>
        </Text>
      </Box>
    </>
  )
}