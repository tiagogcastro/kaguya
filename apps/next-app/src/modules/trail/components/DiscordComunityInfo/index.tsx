import { Box } from '@chakra-ui/react';
import { DiscordButtonToAccess } from './ButtonToAccess';
import { DiscordComunityDescription } from './Description';
import { DiscordComunityTitle } from './Title';

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