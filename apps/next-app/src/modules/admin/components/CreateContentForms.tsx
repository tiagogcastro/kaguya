import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button as ChakraButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input as ChakraInput,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { apiError } from '@/utils/apiFormatError';
import { kaguyaApi } from '@/services/kaguya/apiClient';
import { BlockData, PlaylistData, TrailData } from '@/services/kaguya/types';

type ContentType = 'trail' | 'playlist' | 'block' | 'lesson';

const slugRegex = /^[a-z0-9](-?[a-z0-9])*$/;

const trailSchema = yup.object({
  name: yup.string().required('Informe o nome').max(100),
  slug: yup
    .string()
    .required('Informe o slug')
    .matches(slugRegex, 'Use apenas letras minusculas, numeros e hifens'),
  description: yup.string().required('Informe a descrição').max(1000),
});

const playlistSchema = trailSchema.shape({
  trail_id: yup.string().uuid().required('Selecione a trilha'),
});

const blockSchema = yup.object({
  name: yup.string().required('Informe o nome').max(100),
  slug: yup
    .string()
    .required('Informe o slug')
    .matches(slugRegex, 'Use apenas letras minusculas, numeros e hifens'),
  playlist_id: yup.string().uuid().required('Selecione a playlist'),
});

const lessonSchema = blockSchema.shape({
  description: yup.string().required('Informe a descrição').max(1000),
  link: yup
    .string()
    .required('Informe o link do video')
    .url('Informe uma URL valida'),
});

function FormField({
  error,
  label,
  children,
}: {
  error?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color="gray.300" fontSize="sm">
        {label}
      </FormLabel>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading fontSize={['md', 'lg']} color="gray.200">
      {children}
    </Heading>
  );
}

export function CreateContentForms() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [selectedTrailId, setSelectedTrailId] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

  const trails = useQuery<TrailData[]>({
    queryKey: ['adminTrails'],
    queryFn: async () => {
      const response = await kaguyaApi.get<TrailData[]>('/trails/list-all', {
        params: { take: 100 },
      });

      return response.data;
    },
  });

  const playlists = useQuery<PlaylistData[]>({
    queryKey: ['adminPlaylists', selectedTrailId],
    queryFn: async () => {
      const response = await kaguyaApi.get<PlaylistData[]>(
        '/playlists/trail-list-all',
        { params: { trail_id: selectedTrailId } },
      );

      return response.data;
    },
    enabled: !!selectedTrailId,
  });

  const blocks = useQuery<BlockData[]>({
    queryKey: ['adminBlocks', selectedPlaylistId],
    queryFn: async () => {
      const response = await kaguyaApi.get<BlockData[]>(
        '/blocks/playlist-list-all',
        { params: { playlist_id: selectedPlaylistId } },
      );

      return response.data;
    },
    enabled: !!selectedPlaylistId,
  });

  const notifySuccess = (title: string) =>
    toast({
      title,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });

  const notifyError = (error: any) => {
    const errors = apiError(error);

    errors.messages.forEach(message =>
      toast({
        title: 'Erro na operação',
        description: message,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right',
      }),
    );
  };

  const trailForm = useForm<yup.InferType<typeof trailSchema>>({
    resolver: yupResolver(trailSchema),
  });

  const playlistForm = useForm<yup.InferType<typeof playlistSchema>>({
    resolver: yupResolver(playlistSchema),
  });

  const blockForm = useForm<yup.InferType<typeof blockSchema>>({
    resolver: yupResolver(blockSchema),
  });

  const lessonForm = useForm<yup.InferType<typeof lessonSchema>>({
    resolver: yupResolver(lessonSchema),
  });

  useEffect(() => {
    playlistForm.reset();
    blockForm.reset();
    lessonForm.reset();
    setSelectedPlaylistId('');
  }, [selectedTrailId]);

  useEffect(() => {
    blockForm.reset();
    lessonForm.reset();
  }, [selectedPlaylistId]);

  const onCreateTrail = trailForm.handleSubmit(async values => {
    try {
      await kaguyaApi.post('/sub-admins/trails', values);
      await queryClient.invalidateQueries({ queryKey: ['adminTrails'] });
      await queryClient.invalidateQueries({ queryKey: ['othersTrails'] });
      await queryClient.invalidateQueries({ queryKey: ['userTrails'] });
      trailForm.reset();
      notifySuccess('Trilha criada com sucesso');
    } catch (error) {
      notifyError(error);
    }
  });

  const onCreatePlaylist = playlistForm.handleSubmit(async values => {
    try {
      await kaguyaApi.post('/sub-admins/playlists', values);
      await queryClient.invalidateQueries({
        queryKey: ['adminPlaylists', selectedTrailId],
      });
      playlistForm.reset();
      notifySuccess('Playlist criada com sucesso');
    } catch (error) {
      notifyError(error);
    }
  });

  const onCreateBlock = blockForm.handleSubmit(async values => {
    try {
      await kaguyaApi.post('/sub-admins/blocks', values);
      await queryClient.invalidateQueries({
        queryKey: ['adminBlocks', selectedPlaylistId],
      });
      blockForm.reset();
      notifySuccess('Bloco criado com sucesso');
    } catch (error) {
      notifyError(error);
    }
  });

  const onCreateLesson = lessonForm.handleSubmit(async values => {
    try {
      await kaguyaApi.post('/sub-admins/lessons', values);
      await queryClient.invalidateQueries({
        queryKey: ['adminBlocks', selectedPlaylistId],
      });
      lessonForm.reset();
      notifySuccess('Aula criada com sucesso');
    } catch (error) {
      notifyError(error);
    }
  });

  const inputStyles = {
    bg: 'gray.700',
    color: 'gray.200',
    border: 'none',
  };

  return (
    <VStack spacing="8" align="stretch" as="section">
      <Box bg="gray.800" p="6" borderRadius="lg">
        <VStack spacing="4" as="form" onSubmit={onCreateTrail}>
          <SectionHeading>Nova trilha</SectionHeading>
          <FormField
            label="Nome"
            error={trailForm.formState.errors.name?.message}
          >
            <ChakraInput
              {...inputStyles}
              {...trailForm.register('name')}
            />
          </FormField>
          <FormField
            label="Slug"
            error={trailForm.formState.errors.slug?.message}
          >
            <ChakraInput {...inputStyles} {...trailForm.register('slug')} />
          </FormField>
          <FormField
            label="Descrição"
            error={trailForm.formState.errors.description?.message}
          >
            <ChakraInput
              {...inputStyles}
              {...trailForm.register('description')}
            />
          </FormField>
          <ChakraButton
            type="submit"
            w="100%"
            colorScheme="pink"
            isLoading={trailForm.formState.isSubmitting}
          >
            Criar trilha
          </ChakraButton>
        </VStack>
      </Box>

      <Box bg="gray.800" p="6" borderRadius="lg">
        <VStack spacing="4" as="form" onSubmit={onCreatePlaylist}>
          <SectionHeading>Nova playlist</SectionHeading>
          <FormField
            label="Trilha"
            error={playlistForm.formState.errors.trail_id?.message}
          >
            <Select
              {...inputStyles}
              placeholder="Selecione uma trilha"
              value={selectedTrailId}
              onChange={event => {
                const trailId = event.target.value;

                setSelectedTrailId(trailId);
                playlistForm.setValue('trail_id', trailId);
              }}
            >
              {(trails.data || []).map(trail => (
                <option key={trail.id} value={trail.id}>
                  {trail.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="Nome"
            error={playlistForm.formState.errors.name?.message}
          >
            <ChakraInput {...inputStyles} {...playlistForm.register('name')} />
          </FormField>
          <FormField
            label="Slug"
            error={playlistForm.formState.errors.slug?.message}
          >
            <ChakraInput {...inputStyles} {...playlistForm.register('slug')} />
          </FormField>
          <FormField
            label="Descrição"
            error={playlistForm.formState.errors.description?.message}
          >
            <ChakraInput
              {...inputStyles}
              {...playlistForm.register('description')}
            />
          </FormField>
          <ChakraButton
            type="submit"
            w="100%"
            colorScheme="pink"
            isLoading={playlistForm.formState.isSubmitting}
            isDisabled={!selectedTrailId}
          >
            Criar playlist
          </ChakraButton>
        </VStack>
      </Box>

      <Box bg="gray.800" p="6" borderRadius="lg">
        <VStack spacing="4" as="form" onSubmit={onCreateBlock}>
          <SectionHeading>Novo bloco</SectionHeading>
          <FormField
            label="Playlist"
            error={blockForm.formState.errors.playlist_id?.message}
          >
            <Select
              {...inputStyles}
              placeholder={
                selectedTrailId
                  ? 'Selecione uma playlist'
                  : 'Selecione uma trilha primeiro'
              }
              value={selectedPlaylistId}
              onChange={event => {
                const playlistId = event.target.value;

                setSelectedPlaylistId(playlistId);
                blockForm.setValue('playlist_id', playlistId);
              }}
            >
              {(playlists.data || []).map(playlist => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="Nome"
            error={blockForm.formState.errors.name?.message}
          >
            <ChakraInput {...inputStyles} {...blockForm.register('name')} />
          </FormField>
          <FormField
            label="Slug"
            error={blockForm.formState.errors.slug?.message}
          >
            <ChakraInput {...inputStyles} {...blockForm.register('slug')} />
          </FormField>
          <ChakraButton
            type="submit"
            w="100%"
            colorScheme="pink"
            isLoading={blockForm.formState.isSubmitting}
            isDisabled={!selectedPlaylistId}
          >
            Criar bloco
          </ChakraButton>
        </VStack>
      </Box>

      <Box bg="gray.800" p="6" borderRadius="lg">
        <VStack spacing="4" as="form" onSubmit={onCreateLesson}>
          <SectionHeading>Nova aula</SectionHeading>
          <FormField
            label="Bloco"
            error={lessonForm.formState.errors.playlist_id?.message}
          >
            <Select
              {...inputStyles}
              placeholder={
                selectedPlaylistId
                  ? 'Selecione um bloco'
                  : 'Selecione uma playlist primeiro'
              }
              onChange={event =>
                lessonForm.setValue('playlist_id', event.target.value)
              }
            >
              {(blocks.data || []).map(block => (
                <option key={block.id} value={block.id}>
                  {block.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="Nome"
            error={lessonForm.formState.errors.name?.message}
          >
            <ChakraInput {...inputStyles} {...lessonForm.register('name')} />
          </FormField>
          <FormField
            label="Slug"
            error={lessonForm.formState.errors.slug?.message}
          >
            <ChakraInput {...inputStyles} {...lessonForm.register('slug')} />
          </FormField>
          <FormField
            label="Descrição"
            error={lessonForm.formState.errors.description?.message}
          >
            <ChakraInput
              {...inputStyles}
              {...lessonForm.register('description')}
            />
          </FormField>
          <FormField
            label="Link do video (YouTube)"
            error={lessonForm.formState.errors.link?.message}
          >
            <ChakraInput {...inputStyles} {...lessonForm.register('link')} />
          </FormField>
          <ChakraButton
            type="submit"
            w="100%"
            colorScheme="pink"
            isLoading={lessonForm.formState.isSubmitting}
          >
            Criar aula
          </ChakraButton>
        </VStack>
      </Box>
    </VStack>
  );
}
