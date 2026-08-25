import { Box } from '@chakra-ui/react';
import { DiscordButtonToAccess } from '@/modules/trail/components/DiscordComunityInfo/ButtonToAccess';
import { DiscordComunityDescription } from '@/modules/trail/components/DiscordComunityInfo/Description';
import { DiscordComunityTitle } from '@/modules/trail/components/DiscordComunityInfo/Title';

export function DiscordComunityInfo() {
  return (
    <>
      <Box
        mt="6"
      >
        <DiscordComunityTitle />
        <DiscordComunityDescription />
        <DiscordButtonToAccess />
      </Box>
    </>
  )
}