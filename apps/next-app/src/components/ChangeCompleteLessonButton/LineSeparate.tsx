import { Box } from '@chakra-ui/react';

export interface CompleteLessonButtonLineSeparatorProps {
  isShow?: boolean;
  isCompleted?: boolean;
}

export function ChangeCompleteLessonButtonLineSeparator({
  isShow = false,
  isCompleted = false
}: CompleteLessonButtonLineSeparatorProps) {
  return (
    <>
      {isShow && (
        <Box
          bg={isCompleted ? 'pink.500' : "blackAlpha.600"}
          position="relative"
          transform="translateX(-50%)"
          top="-8px"
          left="50%"
          zIndex="1"

          h="100%"
          w="1"
        />
      )}
    </>
  )
}