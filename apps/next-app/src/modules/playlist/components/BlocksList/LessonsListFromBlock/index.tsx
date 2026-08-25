import { BlockData, LessonData } from "@/services/kaguya/types";

import { AccordionPanel } from "@chakra-ui/react";
import { Lesson } from "./Lesson";

export interface LessonListFromBlocks {
  lessons?: LessonData[];
  block: BlockData;
  currentLessonSlug?: string;
}

export function LessonListFromBlock({
  lessons,
  block,
  currentLessonSlug,
}: LessonListFromBlocks) {
  return (
    <>
      <AccordionPanel
        as="ul"
        py="4"
        px="6"
        display="flex"
        flexDirection="column"
      >
        {lessons &&
          lessons.map((lesson, index) => (
            <Lesson
              key={lesson.id}
              block={block}
              lesson={lesson}
              isCurrentLesson={lesson.slug === currentLessonSlug}
              hasNextLesson={index !== lessons?.length - 1}
            />
          ))}
      </AccordionPanel>
    </>
  );
}
