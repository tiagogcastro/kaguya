import {
  AccordionButton,
  AccordionIcon,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  useMediaQuery,
  useToken,
} from "@chakra-ui/react";

import { BlockData } from "@/services/kaguya/types";
import { BsCheckLg } from "react-icons/bs";
import { useTrail } from "@/hooks/useTrail";

export interface BlockProps {
  block?: BlockData;
}

export function BlockInfo({ block }: BlockProps) {
  const [pink500] = useToken("colors", ["pink.500"]);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const lessonsCount = block?.lessons.length;
  const lessonsCountText =
    lessonsCount === 1 ? `${lessonsCount} aulas` : `${lessonsCount} aulas`;

  const blockPercentage = block?.user_block?.progress;

  const { trail } = useTrail();

  return (
    <>
      <AccordionButton
        bg="blackAlpha.800"
        p={!isLargerThan768 ? "4" : "6"}
        borderRadius="md"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          bg: "normal",
        }}
      >
        <Flex gap="4" alignItems="center">
          {trail && trail.user_trail?.enabled && (
            <>
              {block?.user_block && (
                <CircularProgress
                  value={blockPercentage}
                  thickness="8"
                  color="pink.500"
                  trackColor="blackAlpha.600"
                  size={!isLargerThan768 ? "12" : "16"}
                >
                  <CircularProgressLabel
                    w="auto"
                    fontSize={!isLargerThan768 ? "xs" : "sm"}
                  >
                    {blockPercentage === 100 ? (
                      <>
                        <BsCheckLg color={pink500} />
                      </>
                    ) : (
                      <>{blockPercentage}%</>
                    )}
                  </CircularProgressLabel>
                </CircularProgress>
              )}
            </>
          )}

          <Flex flexDirection="column" alignItems="flex-start" gap="1" mr="3">
            <Text
              fontWeight="bold"
              fontSize={["sm", "md", "lg"]}
              textAlign="left"
            >
              {block?.name}
            </Text>
            <Text color="gray.300" fontSize={["sm"]} fontWeight="normal">
              {lessonsCountText}
            </Text>
          </Flex>
        </Flex>

        <AccordionIcon fontSize="3xl" />
      </AccordionButton>
    </>
  );
}
