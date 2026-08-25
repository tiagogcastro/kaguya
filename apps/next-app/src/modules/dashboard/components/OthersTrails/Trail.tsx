import {
  Box,
  Link as ChakraLink,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Button } from "@/components/Button";
import Lordicon from "@/components/ReactLordicon";
import NextLink from "next/link";
import { TrailData } from "@/services/kaguya/types";
import { TrailMenu } from "./TrailMenu";
import { trailCount } from "@/utils/format/trailCount";

interface TrailProps {
  trail: TrailData;
}

export function Trail({ trail }: TrailProps) {
  const trailCountTexts = trailCount(trail);

  return (
    <>
      <Box position="relative">
        <NextLink href={`/trail/${trail.slug}`} passHref>
          <ChakraLink
            display="flex"
            w="100%"
            bg="blackAlpha.800"
            px={["4", "8"]}
            py={["4", "6"]}
            borderRadius="md"
            cursor="pointer"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Flex alignItems="center" gap="4">
              <Image
                src={trail.avatar_url || "/assets/gifs/defaultAvatar.gif"}
                alt={`Avatar da trilha de ${trail.name}.`}
                w={["12", "16"]}
                h={["12", "16"]}
              />
              <Stack flexDirection="column">
                <Heading fontSize={["sm", "md", "2xl"]}>{trail.name}</Heading>
                <Box>
                  <Text color="gray.300" fontSize={["sm"]}>
                    {trailCountTexts.playlists}
                  </Text>
                  <Text color="gray.300" fontSize={["sm"]}>
                    {trailCountTexts.lessons}
                  </Text>
                  <Text color="gray.300" fontSize={["sm"]}>
                    {trailCountTexts.users}
                  </Text>
                </Box>
              </Stack>
            </Flex>
            <Box ml="auto" display="flex" flexDirection="column">
              <Button py="1" mt="auto">
                <Lordicon icon="flatArrow" size={20} trigger="hover" />
              </Button>
            </Box>
          </ChakraLink>
        </NextLink>
        <TrailMenu trail={trail} />
      </Box>
    </>
  );
}
