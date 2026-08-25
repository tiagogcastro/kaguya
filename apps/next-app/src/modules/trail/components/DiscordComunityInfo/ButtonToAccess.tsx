import {
  Link as ChakraLink
} from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';

export function DiscordButtonToAccess() {
  return (
    <>
      <ChakraLink
        href="https://discord.gg/3wdCtmMTSx" 
        target="_blank"

        bg="#5865f2"
        color="white"
        display="flex"
        alignItems="center"
        gap="2"
        py="2"
        px="4"
        mt="4"
        borderRadius="md"
        cursor="pointer"
        w="max"
        transition="all 0.2s"
        fontSize={["sm", "md"]}
        _hover={{
          filter: "brightness(110%)"
        }}
      >
        <BsDiscord/>
        Discord
      </ChakraLink>
    </>
  )
}