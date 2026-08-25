import { 
  CircularProgress,
  Link as ChakraLink, 
  useToken,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useQuery } from 'react-query';

import { ContinueLessonText } from './ContinueLessonText';
import { LessonHistoryInfo } from './LessonHistoryInfo';

import { kaguyaApi } from '@/services/kaguya/apiClient';

export interface UserHistoryShow {
  id: string;
  lesson: {
    name: string;
  };
  playlist: {
    name: string;
  };
  trail: {
    avatar_url: string;
  };
  redirect: string;
  auto_generated: boolean;
}

export function LessonHistory() {
  const [pink800, blackAlpha700]= useToken("colors", [
    'pink.800', 
    'blackAlpha.700'
  ]);

  const { data, isFetching, isLoading } = useQuery<UserHistoryShow>('lessonHistory', async () => {
    const response = await kaguyaApi.get('/histories/show');

    return response.data;
  }, {
    staleTime: 1000 * 60 * 10 , // 60 minutes
  });

  return (
    <>
      <NextLink href={data?.redirect || '#'} passHref>
        <ChakraLink
          bg={`linear-gradient(90deg, 
            ${blackAlpha700} 0%, 
            ${blackAlpha700} 32%, 
            ${pink800} 300%
          )`}
          ml="auto"
          mt="6"
          p={["4", "6", "8"]}
          w="100%"
          borderRadius="md"
          cursor="pointer"
          display="flex"
          transition="all 0.2s ease-in-out"
          _hover={{
            boxShadow: `-2px 2px 2px ${pink800}`
          }}
          flexDirection={["column", "column", "row"]}
          alignItems={["flex-start", "flex-start", "center"]}
        >
          {isLoading || isFetching ? (
            <CircularProgress
              isIndeterminate
              color='pink.800'
              size={8}
            />
          ) : (
            <>
              <LessonHistoryInfo info={data} />
              <ContinueLessonText info={data} />
            </>
          )}
        </ChakraLink>
      </NextLink>
    </>
  )
}