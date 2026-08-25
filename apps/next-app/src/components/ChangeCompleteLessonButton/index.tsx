import { Box } from "@chakra-ui/react";
import { ChangeCompleteLessonButtonLineSeparator } from "./LineSeparate";
import { IsCurrentLessonItem } from "./IsCurrentLessonItem";
import { IsNotCurrentLessonItem } from "./IsNotCurrentLessonItem";
import { LessonData } from "@/services/kaguya/types";

export interface ChangeCompleteLessonButtonProps {
  isCurrent?: boolean;
  hasNextItem?: boolean;
  lesson: LessonData;
}

export function ChangeCompleteLessonButton({
  isCurrent = false,
  hasNextItem = false,
  lesson,
}: ChangeCompleteLessonButtonProps) {
  if (isCurrent) {
    return (
      <>
        <Box position="absolute" height="100%">
          <IsCurrentLessonItem isCompleted={lesson.completed} lesson={lesson} />
          <ChangeCompleteLessonButtonLineSeparator
            isShow={hasNextItem}
            isCompleted={lesson.completed}
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box position="absolute" height="100%">
        <IsNotCurrentLessonItem
          isCompleted={lesson.completed}
          lesson={lesson}
        />
        <ChangeCompleteLessonButtonLineSeparator
          isShow={hasNextItem}
          isCompleted={lesson.completed}
        />
      </Box>
    </>
  );
}
