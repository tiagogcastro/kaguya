import {
  BlocksList,
  LessonInfo,
  LessonVideo,
} from "@/modules/playlist/components";
import { Flex, Skeleton, useMediaQuery, useToast } from "@chakra-ui/react";
import { LessonData, PlaylistData, TrailData } from "@/services/kaguya/types";

import { AddRemoveTrailButton } from "@/modules/trail/components/TrailInfoHeader/AddRemoveTrailButton";
import { BreadCrumbContainer } from "@/components/BreadCrumb/Container";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "@/components/Header";
import { kaguyaApi } from "@/services/kaguya/apiClient";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useTrail } from "@/hooks/useTrail";
import { withSSRAuth } from "@/utils/withSSRAuth";

export default function PlaylistPage() {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const toast = useToast();

  const router = useRouter();
  const query = router.query;

  const trailSlug = query?.trailSlug as string;
  const [playlistSlug, blockText, blockSlug, lessonText, lessonSlug] =
    query?.slug || ([] as string[]);

  const { setTrailData } = useTrail();

  const trail = useQuery<TrailData | undefined>(
    ["uniqueTrail", trailSlug],
    async () => {
      try {
        const response = await kaguyaApi.get<TrailData>("/trails/show", {
          params: {
            slug: trailSlug,
          },
        });

     

        setTrailData(response.data);

        return response.data;
      } catch (error) {
        toast({
          title: "Erro na listagem da trilha",
          description:
            "Possivelmente esta trilha não existe ou ocorreu um erro interno.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
    },
    {
      staleTime: 1000 * 60 * 10, // 60 minutes
      enabled: !!trailSlug,
    }
  );

  const playlist = useQuery<PlaylistData | undefined>(
    ["uniquePlaylist", playlistSlug],
    async () => {
      const response = await kaguyaApi.get<PlaylistData>("/playlists/show", {
        params: {
          playlist_slug: playlistSlug,
          trail_slug: trailSlug,
        },
      });

      return response.data;
    },
    {
      staleTime: 1000 * 60 * 10, // 60 minutes
      enabled: !!trailSlug && !!playlistSlug,
    }
  );

  const lesson = useQuery<LessonData>(
    ["showLesson", lessonSlug],
    async () => {
      const response = await kaguyaApi.get<LessonData>("/lessons/show", {
        params: {
          block_slug: blockSlug,
          lesson_slug: lessonSlug,
        },
      });

      return response.data;
    },
    {
      staleTime: 1000 * 60 * 10, // 60 minutes,
      enabled: !!lessonSlug && !!blockSlug,
    }
  );

  const isFetching = playlist.isFetching || trail.isFetching;
  const isLoading =
    lesson.isLoading || playlist.isLoading || trail.isLoading || isFetching;

  if (!isLoading && !lesson) {
    router.push("/dashboard");

    return;
  }

  return (
    <>
      <Head>
        <title>
          Kaguya - {isLoading ? "...Carregando" : lesson.data?.name}
        </title>
      </Head>

      <Flex flexDirection="column">
        <Header headerType={"has-user-profile"} />

        <Flex
          flexDirection="column"
          maxWidth={1480}
          w="100%"
          mt="16"
          mx={["0", "auto"]}
        >
          {isLoading ? (
            <Skeleton
              borderRadius="md"
              height="16px"
              maxW="md"
              ml="4"
              endColor="blackAlpha.700"
              startColor="blackAlpha.600"
            />
          ) : (
            <Flex ml={4} alignItems="center" gap={4}>
              {!isLargerThan768 ? (
                <BreadCrumbContainer
                  separator=" "
                  items={[
                    {
                      link: `/trail/${trail?.data?.slug}`,
                      title: `Voltar para ${trail?.data?.name}`,
                    },
                  ]}
                />
              ) : (
                <BreadCrumbContainer
                  items={[
                    { link: "/dashboard", title: "Dashboard" },
                    {
                      link: `/trail/${trail.data?.slug}`,
                      title: trail.data?.name,
                    },
                  ]}
                  currentItem={{
                    link: `/trail/${trailSlug}/playlist/${playlistSlug}/block/${blockSlug}/lesson/${lessonSlug}`,
                    title: playlist.data?.name,
                  }}
                />
              )}
            </Flex>
          )}

          <Flex
            gap="8"
            mt="8"
            mx="4"
            flexDirection={isLargerThan1024 ? "row" : "column"}
          >
            <Flex
              flexDirection="column"
              maxWidth={!isLargerThan1024 ? "100%" : 880}
              w="100%"
            >
              <LessonVideo
                isLoadingLesson={lesson.isLoading}
                lesson={lesson.data}
              />
              <LessonInfo
                isLoadingLesson={lesson.isLoading}
                lesson={lesson.data}
              />
            </Flex>

            <BlocksList playlistSlug={playlistSlug} trailSlug={trailSlug} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
