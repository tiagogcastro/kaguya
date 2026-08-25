import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { kaguyaApi } from '@/services/kaguya/apiClient';

type AdminUser = {
  id: string;
  name?: string | null;
  username: string;
  email?: string | null;
  enabled: boolean;
  created_at: string;
};

export function UsersTable() {
  const users = useQuery<AdminUser[]>({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const response = await kaguyaApi.get<AdminUser[]>(
        '/sub-admins/users/list-all',
      );

      return response.data;
    },
  });

  return (
    <Box bg="gray.800" p="6" borderRadius="lg">
      <Heading fontSize={['md', 'lg']} color="gray.200" mb="4">
        Usuários cadastrados
      </Heading>
      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr color="gray.400">
            <Th color="gray.400">Nome</Th>
            <Th color="gray.400">Username</Th>
            <Th color="gray.400">E-mail</Th>
            <Th color="gray.400">Status</Th>
            <Th color="gray.400">Cadastro</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(users.data || []).map(user => (
            <Tr key={user.id}>
              <Td color="gray.200">{user.name || '-'}</Td>
              <Td color="gray.300">{user.username}</Td>
              <Td color="gray.300">{user.email || '-'}</Td>
              <Td color={user.enabled ? 'green.300' : 'red.300'}>
                {user.enabled ? 'ativo' : 'desativado'}
              </Td>
              <Td color="gray.400">
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!users.isLoading && !(users.data || []).length && (
        <Box color="gray.400" mt="4">
          Nenhum usuário encontrado.
        </Box>
      )}
    </Box>
  );
}
