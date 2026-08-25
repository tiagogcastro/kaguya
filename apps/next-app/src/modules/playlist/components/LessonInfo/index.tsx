import { Flex } from "@chakra-ui/react";
import { LessonData } from "@/services/kaguya/types";
import { LessonDescription } from "@/modules/playlist/components/LessonInfo/LessonDescription";
import { LessonTitle } from "@/modules/playlist/components/LessonInfo/LessonTitle";

type LessonInfoProps = {
  lesson?: LessonData;
  isLoadingLesson: boolean;
};

export function LessonInfo({ lesson, isLoadingLesson }: LessonInfoProps) {
  return (
    <>
      <Flex flexDirection="column" ml={["4", "6"]} mt="10" mb={8}>
        <LessonTitle isLoadingLesson={isLoadingLesson} title={lesson?.name} />
        <LessonDescription
          isLoadingLesson={isLoadingLesson}
          description={lesson?.description}
        />
      </Flex>
    </>
  );
}
