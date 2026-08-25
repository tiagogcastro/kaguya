import Lordicon from '@/components/ReactLordicon';
import { Text } from '@chakra-ui/react';

interface LessonViewedCountFromVideoProps {
  views: number
}

export function LessonViewedCountFromVideo({ views }: LessonViewedCountFromVideoProps) {
  return (
    <>
      <Text
        display="flex"
        gap="0.5"
        alignItems="center"

        color="white"
        fontSize={["sm", "md"]}
      >
        <Lordicon
          icon='clock'
          trigger='loop'
          size={20}
          colors={{
            primary: "#9a9ea3",
            secondary: "#9a9ea3"
          }}
        />
        {views} visualizações
      </Text>
    </>
  )
}