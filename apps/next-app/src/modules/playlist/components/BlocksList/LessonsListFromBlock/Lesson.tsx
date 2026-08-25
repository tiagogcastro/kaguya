import { BlockData, LessonData, TrailData } from "@/services/kaguya/types";
import { Box, Link as ChakraLink, ChakraProps, Flex } from "@chakra-ui/react";

import { ChangeCompleteLessonButton } from "@/components/ChangeCompleteLessonButton";
import Lordicon from "@/components/ReactLordicon";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTrail } from "@/hooks/useTrail";
import { useEffect } from "react";
import { kaguyaApi } from "@/services/kaguya/apiClient";

const currentLessonStyle: ChakraProps = {
  fontWeight: "bold",
  _hover: {
    textDecoration: "none",
    color: "pink.500",
  },
};

const defaultLessonStyle: ChakraProps = {
  fontWeight: "normal",
  color: "gray.300",
  _hover: {
    color: "pink.500",
  },
};

export interface LessonProps {
  isCurrentLesson?: boolean;
  hasNextLesson?: boolean;
  lesson: LessonData;
  block: BlockData;
}

export function Lesson({
  isCurrentLesson = false,
  hasNextLesson = false,
  lesson,
  block,
}: LessonProps) {
  const lessonStyle = isCurrentLesson ? currentLessonStyle : defaultLessonStyle;

  const router = useRouter();
  const query = router.query;
  const slugs = query?.slug || ([] as string[]);

  const trailSlug = query?.trailSlug;
  const playlistSlug = slugs[0] as string;

  const { trail, setTrailData } = useTrail();

  useEffect(() => {
    kaguyaApi.get<TrailData>("/trails/show", {
      params: {
        slug: trailSlug,
      },
    }).then((response) => {
      setTrailData(trail => {
        if(!trail) {
          return response.data;
        }

        return trail
      })
    })
  }, [])

  return (
    <Box pb="4" position="relative">
      <Flex as="li">
        {trail && trail.user_trail?.enabled && (
          <ChangeCompleteLessonButton
            isCurrent={isCurrentLesson}
            hasNextItem={hasNextLesson}
            lesson={lesson}
          />
        )}
        <NextLink
          href={`/trail/${trailSlug}/playlist/${playlistSlug}/block/${block.slug}/lesson/${lesson.slug}`}
          passHref
        >
          <ChakraLink
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap="1"
            ml="4"
            {...lessonStyle}
          >
            <Lordicon icon="play" trigger="morph" size={20} />
            {lesson.name}
          </ChakraLink>
        </NextLink>
      </Flex>
    </Box>
  );
}
