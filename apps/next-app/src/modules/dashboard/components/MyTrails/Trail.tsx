import {
  Box,
  Button,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { ConfirmRemoveTrailModal } from "./ConfirmRemoveTrailModal";
import Lordicon from "@/components/ReactLordicon";
import NextLink from "next/link";
import { Progress } from "@/components/Progress";
import { TrailData } from "@/services/kaguya/types";

interface TrailProps {
  trail: TrailData;
}

export function Trail({ trail }: TrailProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="relative">
        <Button
          position="absolute"
          top="2"
          right="2"
          bg="blackAlpha.600"
          zIndex="10"
          _hover={{
            bg: "normal",
            opacity: "0.7",
          }}
          onClick={onOpen}
        >
          <Lordicon icon="trash" />
        </Button>
        <NextLink href={`/trail/${trail.slug}`}>
          <GridItem
            as="a"
            bg="blackAlpha.700"
            py="8"
            px="6"
            display="flex"
            alignItems="center"
            flexDirection="column"
            borderRadius="md"
            cursor="pointer"
          >
            <Image
              src={trail.avatar_url || "/assets/gifs/defaultAvatar.gif"}
              alt={`Avatar da trilha de ${trail.name}`}
              w={["14", "16"]}
              h={["14", "16"]}
            />
            <Text
              fontSize={["sm", "md", "xl"]}
              fontWeight="bold"
              letterSpacing="wider"
              mt="3"
            >
              {trail.name}
            </Text>
            {trail?.user_trail?.enabled && (
              <Progress percent={trail.user_trail.progress} />
            )}
          </GridItem>
        </NextLink>
      </Box>

      <ConfirmRemoveTrailModal
        modal={{
          isOpen,
          onClose,
        }}
        trail={trail}
      />
    </>
  );
}
