import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { UserHistoryShow } from ".";

interface ContinueLessonInfoProps {
  info: UserHistoryShow | undefined;
}

export function ContinueLessonText({ info }: ContinueLessonInfoProps) {
  const text = useMemo(() => {
    if (!info) {
      return "Não há aulas na plataforma";
    }

    if (info.auto_generated) {
      return "Sugerimos para você";
    }

    return "Continuar assistindo";
  }, []);

  return (
    <>
      <Flex ml={["auto"]} mt={["2", "0"]} alignItems="center" gap="6">
        <Text fontSize={["sm", "md", "lg"]}>{text}</Text>
        <Box background="pink.700" p={["2", "3"]} borderRadius="50%">
          <IoPlaySharp color="#fff" size="18px" />
        </Box>
      </Flex>
    </>
  );
}
