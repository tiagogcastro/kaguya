import { AccordionItem } from "@chakra-ui/react";
import { BlockData } from "@/services/kaguya/types";
import { BlockInfo } from "./BlockInfo";
import { LessonListFromBlock } from "../LessonsListFromBlock";
import { useRouter } from "next/router";

export interface BlockProps {
  block: BlockData;
}

export function Block({ block }: BlockProps) {
  const router = useRouter();
  const query = router.query;

  const slugs = query?.slug || ([] as string[]);
  const lessonSlug = slugs[4] as string;

  return (
    <>
      <AccordionItem border="none">
        <BlockInfo block={block} />
        <LessonListFromBlock
          block={block}
          lessons={block.lessons}
          currentLessonSlug={lessonSlug}
        />
      </AccordionItem>
    </>
  );
}
