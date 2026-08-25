import { Heading, Skeleton } from '@chakra-ui/react';

type LessonTitleProps = {
  title?: string 
  isLoadingLesson: boolean
}

export function LessonTitle({ title, isLoadingLesson }: LessonTitleProps) {
  if(isLoadingLesson) return <Skeleton height="30px"  borderRadius="md" maxWidth="md" endColor="blackAlpha.700" startColor="blackAlpha.600" />

  return (
    <>
      <Heading
        fontSize={["md", "lg", "xl"]}
        mb="4"
      >
        {title}
      </Heading>
    </>
  )
}
