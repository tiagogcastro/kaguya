import { Box, Skeleton, Text } from "@chakra-ui/react";

import { DividerLine } from "@/components/DividerLine";

type LessonDescriptionProps = {
  description?: string;
  isLoadingLesson: boolean;
};

export function LessonDescription({
  description,
  isLoadingLesson,
}: LessonDescriptionProps) {
  if (isLoadingLesson)
    return (
      <>
        <Skeleton
          mt="5"
          borderRadius="md"
          height="30px"
          maxWidth="lg"
          endColor="blackAlpha.700"
          startColor="blackAlpha.600"
        />
        <Skeleton
          mt="3"
          borderRadius="md"
          height="30px"
          maxWidth="xxl"
          endColor="blackAlpha.700"
          startColor="blackAlpha.600"
        />
        <Skeleton
          mt="3"
          borderRadius="md"
          height="30px"
          maxWidth="xl"
          endColor="blackAlpha.700"
          startColor="blackAlpha.600"
        />
      </>
    );

  return (
    <>
      <Box>
        <Text color="gray.300" fontSize={["sm", "md"]} mb="1">
          Descrição
        </Text>
        <DividerLine />
        <Text mt="4" color="gray.300">
          {description}
        </Text>
      </Box>
    </>
  );
}
