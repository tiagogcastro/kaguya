import { Accordion, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Block } from "./Block";
import { BlockData } from "@/services/kaguya/types";
import { BlocksSkeletonLoading } from "../BlocksListSkeletonLoading";
import { findLastIndex } from "@/utils/findLastIndex";
import { kaguyaApi } from "@/services/kaguya/apiClient";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export interface BlocksListProps {
  playlistSlug: string;
  trailSlug: string;
}

export function BlocksList({ playlistSlug, trailSlug }: BlocksListProps) {
  const router = useRouter();
  const [lastBlockIndex, setLastBlockIndex] = useState<number | null>(null);

  const blocks = useQuery<BlockData[]>(
    ["blocksFromPlaylist", playlistSlug],
    async () => {
      const response = await kaguyaApi.get<BlockData[]>(
        "/blocks/playlist-list-all",
        {
          params: {
            playlist_slug: playlistSlug,
            trail_slug: trailSlug,
          },
        }
      );

      return response.data;
    },
    {
      staleTime: 1000 * 60 * 10, // 60 minutes,
      enabled: !!playlistSlug && !!trailSlug,
    }
  );

  useEffect(() => {
    function getCurrentLesson() {
      const blocksData = blocks?.data;

      if (blocksData && blocksData.length && trailSlug && playlistSlug) {
        const lessons = blocksData.map((block) => block.lessons).flat();

        if (lessons) {
          const lastLessonIndex = findLastIndex(
            lessons,
            (lesson) => lesson.completed
          );

          const lastLesson =
            lessons[lastLessonIndex + 1] || lessons[lastLessonIndex];

          if (lastLesson) {
            const lastBlock = blocksData.find(
              (block) => block.id === lastLesson.block_id
            );
            const lastBlockIndex = blocksData.findIndex(
              (block) => block.id === lastLesson.block_id
            );

            if (lastBlockIndex !== -1) {
              setLastBlockIndex(lastBlockIndex);
            }

            if (lastBlock) {
              router.push(
                `/trail/${trailSlug}/playlist/${playlistSlug}/block/${lastBlock.slug}/lesson/${lastLesson.slug}`
              );
            }
          }
        }
      }
    }
    getCurrentLesson();
  }, [blocks.data, blocks.isFetched]);

  if (blocks.isLoading) {
    return <BlocksSkeletonLoading />;
  }

  return (
    <Flex flexDirection="column" w="100%" mb="8">
      {lastBlockIndex !== null ? (
        <Accordion
          defaultIndex={lastBlockIndex}
          allowToggle
          w="100%"
          flexDirection="column"
          display="flex"
          gap="4"
          maxH="600px"
          overflowY="auto"
        >
          {blocks?.data &&
            blocks.data.map((block) => <Block key={block.id} block={block} />)}
        </Accordion>
      ) : (
        <BlocksSkeletonLoading />
      )}
    </Flex>
  );
}
