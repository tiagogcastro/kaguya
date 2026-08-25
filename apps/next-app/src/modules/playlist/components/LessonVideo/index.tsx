import { Flex, Skeleton, useMediaQuery } from "@chakra-ui/react";

import { InfoAboutLessonVideo } from "./InfoAboutLessonVideo";
import { LessonData } from "@/services/kaguya/types";
import { modifyYoutubeUrl } from "@/utils/modifyYoutubeUrl";

interface LessonVideoProps {
  lesson?: LessonData;
  isLoadingLesson?: boolean;
}

export function LessonVideo({ lesson, isLoadingLesson }: LessonVideoProps) {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  if (isLoadingLesson) {
    return (
      <Skeleton
        borderRadius="md"
        {...(isLargerThan1024
          ? {
              width: "max(240px, min(850px, 50vw))",
              height:
                "max(calc(240px * 0.5625), min(calc(850px * 0.5625), calc(50vw * 0.5625)))",
            }
          : {
              width: "max(240px, min(850px, calc(100vw - 32px)))",
              height:
                "max(calc(240px * 0.5625), min(calc(850px * 0.5625), calc(calc(100vw - 32px) * 0.5625)))",
            })}
        endColor="blackAlpha.700"
        startColor="blackAlpha.600"
      />
    );
  }

  return (
    <>
      <Flex
        borderRadius="md"
        mx="auto"
        overflow="hidden"
        {...(isLargerThan1024
          ? {
              width: "max(240px, min(850px, 50vw))",
            }
          : {
              width: "max(240px, min(850px, calc(100vw - 32px)))",
            })}
        flexDirection="column"
      >
        <Flex
          {...(isLargerThan1024
            ? {
                width: "max(240px, min(850px, 50vw))",
                height:
                  "max(calc(240px * 0.5625), min(calc(850px * 0.5625), calc(50vw * 0.5625)))",
              }
            : {
                width: "max(240px, min(850px, calc(100vw - 32px)))",
                height:
                  "max(calc(240px * 0.5625), min(calc(850px * 0.5625), calc(calc(100vw - 32px) * 0.5625)))",
              })}
        >
          <iframe
            width="100%"
            height="100%"
            title={lesson?.name}
            src={modifyYoutubeUrl(lesson?.link)}
            frameBorder="0"
            allowFullScreen
          />
        </Flex>
        <InfoAboutLessonVideo lesson={lesson} />
      </Flex>
    </>
  );
}
