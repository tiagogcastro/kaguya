import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FiTrash2 } from 'react-icons/fi';

import { apiError } from '@/utils/apiFormatError';
import { kaguyaApi } from '@/services/kaguya/apiClient';
import { TrailData } from '@/services/kaguya/types';

export function TrailsManagerList() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const trails = useQuery<TrailData[]>({
    queryKey: ['adminTrails'],
    queryFn: async () => {
      const response = await kaguyaApi.get<TrailData[]>('/trails/list-all', {
        params: { take: 100 },
      });

      return response.data;
    },
  });

  const onDeleteTrail = async (trail: TrailData) => {
    try {
      await kaguyaApi.delete(`/sub-admins/trails?trail_id=${trail.id}`);
      await queryClient.invalidateQueries({ queryKey: ['adminTrails'] });
      await queryClient.invalidateQueries({ queryKey: ['othersTrails'] });
      await queryClient.invalidateQueries({ queryKey: ['userTrails'] });
      toast({
        title: `Trilha ${trail.name} removida`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      const errors = apiError(error);

      errors.messages.forEach(message =>
        toast({
          title: 'Erro ao remover trilha',
          description: message,
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top-right',
        }),
      );
    }
  };

  return (
    <Box bg="gray.800" p="6" borderRadius="lg">
      <Heading fontSize={['md', 'lg']} color="gray.200" mb="4">
        Trilhas existentes
      </Heading>
      <Flex flexDirection="column" gap="3">
        {(trails.data || []).map(trail => (
          <Flex
            key={trail.id}
            align="center"
            justify="space-between"
            bg="gray.700"
            p="4"
            borderRadius="md"
          >
            <Box>
              <Text color="gray.100" fontWeight="medium">
                {trail.name}
              </Text>
              <Text color="gray.400" fontSize="sm">
                /{trail.slug} · {trail._count?.playlists ?? 0} playlists
              </Text>
            </Box>
            <IconButton
              aria-label={`Remover trilha ${trail.name}`}
              icon={<FiTrash2 />}
              size="sm"
              colorScheme="red"
              variant="ghost"
              onClick={() => onDeleteTrail(trail)}
            />
          </Flex>
        ))}
        {!trails.isLoading && !(trails.data || []).length && (
          <Text color="gray.400">Nenhuma trilha cadastrada ainda.</Text>
        )}
      </Flex>
    </Box>
  );
}
