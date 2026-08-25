import { useAuth } from '@/hooks/useAuth';
import { 
  Box, 
  useToast,
  useToken,
  VStack
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

import { Input } from '@/components/Form/Input';
import { Button } from '@/components/Button';

import { kaguyaApi } from '@/services/kaguya/apiClient';
import { apiError } from '@/utils/apiFormatError';

type UpdateUserFormData = {
  username: string;
  name: string;
}

const updateUserFormSchema = yup.object().shape({
  username: yup.string()
    .required('Username não pode ficar vazio')
    .min(2, 'Mínimo de 2 caracteres no username')
    .max(100, 'Máximo de 100 caracteres no username'),
  name: yup.string()
    .required('O nome não pode ficar vazio')
    .min(2, 'Máximo de 2 caracteres no nome')
    .max(100, 'Máximo de 100 caracteres no nome'),
});

export function UpdateUserForm() {
  const { user, setUser } = useAuth();
  
  const [gray300]= useToken("colors", [
    'gray.300',
  ]);
  const toast = useToast();
  const { formState, handleSubmit, register } = useForm<UpdateUserFormData>({
    resolver: yupResolver(updateUserFormSchema),
  });

  const updateUserErrors = formState.errors;
  
  const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (data) => {
    try {
      await kaguyaApi.put('/users/update-user', data);

      setUser(prevState => {
        if(prevState) {
          return {
            ...prevState,
            ...data
          }
        }

        return prevState;
      });

      toast({
        title: 'Atualização dos dados de usuário',
        description: 'Sucesso! Seus dados foram atualizados.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach(messageError => {
        toast({
          title: 'Erro no login',
          description: messageError,
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top-right',
        });
      })
    }
  }

  return (
    <>
      <Box
        px={["4", "8"]}
        mb="8"
        w="100%"
        py="6"
        as="form"
        bg="blackAlpha.700"
        maxW={460}
        borderRadius="md"

        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <VStack
          spacing="3"
        >
          <Input
            placeholder="Digite um username"
            labelText="Username"
            icon={<FaUser color={`${gray300}`} />}
            error={updateUserErrors.username}
            {...register('username')}
            defaultValue={user?.username}
          />
          <Input
            placeholder="Digite um nome"
            labelText="Nome"
            icon={<MdEmail color={`${gray300}`} />}
            error={updateUserErrors.name}
            {...register('name')}
            defaultValue={user?.name}
          />
        </VStack>

        <Button
          w="100%"
          mt="6"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Atualizar dados
        </Button>
      </Box>
    </>
  )
}